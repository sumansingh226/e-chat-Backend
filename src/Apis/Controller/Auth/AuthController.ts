
import { Request, Response } from 'express';

export const signIn = (req: Request, res: Response) => {
    const { username, email, mobile, password } = req.body;

    if (!(username || email || mobile) || !password) {
        return res.status(400).json({ message: 'Username, email, mobile, and password are required' });
    }

    // Check if at least one of the three options is provided
    const optionsCount = [username, email, mobile].filter(Boolean).length;
    if (optionsCount !== 1) {
        return res.status(400).json({ message: 'Provide only one of username, email, or mobile' });
    }

    res.send('Sign-in route');
};


export const signUp = (req: Request, res: Response) => {
    res.send('Sign-up route');
};

export const resetPassword = (req: Request, res: Response) => {
    res.send('Reset password route');
};

export const forgotPassword = (req: Request, res: Response) => {
    res.send('Forgot password route');
};
