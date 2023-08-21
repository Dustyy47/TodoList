import {
  EditTodoHandler,
  RemoveTodoHandler,
  Todo,
  TodoData,
  TodoID
} from '../molecules/Todo';

export function TodoList({
  todos,
  onStartEditTodo,
  onFinishEditTodo,
  onDeleteTodo,
  editTodos,
  loadingTodosIDs,
  readonlyTodo = false
}: {
  todos: TodoData[];
  editTodos: number[];
  onStartEditTodo: EditTodoHandler;
  onFinishEditTodo: EditTodoHandler;
  onDeleteTodo: RemoveTodoHandler;
  loadingTodosIDs: TodoID[] | null;
  readonlyTodo?: boolean;
}) {
  function toggleEdit(todo: TodoData) {
    if (!editTodos?.includes(todo.id)) {
      onStartEditTodo(todo);
    } else {
      onFinishEditTodo(todo);
    }
  }

  return (
    <div className='w-full'>
      {todos.map((todo) => (
        <div className='w-full mb-[.625rem] last:mb-0' key={todo.id}>
          <Todo
            onEdit={toggleEdit}
            isEditing={editTodos?.includes(todo.id) ?? false}
            readonly={readonlyTodo}
            isLoading={loadingTodosIDs?.includes(todo.id) ?? false}
            onEditComplete={onFinishEditTodo}
            onDelete={onDeleteTodo}
            data={todo}
          />
        </div>
      ))}
    </div>
  );
}
