import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';


type DraggableItem = {
  type: string;
  id: string;
  index: number;
  from: 'available' | 'selected';
};
type Category = {
  id: string;
  categoryName: string;
};
export const SortableItem: React.FC<{
  category: Category;
  isSelected: boolean;
  disabled: boolean;
  index: number;
  moveCategory: (dragIndex: number, hoverIndex: number, from: 'available' | 'selected', to: 'available' | 'selected') => void;
  from: 'available' | 'selected';
  isEditing: boolean;
  selectedCategories: Category[];
}> = ({ category, isSelected, disabled, index, moveCategory, from, isEditing, selectedCategories }) => {
  const style = {
    
    width: '130px',
    padding: '6px 8px',
    marginBottom: '8px',
    border: isSelected ? '3px solid #229799' : '1px solid #0000',
    borderRadius: '6px',
    backgroundColor: disabled ? '#e0e0e0' : '#f5f5f5',
    cursor: disabled ? 'not-allowed' : 'grab',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    
  };
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<DraggableItem>({
    accept: 'CATEGORY',
    hover(item: DraggableItem) {
      if (!isEditing) return;
      if (!ref.current) return;
  
      const hoverIndex = index;
      if (item.index === hoverIndex && item.from === from) return;
  
      moveCategory(item.index, hoverIndex, item.from, from);
      item.index = hoverIndex;
      item.from = from;
    },
    drop: (item: DraggableItem) => {
      if (from === 'available' ) {
        console.log("Bırakılan öğe:", item);
        moveCategory(item.index, index, item.from, from);
      } else if (from === 'selected') {
        moveCategory(item.index, index, item.from, from);
      }
    },
  });
  
  

  const [{ isDragging }, drag] = useDrag({
    type: 'CATEGORY',
    item: { type: 'CATEGORY', id: category.id, index, from },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isEditing) {
    //drag(drop(ref));
    drag(ref)
  }

  return (
    <div style={style} ref={ref} className="sortable-item  rounded-xl bg-gray-50 text-black border-appcolor border-2" >
      {category.categoryName}
    </div>
  );
};
