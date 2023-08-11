import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect } from 'react';
import { getTodos } from '../api/todo';
import { useState } from 'react';
const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];


const TodoPage = () => {

  const [inputValue,Setinputvalve] = useState('')
  const [addtodo, setaddtodo] = useState(dummyTodos)

   const handleInput = (value) => {
    Setinputvalve(value);
  };

  const handletodo = (prev) =>{
     if (inputValue.length === 0) {
      return;
    }
    setaddtodo((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    Setinputvalve('');
  };

  const handleKeydown = (prev) =>{
     if (inputValue.length === 0) {
      return;
    }
    setaddtodo((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    Setinputvalve('');
  }

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput 
      inputValue={inputValue}
      onchange={handleInput}
      onAddTodo={handletodo}
      onKeyDown={handleKeydown}
      />
      <TodoCollection todos = {addtodo}/>
      <Footer />
    </div>
  );
};

export default TodoPage;
