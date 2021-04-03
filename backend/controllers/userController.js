import asyncHandler from 'express-async-handler'
import User from '../models/User_Schema.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(404).json({ message: 'Please fill all fields!' })
  }

  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(404).json({ message: "User doesn't exists" })
  } else if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      message: 'Login Successful!',
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    return res.status(402).json({ message: 'Incorrect Password!' })
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(404).json({ message: 'Please fill all fields!' })
  }

  const userCheck = await User.findOne({ email })
  if (userCheck) {
    return res
      .status(404)
      .json({ message: 'User with this email already exists!' })
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })
  res.json({
    message: 'User Registered!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
})

const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'User Deleted..!!!' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin ?? user.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  userProfile,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
