import { HydratedDocument, Model } from 'mongoose';
import UserModel, { IUser } from '../../DB/model/user.model';
import { signupSchemaType } from './user.validation';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../DB/repositories/user.repository';
import { AppError } from '../../utils/classError';
import { Hash } from '../../utils/hash';
import { generateOTP, sendEmail } from '../../services/sendEmail';
import { EmailTemplate } from '../../services/email.template';
import { eventEmitter } from '../../utils/event';

class UserService {
  // private _userModel: Model<IUser> = UserModel;

  private _userModel = new UserRepository(UserModel);

  constructor() {}
  //=============================SignUp=======================
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    const {
      fullName,
      email,
      password,
      cPassword,
      age,
      address,
      phone,
      gender,
    }: signupSchemaType = req.body;
    if (await this._userModel.findOne({ email })) {
      throw new AppError('Email Already Exist', 409);
    }
    if (password !== cPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await Hash(password);
    const user = await this._userModel.createOneUser({
      fullName,
      email,
      password: hashedPassword,
      age,
      phone,
      gender,
      address,
    });

    eventEmitter.emit('confirmEmail', { email });
    return res.status(201).json({ message: 'Sucess', user });
  };

  //=============================SignIp=======================
  signIn = (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: 'Sucess' });
  };
}

export default new UserService();
