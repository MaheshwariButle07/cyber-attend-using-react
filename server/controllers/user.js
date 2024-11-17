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
      console.log('Attendance updated');
    } else {
      // Create a new attendance record
      attendanceRecord = new Attendance({ userId, status, date });
      await attendanceRecord.save();
      console.log('Attendance recorded');
    }

    // Respond with success
    res.json({ message: 'Attendance recorded successfully'});
  } catch (error) {
    console.error('Error saving attendance record:', error);
    res.json({ error: 'Failed to record attendance' });
  }
};

const allOverAttendance = async (req, res) => {

  const { userId } = req.params; // User ID from the URL parameter

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Find all attendance records for the specific user
    const attendanceRecords = await Attendance.find({ userId });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this user' });
    }

    // Initialize counters for status types
    let total = 0;
    let present = 0;
    let absent = 0;
    let halfday = 0;

    // Iterate through the records and count the statuses
    attendanceRecords.forEach(record => {
      total++;
      switch (record.status) {
        case 'present':
          present++;
          break;
        case 'absent':
          absent++;
          break;
        case 'halfday':
          halfday++;
          break;
        default:
          // Handle unexpected status (optional)
          console.warn(`Unknown status for record on ${record.date}: ${record.status}`);
      }
    });

    // Respond with the attendance summary
    res.json({
      userId,
      total,
      present,
      absent,
      halfday,
    });

  } catch (error) {
    console.error('Error fetching attendance summary:', error);
    res.status(500).json({ error: 'Failed to fetch attendance summary' });
  }

}

export { postSignUp, postLogin, postSavedAttendance, allOverAttendance }