import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../Model/Auth/User";

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
        return res
            .status(400)
            .json({ message: "Username, email, or mobile is required" });
    }

    // Check if at least one of the three options is provided
    const optionsCount = [username, email, mobile].filter(Boolean).length;
    if (optionsCount !== 1) {
        return res
            .status(400)
            .json({ message: "Provide only one of username, email, or mobile" });
    }

    try {
        let user: any | null = null;
        if (username) {
            user = await User.findOne({ username });
        } else if (email) {
            user = await User.findOne({ email });
        } else if (mobile) {
            user = await User.findOne({ mobile });
        }

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token with user data
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email,
                mobile: user.mobile,
            },
            process.env.JwtSecret,
            { expiresIn: "12h" }
        );

        // Sign-in successful, send token in response
        res.status(200).json({ message: "Sign-in successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const signUpSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string()
        .pattern(/^\d{10}$/)
        .required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        zip: Joi.string().required(),
    }).required(),
});

export const signUp = async (req: Request, res: Response) => {
    const { error } = signUpSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const {
        username,
        email,
        mobile,
        password,
        name,
        firstName,
        lastName,
        age,
        gender,
        address,
    } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ username }, { email }, { mobile }],
        });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            mobile,
            password: hashedPassword,
            name,
            firstName,
            lastName,
            age,
            gender,
            address,
        });

        await newUser.save();
        res.status(201).json({ message: "Sign-up successful", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { userId, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const forgotPassword = (req: Request, res: Response) => {
    res.send("Forgot password route");
};
