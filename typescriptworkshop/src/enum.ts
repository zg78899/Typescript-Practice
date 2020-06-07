//열거형
enum StarBucksGrade {// 등급을 열거함 /enum 타입 / 상수로 열거 
  WELCOME,//0
  DDDD,//추가하게 되면 뒤의 값들은 숫자가 하나씩 밀리게 된다.그래서 다음과 같은 상태를 해결하기 위해 아래처럼 값을 초기에 설정을 해준다. 
  GREEN,//1
  GOLD//2
}
// enum StarBucksGrade{// 초기의 숫자 값들을 설정해 준다. -1
//   WELCOME = 0,
//   DDD = 3,
//   GRENN = 1,
//   GOLD = 2
// }
//혹은 
// enum StarBucksGrade{// 초기의 숫자 값들을 설정을 문자열로 설정도 가능하다. -2
//   WELCOME = "WELCOME",
//   GRENN = "GREEN",
//   GOLD = "GOLD"
// }

//숫자가 자동으로 이력된다

function getDisCount(v: StarBucksGrade): number {
  switch (v) {
    case StarBucksGrade.WELCOME:
      return 0;
    case StarBucksGrade.GREEN:
      return 5;
    case StarBucksGrade.GOLD:
      return 10;
  }
}
console.log(getDisCount(StarBucksGrade.GREEN));//5
console.log(StarBucksGrade.GREEN);//1;
console.log(StarBucksGrade); // 객체로 되어있다. 
// {
//   '0': 'WELCOME',
//   '1': 'GREEN',
//   '2': 'GOLD',
//   WELCOME: 0,
//   GREEN: 1,
//   GOLD: 2
// }
console.log(StarBucksGrade[0]);// WELCOME
console.log(StarBucksGrade["WELCOME"]) //0

//문자열로 초기값을 설정해주면 -2;
// console.log(StarBucksGrade.GREEN === "GREEN")//true;
// console.log(StarBucksGrade) // {WELCOME : "WELCOME",GREEN:"GREEN",GOLD:"GOLD"};
// console.log(getDisCount(StarBucksGrade["GREEN"]));
// console.log(StarBucksGrade["GREEN"]);
// console.log(StarBucksGrade.GREEN);

