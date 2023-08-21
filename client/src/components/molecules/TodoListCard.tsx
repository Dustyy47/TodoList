import { RemoveIcon } from '../icons/RemoveIcon';

export interface TodoListData {
  id: number;
  authorId: string;
  title: string;
}

export function TodoListCard({
  data,
  onClick,
  onDelete,
  readonly = false
}: {
  data: TodoListData;
  onClick?: (id: number) => void;
  onDelete?: (id: number) => void;
  readonly: boolean;
}) {
  function handleClick() {
    if (onClick) onClick(data.id);
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (onDelete) onDelete(data.id);
  }

  return (
    <div
      onClick={handleClick}
      className='flex justify-between items-start w-full paragraph cursor-pointer hover:bg-white-hover bg-white-common p-5 rounded-common'
    >
      <h3 className='heading'>{data.title}</h3>
      <div>
        <button onClick={handleDelete} className='hover:text-red-common'>
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
}
