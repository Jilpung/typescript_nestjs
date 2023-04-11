import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get("/users", (req, res) => {
  const profile = [
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "bbb@gmail.com",
      name: "영희",
      phone: "010-1111-2222",
      personal: "220110-3333333",
      prefer: "https://nate.com",
    },
    {
      email: "ccc@gmail.com",
      name: "맹구",
      phone: "010-3333-3333",
      personal: "220110-4444444",
      prefer: "https://daum.com",
    },
  ];
  res.send(profile);
});

app.get("/starbucks", (req, res) => {
  const menu = [
    { name: "아메리카노", kcal: 5 },
    { name: "카페모카", kcal: 10 },
    { name: "콜드브루", kcal: 11 },
    { name: "민트초코", kcal: 15 },
    { name: "라뗴", kcal: 60 },
    { name: "에스프레소", kcal: 40 },
    { name: "차이티", kcal: 20 },
    { name: "민트티", kcal: 5 },
    { name: "아이스초코", kcal: 2 },
    { name: "헤이즐럿", kcal: 29 },
  ];
  res.send(menu);
});

app.post("/tokens/phone", async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  // 1. 핸드폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(phoneNumber);

  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const token = await getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(phoneNumber, token);
    res.send("인증성공!");
  }
});

app.post("/users", (req, res) => {
  const user = req.body;
  console.log("1111", user);
  console.log("useremail", user.email);

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkValidationEmail(user.email);
  if (isValid) {
    // 2. 가입환영 템플릿 만들기
    const mytemplate = getWelcomeTemplate(user);

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(user.email, mytemplate);
    res.send("가입완료!!!");
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on ${3000}`);
});
