import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  // aaa() {
  //   return 'hello world';
  // }

  findAll() {
    //1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const result = [
      { number: 1, writer: '철수', title: '~타이틀', content: '~내용' },
      { number: 2, writer: '영희', title: '~타이틀', content: '~내용' },
      { number: 3, writer: '맹구', title: '~타이틀', content: '~내용' },
    ];
    //2. 꺼내온 결과 응답주기

    return result;
  }

  create() {
    //1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
    //2. 저장 결과 응답주기

    return '등록에 성공하셨습니다.';
  }
}
