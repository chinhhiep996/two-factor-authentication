import path from 'path';
import express from 'express';
import { generateOTPToken, generateQRCode, generateUniqueSecret, verifyOTPToken } from '../helpers/2fa';

const __dirname = path.resolve();

const MOCK_USER = {
    username: 'hiepbc',
    password: 'hiepbc',
    is2FAEnabled: true,
    secret: generateUniqueSecret()
}

export async function getLoginPage(req: express.Request, res: express.Response) {
    return res.sendFile(path.join(`${__dirname}/src/views/login.html`));
}

export async function getEnable2FAPage(req: express.Request, res: express.Response) {
    return res.sendFile(path.join(`${__dirname}/src/views/enable2FA.html`));
}

export async function getVerify2FAPage(req: express.Request, res: express.Response) {
    return res.sendFile(path.join(`${__dirname}/src/views/verify2FA.html`));
}

export async function postLogin(req: express.Request, res: express.Response) {
    try {
        const user = MOCK_USER;
        const { username, password } = req.body;

        if (username === user.username && password === user.password) {
            if (user.is2FAEnabled) {
                return res.status(200).json({
                    isCorrectIdentifier: true,
                    is2FAEnabled: true,
                    isLoggedIn: false,
                });
            }

            return res.status(200).json({
                isCorrectIdentifier: true,
                is2FAEnabled: false,
                isLoggedIn: true,
            })
        }

        return res.status(200).json({
            isCorrectIdentifier: false,
            is2FAEnabled: false,
            isLoggedIn: false,
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function postEnable2FA(req: express.Request, res: express.Response) {
    try {
        const user = MOCK_USER;
        const serviceName = 'Two-Factor Authentication (2FA)';
        const otpAuth = generateOTPToken(user.username, serviceName, user.secret);
        const qrCodeImage = await generateQRCode(otpAuth);

        return res.status(200).json({ qrCodeImage });
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function postVerify2FA(req: express.Request, res: express.Response) {
    try {
        const user = MOCK_USER;
        const { otpToken } = req.body;
        const isValid = verifyOTPToken(otpToken, user.secret);

        return res.status(200).json({ isValid });
    } catch (error) {
        return res.status(500).json(error);
    }
}
