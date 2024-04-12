import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../../Model/Auth/User";

// Joi schema for validating the request body
const signInSchema = Joi.object({
    username: Joi.string().allow(null, "").optional(),
    email: Joi.string().email().allow(null, "").optional(),
    mobile: Joi.string()
        .pattern(/^\d{10}$/)
        .allow(null, "")
        .optional(),
    password: Joi.string().required(),
});


export const signIn = async (req: Request, res: Response) => {
    const { error } = signInSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, mobile, password } = req.body;

    if (!(username || email || mobile)) {
        return res.status(400).json({ message: 'Username, email, or mobile is required' });
    }

    // Check if at least one of the three options is provided
    const optionsCount = [username, email, mobile].filter(Boolean).length;
    if (optionsCount !== 1) {
        return res.status(400).json({ message: 'Provide only one of username, email, or mobile' });
    }

    try {
        let user: UserDocument | null = null;
        if (username) {
            user = await User.findOne({ username });
        } else if (email) {
            user = await User.findOne({ email });
        } else if (mobile) {
            user = await User.findOne({ mobile });
        }

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token with user data
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email,
                mobile: user.mobile,
            },
            'secret', // Replace 'secret' with your secret key
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Sign-in successful, send token in response
        res.status(200).json({ message: 'Sign-in successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const signUp = (req: Request, res: Response) => {
    res.send("Sign-up route");
};

export const resetPassword = (req: Request, res: Response) => {
    res.send("Reset password route");
};

export const forgotPassword = (req: Request, res: Response) => {
    res.send("Forgot password route");
};
