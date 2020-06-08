class LocalDB<T> {
  constructor(private localSotrageKey: string) {// 생성자로 localStorageKey를 받음
  }
  add(v: T) {
    localStorage.setItem(this.localSotrageKey, JSON.stringify(v));//문자열로 변환
  }
  get(): T {
    const v = localStorage.getItem(this.localSotrageKey);
    return (v) ? JSON.parse( V ) : null //문자열을 JSON.parse 파싱해서 javascript에서 사용하는 데이터로 변환 리턴 
  }
}

interface User { name: string };

const userDb = new LocalDB<User>('user');
userDb.add({ name : 'jay'});
const userA = userDb.get();
userA.name;