import TodoItem from './TodoItem';

const TodoCollection = ({todos, onToggledone, onSave, onDelete, onChangemode}) => {
  return (
    <div>
      {todos.map(todo => {
        return <TodoItem key = {todo.id} todo = {todo}/>
      })}
    </div>
  );
};

export default TodoCollection;
