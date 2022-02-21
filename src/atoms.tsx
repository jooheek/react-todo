import { atom, selector } from 'recoil';

//selector는 atom의 output을 변형시키는 도구
export interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

//selector를 사용하는 이유 : atom의 데이터를 변형시켜서 output값으로 출력할 수 있다.

//selector는 state를 가져다가 어떤것을 return 한다.
//derived state라고도 힘
//get에서 return 하는 값이 toDoSelector return 값이다. get 함수가 atom의 값을 받게 해준다.
export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((todo) => todo.category === 'TO_DO'),
      toDos.filter((todo) => todo.category === 'DOING'),
      toDos.filter((todo) => todo.category === 'DONE'),
    ];
  },
});
