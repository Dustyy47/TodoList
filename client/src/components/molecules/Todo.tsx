import { ChangeEvent, useState } from 'react';
import { EditIcon } from '../icons/EditIcon';
import { LoadingIcon } from '../icons/LoadingIcon';
import { RemoveIcon } from '../icons/RemoveIcon';
import { ToggleIcon } from '../icons/ToggleIcon';

export type EditTodoHandler = (newTodo: TodoData) => void;
export type RemoveTodoHandler = (todoID: TodoID) => void;
export type TodoID = number; // for easier refactoring if id will change to another type

export interface TodoData {
  id: TodoID;
  title: string;
  text: string;
  isCompleted: boolean;
}

export function Todo({
  data,
  onEditComplete,
  onEdit,
  onDelete,
  isLoading,
  isEditing,
  readonly
}: {
  data: TodoData;
  onEdit: EditTodoHandler;
  onEditComplete: EditTodoHandler;
  onDelete: RemoveTodoHandler;
  isLoading: boolean;
  isEditing: boolean;
  readonly: boolean;
}) {
  const [newTitle, setNewTitle] = useState(data.title);
  const [newText, setNewText] = useState(data.text);

  function handleToggle() {
    onEditComplete({ ...data, isCompleted: !data.isCompleted });
  }

  function handleClickEdit() {
    onEdit({ ...data, title: newTitle, text: newText });
  }

  function handleDelete() {
    onDelete(data.id);
  }

  function handleTypeNewTitle(e: ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.target.value);
  }

  function handleTypeNewText(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewText(e.target.value);
  }

  function renderButtons() {
    if (readonly) return null;
    if (isLoading) {
      return <LoadingIcon />;
    }
    return (
      <>
        <button className='hover:' onClick={handleToggle}>
          <ToggleIcon isActive={data.isCompleted} />
        </button>
        <button onClick={handleClickEdit} className='hover:text-[#008080]'>
          <EditIcon isActive={isEditing} />
        </button>
        <button onClick={handleDelete} className='hover:text-red-common'>
          <RemoveIcon />
        </button>
      </>
    );
  }

  return (
    <div
      className='flex justify-between items-start w-full paragraph bg-white-common p-5 rounded-common'
      aria-disabled={isLoading}
    >
      <div className='w-[70%]'>
        {isEditing ? (
          <input
            disabled={isLoading}
            className='w-full outline-none placeholder:text-gray-placeholder heading mb-3 border-[1px] border-[transparent] border-b-gray-placeholder p-1'
            value={newTitle}
            placeholder='Введите название дела'
            onChange={handleTypeNewTitle}
            type='text'
          />
        ) : (
          <h4 className='heading mb-3 p-1 border-[2px] border-[transparent]'>
            {data.title}
          </h4>
        )}
        {isEditing ? (
          <textarea
            disabled={isLoading}
            className='w-full outline-none placeholder:text-gray-placeholder parapgraph mb-3 border-[1px] border-[transparent] border-b-gray-placeholder p-1'
            value={newText}
            placeholder='Введите Описание дела'
            onChange={handleTypeNewText}
          />
        ) : (
          <div className='paragraph break-words'>{data.text}</div>
        )}
      </div>
      <div className='flex items-center gap-[1.4375rem]'>{renderButtons()}</div>
    </div>
  );
}
