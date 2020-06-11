interface DB<T> {
  add(v: T): void;
  get(): T;
}

class D<T> implements DB<T>{//제너릭 타입의 interface을 구현하려면  구현하려는 클래스에서도 제너릭 타입을 가져와야한다. 
  add(v: T): void {
    throw new Error("Method not implemented.");
  }
  get(): T {
    throw new Error("Method not implemented.");
  }
}
interface JSONSerialier {
  serializer(): string;
}

class LocalDB<T> extends JSONSerialier implements DB<T>{ // 전달받은 값에서 
  constructor(private localSotrageKey: string) {// 생성자로 localStorageKey를 받음
  }
  add(v: T) {
    // v.serializer();
    localStorage.setItem(this.localSotrageKey, v.serializer());//문자열로 변환
  }
  get(): T {
    const v = localStorage.getItem(this.localSotrageKey);
    return (v) ? JSON.parse(V) : null //문자열을 JSON.parse 파싱해서 javascript에서 사용하는 데이터로 변환 리턴 
  }
}

// interface User { name: string };

// const userDb = new LocalDB<User>('user');
// userDb.add({ name: 'jay' });
// const userA = userDb.get();
// userA.name;


//조건부 타입
interface Vegitable {
  v: string;
}
interface Meat {
  m: string;
}
interface Cart2<T> {
  getItem(): T extends Vegitable ? Vegitable : Meat;
};
const cart1: Cart2<Vegitable> = {
  getItem() {
    return {
      v: ''
    }
  }
}
cart1.getItem();

