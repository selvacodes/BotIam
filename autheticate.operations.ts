
import { _notImplemented } from './utils';
import { generateMagicToken, generateUserAccessToken, generateUserRefreshToken } from './jwt.utils';
import { sendVerificationEmail } from './email.utils';
import * as DL from './user.data'
import axios from 'axios'
import { RawAuthentication, Authentication, TokenEncode } from './authenticate.schema';
import { v4 as uuidv4 } from 'uuid';
import { Result } from '@badrap/result'
import { UserSchema } from './user.schema';

export const addAutheticateRequest = async (rawAuthRequest: RawAuthentication): Promise<Result<Authentication>> => {
  const authRequest = { ...rawAuthRequest, id: uuidv4(), status: "yet_to_verify" as const }
  const addedRequest = await DL.addAuthRequest(authRequest)
  const userResult = await DL.getUserByEmail(authRequest.email)
  const user = userResult.unwrap()
  const magicTokenJWT = generateMagicToken({ id: authRequest.id, email: authRequest.email }, process.env.MAGIC_LINK_SECRET_KEY as string)
  const verify_url = `${process.env.DOMAIN}/authenticate/verify/token/${magicTokenJWT.token}`
  await sendVerificationEmail(rawAuthRequest.email, { verify_url, name: `${user.first_name} ${user.last_name}` })
  console.log("magicToken", magicTokenJWT)
  return addedRequest
}

export const processVerfication = async (tokenData: TokenEncode) => {
  const { id } = tokenData
  const requestDetail = await DL.getAuthenticationRequest(id)
  const request = requestDetail.unwrap()
  const userResult = await DL.getUserByEmail(request.email)
  const user = userResult.unwrap()
  const userWithId = UserSchema.parse(user)
  const accessToken = generateUserAccessToken({ ...user , type : "access_token" }, process.env.JWT_SECRET_KEY as string)
  const refreshToken = generateUserAccessToken({ ...user , type : "refresh_token" }, process.env.JWT_SECRET_KEY as string)
  axios.post(request.callback_url, { access_token : accessToken , refresh_token : refreshToken})
}