import express from 'express'
import { getEnable2FAPage, getLoginPage, getVerify2FAPage, postEnable2FA, postLogin, postVerify2FA } from '../controllers/AuthController';
import { getHomePage } from '../controllers/HomeController';

const router = express.Router();

export function initAPIs(app: express.Application) {
    router.get('/', getHomePage);

    router.get('/login', getLoginPage);
    router.post('/login', postLogin);

    router.get('/enable-2fa', getEnable2FAPage);
    router.post('/enable-2fa', postEnable2FA);

    router.get('/verify-2fa', getVerify2FAPage)
    router.post('/verify-2fa', postVerify2FA)

    return app.use('/', router);
}
