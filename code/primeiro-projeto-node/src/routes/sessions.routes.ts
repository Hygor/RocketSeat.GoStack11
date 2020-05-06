import { Router } from 'express';
import AuthService from '../services/AuthService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const auth = new AuthService();

    const { user, token } = await auth.execute({ email, password });

    delete user.password;
    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({
      error: error.message,
    });
  }
});

export default sessionsRouter;
