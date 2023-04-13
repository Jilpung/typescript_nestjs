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
import { Token } from "./models/token.model.js";
import mongoose from "mongoose";

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
  console.log("phoneNumber", phoneNumber);

  // 1. 핸드폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(phoneNumber);

  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const token = await getToken();
    console.log("token", token);

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(phoneNumber, token);

    const tokens = new Token({
      token: token,
      phone: phoneNumber,
      isAuth: false,
    });
    await tokens.save();

    res.send(`${phoneNumber}으로 인증 문자가 전송되었습니다.`);
  }
});

app.get("/tokens/phone", async (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = await Token.find();

  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.post("/users", (req, res) => {
  const user = req.body;

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

mongoose.connect("mongodb://mongo-database:27017/mongoproject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log(`Example app listening on ${3000}`);
});
