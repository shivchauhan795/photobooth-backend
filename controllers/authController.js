import { User } from '../models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }
    try {
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({
            email,
            password: hashedPassword,
            name
        })
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({
                message: 'User does not exist'
            })
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) {
            return res.status(400).json({
                message: 'Invalid password'
            })
        }

        const token = jwt.sign({ id: foundUser.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({
            message: 'Login successful',
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        })
    }

}

export const resetPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const isUser = await User.findOne({ email: req.userId.id });
    if (!isUser) {
        return res.status(400).json({
            message: 'User does not exist'
        })
    }

    const match = await bcrypt.compare(oldPassword, isUser.password);
    if (!match) {
        return res.status(400).json({
            message: 'Invalid password'
        })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    isUser.password = hashedPassword;
    await isUser.save();
    res.status(200).json({
        message: 'Password reset successful'
    })
}