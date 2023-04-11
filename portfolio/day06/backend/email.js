import { getToday } from "./util.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkValidationEmail(email) {
  console.log("email", email);
  if (email === undefined || !email.includes("@")) {
    console.log("에러발생! 이메일 제대로 입력!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, phoneNumber, site }) {
  return `
    <html>
      <body>
        <h1>${name} 가입을 환영합니다!!</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>전화번호: ${phoneNumber}</div>
        <div>좋아하는 사이트: ${site}</div>
        <div>가입일: ${getToday()}</div>
      </body>
    </html>
`;
}

export async function sendTemplateToEmail(email, mytemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    const result = await transporter.sendMail({
      from: EMAIL_SENDER,
      to: email,
      subject: "안녕하세요 메일 테스트입니다.",
      html: mytemplate,
    });

    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
