const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  console.log("Login Attempt:", username, password); // Debug

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err.message); // 🧠 See error message
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

module.exports = { signup, login };
