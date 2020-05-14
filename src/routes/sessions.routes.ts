import { Router } from 'express';

const sessionsRouter = Router();

import AuthenticateUserService from '../services/AuthenticateUserService';

sessionsRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const authenticateUserService = new AuthenticateUserService();

        const { user, token } = await authenticateUserService.execute({
            email,
            password,
        });

        delete user.password;

        return res.json({ user, token });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
