import User from "../models/User.js";
import Attendance from "../models/Attendence.js";

const postSignUp = async (req, res) => {
  const {
    fullName,
    email,
    password,
    dob,
    date_of_joining,
    experience,
    position,
    profilePhoto
  } = req.body

  const user = new User({
    fullName,
    email,
    password,
    dob: new Date(dob),
    date_of_joining: new Date(date_of_joining),
    experience,
    position,
    profilePhoto

  })

  try {
    const savedUser = await user.save();

    res.json({
      success: true,
      message: "User Registered Successfully..",
      data: savedUser
    })
  }

  catch (e) {
    res.json({
      success: false,
      message: e.message,
      data: null
    })
  }

}

const postLogin = async (req, res) => {

  const { email, password } = req.body

  const user = await User.findOne({
    email: email,
    password: password
  })



  if (user) {
    res.json({
      success: true,
      message: "Login Successfully...",
      data: user
    })
  }

  else {
    res.json({
      success: false,
      message: "User not found",
      data: null
    })
  }

}

const postSavedAttendance = async (req, res) => {
  const { userId, status, date } = req.body; // Include userId in the request body

  // Validate userId, status, and date
  if (!userId || !status || !date) {
    return res.status(400).json({ error: 'User ID, status, and date are required' });
  }

  try {
    // Check if an attendance record already exists for the given user and date
    let attendanceRecord = await Attendance.findOne({ userId, date });

    if (attendanceRecord) {
      // Update the existing attendance record
      attendanceRecord.status = status;
      await attendanceRecord.save();
      console.log('Attendance updated:', attendanceRecord);
    } else {
      // Create a new attendance record
      attendanceRecord = new Attendance({ userId, status, date });
      await attendanceRecord.save();
      console.log('Attendance recorded:', attendanceRecord);
    }

    // Respond with success
    res.json({ message: 'Attendance recorded successfully'});
  } catch (error) {
    console.error('Error saving attendance record:', error);
    res.json({ error: 'Failed to record attendance' });
  }
};

const getAttendance = async (req, res) => {
  try {
    // Retrieve month and year from the query parameters
    const { month, year } = req.query;

    // Validate inputs
    if (!month || !year) {
      return res.json({ message: 'Month and year are required' });
    }

    //used to convert the month and year query parameters (which are strings by default) into integers so they can be used in calculations or date operations.
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);


    //used to validate the monthInt and yearInt values to ensure they are valid before proceeding with further logic, such as fetching attendance records.
    if (monthInt < 1 || monthInt > 12 || isNaN(yearInt)) {
      return res.json({ message: 'Invalid month or year' });
    }

    // Get the first and last date of the month
    const startDate = new Date(yearInt, monthInt - 1, 1);  // Start of the month
    const endDate = new Date(yearInt, monthInt, 0);  // End of the month

    // Get attendance data for the month
    const attendanceData = await Attendance.find({
      date: { $gte: startDate, $lte: endDate },
    });

    // Format the attendance data by day
    const formattedAttendance = [];

    // Loop through the days in the month and map attendance data
    const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(yearInt, monthInt - 1, day);
      const attendanceForDay = attendanceData.find(att => new Date(att.date).toDateString() === currentDay.toDateString());
    

      formattedAttendance.push({
        date: currentDay,
        status: attendanceForDay ? attendanceForDay.status : null,
      });
    }

    // Send the formatted attendance data
    res.json(formattedAttendance);

  } catch (err) {
    console.error(err);
    res.json({ message: 'Server error' });
  }
}

const allOveeAttendance = async (req, res) => {
  try {
    const results = await Attendance.aggregate([
      {
        $group: {
          _id: "$userId", // Group by userId (assuming userId is the reference field)
          presentDays: {
            $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] },
          },
          absentDays: {
            $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] },
          },
          halfDays: {
            $sum: { $cond: [{ $eq: ["$status", "half-day"] }, 1, 0] },
          },
          totalDays: { $sum: 1 },
        },
      },
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { postSignUp, postLogin, postSavedAttendance, allOveeAttendance,getAttendance }