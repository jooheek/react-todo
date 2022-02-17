import { IToDo } from '../atoms';

function ToDo({ text, id }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
}
//li의 key 값이 필요없어진 이유?

export default ToDo;
