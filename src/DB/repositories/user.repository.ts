import { HydratedDocument, Model } from 'mongoose';
import { AppError } from '../../utils/classError';
import { DbRepositories } from './db.repository';
import { IUser } from '../model/user.model';

export class UserRepository extends DbRepositories<IUser> {
  constructor(protected readonly model: Model<IUser>) {
    super(model);
  }

  async createOneUser(data: Partial<IUser>): Promise<HydratedDocument<IUser>> {
    const user: HydratedDocument<IUser> = await this.model.create(data);
    if (!user) {
      throw new AppError('Faild To Create A New User');
    }
    return user;
  }
}
