import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string);


type VerificationEmailParams = {
  verify_url: string,
  name: string,
}

export const sendVerificationEmail = async (email: string, variableObj: VerificationEmailParams) => {
  let mailObj = {
    to: email,
    from: "selvaganapathy@outlook.in",
    templateId: "d-48b3bd7e12cb42988411bb31dc90f156",
    dynamic_template_data: variableObj
  }
  return await sgMail.send(mailObj)
}