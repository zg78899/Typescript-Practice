//1.abstract 
//2.implements 클래스에서 인터페이스를 구현하는 방법, 추상 클래스를 정의하는 방법
//3. 추상 클래스를 인스턴스 시키기 위해서 새로운 타입을 만들어서 상속을 받고 . 거기에서 abstract 메소드들을 구현한다.

interface Person{
  name:string;
  say(mesasge:string):void;
}
interface Programmer {
  writeCode(requirement:string):string;
}


// 추상 클래스
abstract class Korean implements Person{

  public abstract jumin:number;

  constructor(public name:string){

  }
  say(msg:string){
    console.log(msg);
  }
  abstract loveKimchi():void;
}


class KoreanProgrammer extends Korean implements Programmer{

  constructor(public name :string,public jumin:number){
    super(name) //부모인 Korean클래스의 생성자함수를 호출해줘야한다. 
  }
  writeCode(requirement: string): string {
    console.log(requirement);
    return requirement + '...';
  }

  say(mesasge:string): void {
    console.log(mesasge)
  }
  loveKimchi():void{
    
  }
  
}
const jay = new KoreanProgrammer('jay',2222);
// const jay2 = new Korean('jay'); //추상클래스의 인스턴스는 만들 수 없다. 꼭 상속을 받아서 하위타입에서 추상클래스를 구현을 해야한다. 
//그리고 그 하위 타입을 우리가 인스턴스화 시킬 수 있는 것이다.(new 키워드를 사용하여 호출할수이다는 것을 의미) 
