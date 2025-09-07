import mongoose, { Document, Schema, Types } from 'mongoose';

// Define your enums for gender & role:
export enum GenderType {
  male = 'male',
  female = 'female',
  other = 'other',
}

export enum RoleType {
  user = 'user',
  admin = 'admin',
}

// Extend Document so Mongoose knows about TS types
export interface IUser extends Document {
  _id: Types.ObjectId;
  fName: string;
  lName: string;
  userName: string;
  email: string;
  password: string;
  age: number;
  phone?: string;
  address?: string;
  gender: GenderType;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
  fullName?: string; // virtual
}

// Create the schema
const userSchema = new Schema<IUser>(
  {
    fName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10,
      trim: true,
    },
    lName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 60, required: true },
    phone: { type: String },
    address: { type: String },
    gender: { type: String, enum: Object.values(GenderType), required: true },
    role: {
      type: String,
      enum: Object.values(RoleType),
      default: RoleType.user,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Virtual property (full name)
userSchema
  .virtual('fullName')
  .get(function (this: IUser) {
    // handle missing values gracefully
    const first = this.fName ?? '';
    const last = this.lName ?? '';
    return `${first} ${last}`.trim();
  })
  .set(function (this: IUser, name: string) {
    if (typeof name !== 'string') return;
    const parts = name.trim().split(/\s+/); // split by any whitespace
    this.fName = parts.shift() || ''; // first element
    this.lName = parts.join(' '); // remainder joined back
  });

// Create & export model
const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>('User', userSchema);

export default UserModel;
