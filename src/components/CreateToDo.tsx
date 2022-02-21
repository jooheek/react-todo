import { useForm } from "react-hook-form";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { Categories, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: Categories.TO_DO },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "Please write todo",
        })}
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
