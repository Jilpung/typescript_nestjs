import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(3000, () => {
  console.log(`Example app listening on ${3000}`);
});
