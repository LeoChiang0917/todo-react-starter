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

  const sumAddtodo = addtodo.length

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

const handleToggleDone = (id) => {
    setaddtodo((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  };

  const handlechangeMode= ({id,isEdit}) =>{
    setaddtodo((prev)=>{
     return prev.map((todo) =>{
      if(todo.id ===id){
        return {
          ...todo,isEdit
        }
      }
      return {...todo, isEdit:false}
     }) 
    })
  
  }

  const handleonSave = ({id,title}) =>{
    setaddtodo((prev)=>{
      return prev.map((todo) =>{
        if(todo.id===id){
          return {
            ...todo, title, isEdit:false
          }
        }
        return todo
      })
    })
  }

const handleDeletItem = (id) =>{
   setaddtodo((prev)=>{
    return prev.filter(todo =>
      todo.id !== id
    )
   }
)
}

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput 
      inputValue={inputValue}
      onChange={handleInput}
      onAddTodo={handletodo}
      onKeyDown={handleKeydown}
      />
      <TodoCollection todos = {addtodo} 
      onToggleDone={handleToggleDone}
      onChangeMode={handlechangeMode}
      onSave={handleonSave}
      onDelete={handleDeletItem}
      />
      <Footer 
      sumAddtodo={sumAddtodo}
      />
    </div>
  );
};

export default TodoPage;
