import bcrypt from 'bcrypt';

export async function Hash(
  plainText: string,
  saltRounds: number = Number(process.env.SALT_ROUNDS)
): Promise<string> {
  return bcrypt.hash(plainText, saltRounds);
}

export async function comparePassword(
  plainText: string,
  cipherText: string
): Promise<boolean> {
  return bcrypt.compare(plainText, cipherText);
}
