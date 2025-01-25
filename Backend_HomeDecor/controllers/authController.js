const User = require('../models/userModel');

exports.signup = async (req, res) => {
  try {
      // Extract and validate fields from request body
      const { name, email, phoneNumber, password } = req.body;

      // Check for missing fields
      if (!name || !email || !phoneNumber || !password) {
          console.error("Missing required fields");
          return res.status(400).json({ message: "All fields are required" });
      }

      // Validate email format (basic regex check)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          console.error("Invalid email format:", email);
          return res.status(400).json({ message: "Invalid email format" });
      }

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          console.error("Email already exists:", email);
          return res.status(400).json({ message: "Email already exists" });
      }

      // // Hash the password before saving
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Save user to the database
      const user = new User({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phoneNumber: phoneNumber.trim(),
          password: password,
      });

      const savedUser = await user.save();

      console.log("User saved successfully:", savedUser);

      // Return success response without sensitive information
      return res.status(201).json({
          message: "Signup successful",
          user: {
              id: savedUser._id,
              name: savedUser.name,
              email: savedUser.email,
              phoneNumber: savedUser.phoneNumber,
          },
      });
  } catch (error) {
      console.error("Signup error:", error.message || error); // Log error details
      return res.status(500).json({ message: "Internal server error" });
  }
};





// SignIn Controller
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log('User fetched from DB:', user);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password (no hash check, assuming plain password for simplicity)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Send back user details
    res.status(200).json({ 
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber, // Include other fields as needed
      },
     });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Update User Details
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from route parameters
    const { email, phoneNumber, password } = req.body; // Extract updated fields from the request body

    if (!id) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Validate the input data
    if (!email && !phoneNumber && !password) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (email, phoneNumber, or password) is required to update',
      });
    }

    // Find and update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, phoneNumber, password },
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
