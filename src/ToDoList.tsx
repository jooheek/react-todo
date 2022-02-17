import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//react-hook 를 사용해서 기존에 state로 등록하는 코드를 줄인다.
//규모가 큰 어플을 만들면 validation이 필요할텐데
//모든 입력값들과 입력값의 에러 state를 받는 코드를 작성할 순 없다.
/* 

function ToDoList() {
  const [toDo, setToDo] = useState('');
  const [toDoError, setToDoError] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError('');
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length > 10) {
      return setToDoError('to do should be shorter');
    }
    console.log('submit');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="write a todo" />
        <button>Add</button>
        {toDoError !== '' ? toDoError : null}
      </form>
    </div>
  );
}
 */

//register 함수는 앞의 onChange이벤트 핸들러, onChange 이벤트를 대신한다.
//register함수는 onBlur, onChange, ref, name 이 있다.
//<input {...register('todo')} placeholder="write a todo" />
//input에 prop이 todo인 register가 반환하는 객체를  넣는다.
//watch 함수는 모든 value를 출력한다.
//console.log(watch())를 작성하면 {todo : '... '}으로 입력된 데이터 값이 실시간으로 출력된다.
//이 코드는 입력값이 많을때 유용하다. input 태그가 많아지면 보통 그에 따라 state 가 증가하는데 hook form을 사용하면 기존의
//const { register, watch } = useForm(); 만으로 해결할 수 있다.

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  password: string;
  passwordConfirm: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        'password',
        { message: 'password are not the same' },
        { shouldFocus: true }
      );
    }
  };
  console.log(errors);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'only naver.com emails allowed',
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('firstName', {
            required: true,
            validate: {
              noOatmeal: (value) =>
                value.includes('oatmeal') ? 'NO oatmeals allowed' : true,
              noNick: (value) =>
                value.includes('nick') ? 'NO Nicks allowed' : true,
            },
          })}
          placeholder="firstName"
        />
        <span>{errors?.firstName?.message}</span>
        <input {...register('lastName')} placeholder="lastName" />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register('password', {
            required: 'password is required',
            minLength: {
              value: 5,
              message: 'your password is too short',
            },
          })}
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>
        <input {...register('passwordConfirm')} placeholder="passwordConfirm" />
        <span>{errors?.passwordConfirm?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
