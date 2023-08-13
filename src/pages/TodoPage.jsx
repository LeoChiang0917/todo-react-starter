import { Footer, Header, TodoCollection, TodoInput, } from 'components';
import { useEffect } from 'react';
import { createTodo, getTodos, patchTodo, deleteTodo } from '../api/todo';
import { useState } from 'react';


const TodoPage = () => {

  const [inputValue,Setinputvalve] = useState('')
  const [addtodo, setaddtodo] = useState([])

  const sumAddtodo = addtodo.length

   const handleInput = (value) => {
    Setinputvalve(value);
  };

  const handletodo = async() =>{
     if (inputValue.length === 0) {
      return;
    }
    try{const data = await createTodo({
      title:inputValue,
      isDone:false
    });

    setaddtodo((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: data.id,
          title: data.title,
          isDone: false,
          isEdit:false
        },
      ];
    });
  }catch(error){
    console.error(error)
  }  
    Setinputvalve('');
  };

  const handleKeydown = async() =>{
     if (inputValue.length === 0) {
      return;
    }
    try{const data = await createTodo({
      title:inputValue,
      isDone:false
    });

    setaddtodo((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: data.id,
          title: data.title,
          isDone: false,
          isEdit:false
        },
      ];
    });
  }catch(error){
    console.error(error)
  }  
    Setinputvalve('');
  };

const handleToggleDone = async(id) => {
const currentTodo = addtodo.find((todo)=>todo.id===id);
try{
   await patchTodo({
    id,
    isDone: !currentTodo.isDone,
   });
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
}catch(error){
  console.error(error)
}
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

  const handleonSave = async({id,title}) =>{
  try{
  await patchTodo({
    id,
    title
   });
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
  }catch(error){
    console.error(error)
  }

    
  }

const handleDeletItem = async(id) =>{
   try{
    await deleteTodo(id)
     setaddtodo((prev)=>{
    return prev.filter(todo =>
      todo.id !== id
    )
   }
)
   }catch(error){
    console.error(error)
   } 
}

useEffect(() =>{
const getTodoAsync = async () =>{
  try{
    const todos = await getTodos()
    setaddtodo(todos.map((todo)=>({
      ...todo, isEdit:false
    })))
  }catch(error){
    console.error(error)
  }
}
getTodoAsync();
}, [])

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
