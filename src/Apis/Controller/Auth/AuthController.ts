import { Request, Response } from 'express';

export const signIn = (req: Request, res: Response) => {
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
