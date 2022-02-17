import { useForm } from 'react-hook-form';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}

const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    console.log('add to do', toDo);

    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: 'TO_DO' },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };
  console.log(toDos);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', {
            required: 'Please write todo',
          })}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDos) => (
          <li key={toDos.id}>{toDos.text}</li>
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
