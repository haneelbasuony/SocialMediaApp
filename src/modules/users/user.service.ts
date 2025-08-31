import { NextFunction, Request, Response } from 'express';

interface ISignUp {
  name: string;
  email: string;
  password: string;
  cPassword: string;
}
class UserService {
  //=============================SignUp=======================
  signUp = (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password, cPassword }: ISignUp = req.body;
    return res.status(201).json({ message: 'Sucess', data: req.body });
  };
  //=============================SignIp=======================
  signIn = (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: 'Sucess' });
  };
}

export default new UserService();
