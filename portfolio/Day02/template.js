function welcome(email, number, phone, site) {
  const result = `
  <html>
    <body>
      <h1>가입을 환영합니다!</h1>
      <hr>
      <div>이메일: ${email}</div>
      <div>주민번호: ${number}</div>
      <div>휴대폰 번호: ${phone}</div>
      <div>내가 좋아하는 사이트: ${site}</div>
    </body>
  </html>
  `;
  return console.log(result);
}

welcome("josh@naver.com", 0102222, 10102222, "www.naver.com");
