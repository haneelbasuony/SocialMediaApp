import { Router } from 'express';
import US from './user.service';
import { Validation } from '../../middleware/validation';
import { signupSchema } from './user.validation';
const userRouter = Router();

userRouter.post('/signUp', Validation(signupSchema), US.signUp);
userRouter.post('/signIn', US.signIn);

export default userRouter;
