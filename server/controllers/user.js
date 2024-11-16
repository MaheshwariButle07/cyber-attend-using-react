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

// const getAttendance = async (req, res) => {

//   const { userId } = req.params; // Get the userId from the URL parameters

//   // Validate the userId
//   if (!userId) {
//     return res.status(400).json({ error: 'User ID is required' });
//   }

//   try {
//     // Aggregate attendance data for the user
//     const attendanceCounts = await Attendance.aggregate([
//       { 
//         $match: { user_id: userId }, // Match the userId
//       },
//       {
//         $group: {
//           _id: "$status", // Group by attendance status ('present', 'absent', 'half-day')
//           count: { $sum: 1 }, // Count the occurrences of each status
//         },
//       },
//       {
//         $project: {
//           _id: 0, // Remove _id from the result
//           status: "$_id", // Rename _id to status
//           count: 1, // Include the count of each status
//         },
//       },
//     ]);

//     // Initialize the summary object with default values (0)
//     const attendanceSummary = {
//       present: 0,
//       absent: 0,
//       "half-day": 0,
//     };

//     // Populate the attendance summary with the counts from the aggregation
//     attendanceCounts.forEach((entry) => {
//       if (attendanceSummary[entry.status] !== undefined) {
//         attendanceSummary[entry.status] = entry.count; // Set the count for each status
//       }
//     });

//     // Return the attendance summary data
//     res.json({
//       userId,
//       attendanceSummary,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error while fetching attendance data' });
//   }

// }

// const getAttendance = async (req, res) => {
//   const { userId } = req.params; // Get the user_id from the URL parameters

//   // Check if user_id exists
//   if (!userId) {
//     return res.status(400).json({ error: 'User ID is required' });
//   }

//   try {
//     // Aggregate attendance data for the user
//     const attendanceCounts = await Attendance.aggregate([
//       { 
//         $match: { user_id: userId }, // Match the user_id
//       },
//       {
//         $group: {
//           _id: "$status", // Group by attendance status ('present', 'absent', 'half-day')
//           count: { $sum: 1 }, // Count the occurrences of each status
//         },
//       },
//       {
//         $project: {
//           _id: 0, // Remove _id from the result
//           status: "$_id", // Rename _id to status
//           count: 1, // Include the count of each status
//         },
//       },
//     ]);

//     // Initialize the summary object with default values (0)
//     const attendanceSummary = {
//       present: 0,
//       absent: 0,
//       "half-day": 0,
//       totalDays: 0,  // This will hold the total number of attendance records
//     };

//     // Populate the attendance summary with the counts from the aggregation
//     attendanceCounts.forEach((entry) => {
//       if (attendanceSummary[entry.status] !== undefined) {
//         attendanceSummary[entry.status] = entry.count; // Set the count for each status
//       }
//     });

//     // Calculate the total number of days
//     attendanceSummary.totalDays = attendanceSummary.present + attendanceSummary.absent + attendanceSummary["half-day"];

//     // Return the attendance summary data
//     res.json({
//       userId,
//       attendanceSummary,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error while fetching attendance data' });
//   }
// };

const getAttendance = async (req, res) => {
  const { userId } = req.params; // Get user_id from URL parameters

  // Check if user_id exists
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Aggregate attendance data for the user
    const attendanceCounts = await Attendance.aggregate([
      { 
        $match: { user_id: userId }, // Match the user_id
      },
      {
        $project: {
          status: 1, // Only project the status field
        }
      },
      {
        $group: {
          _id: "$status", // Group by the 'status' field
          count: { $sum: 1 }, // Count occurrences of each status
        }
      },
      {
        $project: {
          _id: 0, // Remove _id from the result
          status: "$_id", // Rename _id to status
          count: 1, // Include the count of each status
        },
      },
    ]);

    console.log("Attendance Counts"); // Log the output to debug

    // Initialize the summary object with default values (0)
    const attendanceSummary = {
      present: 0,
      absent: 0,
      "half-day": 0,
      totalDays: 0,  // Total days will hold the sum of all statuses
    };

    // Populate the attendance summary with the counts from the aggregation
    attendanceCounts.forEach((entry) => {
      if (attendanceSummary[entry.status] !== undefined) {
        attendanceSummary[entry.status] = entry.count; // Set the count for each status
      }
    });

    // Calculate totalDays by summing the counts
    attendanceSummary.totalDays = attendanceSummary.present + attendanceSummary.absent + attendanceSummary["half-day"];

    // Return the attendance summary data
    res.json({
      userId,
      attendanceSummary,
    });
  } catch (error) {
    console.error("Error while fetching attendance data:", error);
    res.status(500).json({ error: 'Server error while fetching attendance data' });
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

export { postSignUp, postLogin, postSavedAttendance, allOverAttendance,getAttendance }