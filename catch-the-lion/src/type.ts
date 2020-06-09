export interface Hello {
  text: string;
}

export const user = { name: 'user1' }

type d = Hello & {hi():void};
export default d;

// export default class A { //인터페이스 클래스 함수 모두 가능 .export default 하나만 가능
//   a() {

//   }
// }