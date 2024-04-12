import { Request, Response } from "express";
import Joi from "joi";

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

export const signIn = (req: Request, res: Response) => {
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

    res.send("Sign-in route");
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
