import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const generateUserAccessToken = (data: JwtPayload, secretKey: string) => {
  const token = jwt.sign(data, secretKey, {
    expiresIn: '365d',
  });
  return { token: token };
}

export const generateUserRefreshToken = (data: JwtPayload, secretKey: string) => {
  const token = jwt.sign(data, secretKey, {
    expiresIn: '730d',
  });
  return { token: token };
}