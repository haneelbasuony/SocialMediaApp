import mongoose from 'mongoose';

const checkConnectionDB = async () => {
  await mongoose
    .connect(process.env.DB_URL as unknown as string)
    .then(() => {
      console.log('Suceccs Connection to SocailMediaApp DB ^_^');
    })
    .catch((error) => {
      console.log(`Failed to Connect To SocailMediaApp DB ¯\_(ツ)_/¯ `, error);
    });
};

export default checkConnectionDB;
