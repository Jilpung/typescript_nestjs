function checkValidationNumberLength(num) {
  //1. 주민번호 제대로 들어오는지 체크
  if (num.length !== 14) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

function checkValidationNumberForm(num) {
  //2. - 들어 있는지 체크
  if (!num.includes("-")) {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return false;
  } else {
    return true;
  }
}

function customRegistrationNumber(num) {
  const frontNumber = String(num).substring(0, 8);
  const backNumber = String(num).substring(8, 14).replace(/[0-9]/gi, "*");
  const number = frontNumber + backNumber;
  const validationNumberForm = checkValidationNumberForm(num);
  const validationNumberLength = checkValidationNumberLength(num);
  // console.log(num);
  if (!number) {
    validationNumberForm, validationNumberLength;
    console.log(num);
  } else {
    return console.log(number);
  }
}

customRegistrationNumber("211111-1111111");
