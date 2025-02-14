'use client'
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import { getCategories, updateUserCategories } from '@/stores/Category/actions';
import '../../../globals.css';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import {SortableItem} from '@/components/Card/CategoryCard';


export const WaveSVG: React.FC = () => (
  <svg className="wave-svg w-full h-auto -z-50 absolute bottom-0" viewBox="0 0 2880 600" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,100 C640,200 840,0 1480,100 C2120,200 2240,0 2880,100 V600 H0 V100Z"
      fill="#229799"
      stroke="none"
    />
  </svg>
);

type Category = {
  id: string;
  categoryName: string;
};


type DraggableItem = {
  type: string;
  id: string;
  index: number;
  from: 'available' | 'selected';
};


export default function CreateFeedPage() {
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [initialSelectedCategories, setInitialSelectedCategories] = useState<Category[]>([]);
  const dispatch = useAppDispatch();
  const { allCategories, userCategories } = useAppSelector((state: { category: { allCategories: Category[], userCategories: Category[] } }) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (allCategories && userCategories && allCategories.length > 0) {
      const available = allCategories.filter(category => !userCategories.some(userCategory => userCategory.id === category.id));
      setAvailableCategories(available);
  
      // `id` değerini kontrol edin
      setSelectedCategories(
        userCategories.map(category => ({
          ...category,
          id: category.id || 'default-id',  // id'nin null olup olmadığını kontrol et
        }))
      );
      setInitialSelectedCategories(userCategories.map(category => ({
        ...category,
        id: category.id|| 'default-id',
      })));
    }
  }, [allCategories, userCategories]);
  

  const moveCategory = (dragIndex: number, hoverIndex: number, from: 'available' | 'selected', to: 'available' | 'selected') => {
    if (!isEditing) return;
  
    const dragCategory = from === 'available' ? availableCategories[dragIndex] : selectedCategories[dragIndex];
  
    let newAvailableCategories = [...availableCategories];
    let newSelectedCategories = [...selectedCategories];
  
    if (from === 'available' && to === 'selected') {
      newSelectedCategories.push(dragCategory);
      newAvailableCategories = availableCategories.filter((_, idx) => idx !== dragIndex);
    } else if (from === 'selected' && to === 'available') {
      newAvailableCategories.push(dragCategory);
      newSelectedCategories = selectedCategories.filter((_, idx) => idx !== dragIndex);
    } else if (from === to) {
      const categories = from === 'available' ? newAvailableCategories : newSelectedCategories;
      categories.splice(dragIndex, 1);
      categories.splice(hoverIndex, 0, dragCategory);
    }
  
    setAvailableCategories(newAvailableCategories);
    setSelectedCategories(newSelectedCategories);
  };
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedCategories(initialSelectedCategories);
  };

  const handleSave = () => {
    setIsEditing(false);
    dispatch(updateUserCategories({ selectedCategories: selectedCategories.map(category => category.id) }));
   
      
      
      // Filter out selected categories from available categories
      const updatedAvailableCategories = allCategories.filter(category => 
        !selectedCategories.some(selectedCategory => selectedCategory.id === category.id)
      );
      setAvailableCategories(updatedAvailableCategories);
    };
    
    const dropRef = React.useRef<HTMLDivElement | null>(null);
    const [{ isOver }, drop] = useDrop(() => ({   
      accept: 'CATEGORY',
      drop: (item: DraggableItem) => {
        moveCategory(item.index, selectedCategories.length, 'available', 'selected');
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));
    drop(dropRef)
    

  return (
    
    <div className='min-h-screen w-full relative flex flex-col'>
      <div className="flex justify-end p-4">
        {!isEditing ? (
          <button className="btn btn-primary  flex gap-x-2 items-center hover:bg-appcolor text-white font-bold py-2 px-4 rounded" onClick={handleEdit}><EditOutlined /><span>Düzenle</span></button>
        ) : (
          <>
            <button className="btn btn-secondary bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleCancel}>Vazgeç</button>
            <button className="btn btn-primary bg-appcolor flex gap-x-2 items-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}><SaveOutlined /><span>Kaydet</span></button>
          </>
        )}
        
      </div>
      
        <div className="flex-grow flex flex-col space-y-8 p-8">
        <div className="text-center">
  <h3 className="text-2xl mb-6 font-bold">Seçilen Kategoriler</h3>
  <div ref={dropRef}
  
     // 🟢 Drop bölgesini buraya ekledik
    className={`flex flex-wrap justify-center gap-4 min-h-[100px] border-dashed border-2 ${
      isOver ? 'border-appcolor bg-gray-100' : 'border-gray-400'
    } p-4`}
  >
    {selectedCategories.length === 0 ? (
      <p className="text-gray-500">Buraya kategori sürükleyin</p>
    ) : (
      selectedCategories.map((category, index) => (
        <SortableItem
          disabled={!isEditing}
          isSelected={true}
          key={category.id}
          category={category}
          index={index}
          moveCategory={moveCategory}
          from="selected"
          isEditing={isEditing}
          selectedCategories={selectedCategories}
        />
      ))
    )}
  </div>
</div>

        </div>

        <div className='relative w-full h-[600px] flex '>
          <div className="content absolute inset-0 bottom-11 z-10 flex items-start justify-center">
            <div className="text-center">
              <h3 className='text-2xl mb-6 font-bold text-primary-foreground'>Uygun Kategoriler</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {availableCategories.map((category, index) => (
                  <SortableItem disabled={!isEditing} isSelected={false} key={category.id} category={category} index={index} moveCategory={moveCategory} from="available" isEditing={isEditing} selectedCategories={selectedCategories} />
                ))}
              </div>
            </div>
            <div className="wave-wrapper absolute inset-0 z-0">
              <WaveSVG />
            </div>
          </div>
        </div>
      
    </div>
   
  );
}
