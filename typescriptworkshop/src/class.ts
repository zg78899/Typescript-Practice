interface User{
  user:string;
}
interface Product{
  id:string;
  price:number;
}

class Cart{  //클래스(javascript)
  //2개의 속성
  
  // protected user:User; // 기본저그오 아무런 접근제한자를 두지않으면 public이다. 
  // private store:object; // 접근제한자 private,protected,public  private로 선언하면 class밖에서 접근할 수 없다. 
//생성자 함수
 constructor(public user : User,private store:object = {}){ //생성자에  매개변수에 접근제한자를 쓰게되면 속성이 정의됨과 동시에,
                                                            //new 키워드로 호출할때 전달맏은 인자값이 Cart의 속성의 할당까지 된다.
   //프로퍼티 
  //  this.user = user;
  //  this.store = {};
 }
 //2개의 메소드
 public put(id:string,product:Product){
  //  this.get(); // 접근제한자는 클래스 내부에서는  사용이 가능하다.
  // this.user.name;
   this.store[id] = product;
 }
 private get(id:string){
   return this.store[id]
 }
}
//다른 클래스에서 상속
class PromotionCart extends Cart{
  addPromotion(){
    // this.user.name;
  }
}
//인스턴스르 생성
const cart2 = new PromotionCart({name:'JOhn'});
cart2.addPromotion();// Cart에서 상속한 put메소드
// cart2.user
const cartJohn = new Cart({name:'John'});
const artJay = new Cart({name:'Jay'});

//접근제한자 protected,private,public의 차이점 
//1. 기본적으로 접근제한자를 설정해주지 않으면 public이다. public은 인스턴스에서라던지 클래스의 내부에서 접근이 가능하다.
//2. privete와 protected는 인스턴스에서 점근이 불가능하다.그러나 클래스의 내부에서 접근이 가능하다.
//3. private와 protected의 차이점은 private는 선언된 클래스의 내부에서만 사용이 가능하고 상속된 하위클래스를 비롯한 인스턴스에서 점근이 불가능하다.
//4. protected는 선언된 클래스의 내부와 상속하고 있는 자신의 하위 클래스에서 상속이 가능하다. 

