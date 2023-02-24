import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import { TokenEncodeSchema , TokenEncode } from "./authenticate.schema";

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

export const generateMagicToken = (data: JwtPayload, secretKey: string) => {
  const token = jwt.sign(data, secretKey, {
    expiresIn: '2d',
  });
  return { token: token };
}

export  const decodeMagicJWT = (token: string): TokenEncode => {
  var decoded = jwt_decode(token);
  const parsed = TokenEncodeSchema.parse(decoded)
  return parsed
}