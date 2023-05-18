const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка при валідації', errors.array()))
            }

            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });

            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });

            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);

            res.clearCookie('refreshToken');
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL + `/email-confirmation-success`);
        }
        catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users)
        }
        catch (e) {
            next(e);
        }
    }

    async sendStatusTransactionOnEmail(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userDate =  tokenService.validateRefreshToken(refreshToken)

            if(userDate.activate != true){
                return next(ApiError.BadRequest('У користувача не підтверджена пошта'));
            }

            await mailService.sendStatusTransaction(userDate.email, "ok");
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();