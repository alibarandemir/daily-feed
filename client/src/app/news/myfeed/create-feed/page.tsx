'use client';
import React, { useEffect, useState, useRef } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import { getCategories, updateUserCategories } from '@/stores/Category/actions';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { SortableItem } from '@/components/Card/CategoryCard';

interface Category {
    id: number; // veya string, hangi türde olduğunuza bağlı
    name: string; // Kategorinin diğer özellikleri
    // Diğer özellikler...
}
const WaveSVG: React.FC = () => (
  <svg
    className="wave-svg w-[800px]  h-[150px] md:h-[180px] lg:h-[200px] -z-50 absolute bottom-0"
    viewBox="0 0 1440 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0,100 C320,200 420,0 740,100 C1060,200 1120,0 1440,100 V300 H0 V100Z"
      fill="#229799"
      stroke="none"
    />
  </svg>
);

export default function CreateFeedPage() {
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { allCategories, userCategories }: { allCategories: Category[]; userCategories: Category[] } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (allCategories?.length > 0) {
      const available = allCategories.filter(category => !userCategories.some(userCategory => userCategory.id === category.id));
      setAvailableCategories(available);
      setSelectedCategories(userCategories);
    }
  }, [allCategories, userCategories]);

  const moveCategory = (dragIndex:any, hoverIndex:any, from:any, to:any) => {
    if (!isEditing) return;
    
    let updatedAvailable = [...availableCategories];
    let updatedSelected = [...selectedCategories];
    let movedCategory;
    
    if (from === 'available' && to === 'selected') {
      movedCategory = updatedAvailable.splice(dragIndex, 1)[0];
      updatedSelected.push(movedCategory);
    } else if (from === 'selected' && to === 'available') {
      movedCategory = updatedSelected.splice(dragIndex, 1)[0];
      updatedAvailable.push(movedCategory);
    } else if (from === to) {
      const list = from === 'available' ? updatedAvailable : updatedSelected;
      list.splice(hoverIndex, 0, list.splice(dragIndex, 1)[0]);
    }
    
    setAvailableCategories(updatedAvailable);
    setSelectedCategories(updatedSelected);
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setSelectedCategories(userCategories);
  };
  const handleSave = () => {
    setIsEditing(false);
    dispatch(updateUserCategories({ selectedCategories: selectedCategories.map(category => category.id) }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='min-h-screen w-full flex flex-col'>
        <div className='flex justify-end p-4'>
          {!isEditing ? (
            <button className='btn btn-primary flex gap-x-2 p-2 rounded-sm items-center hover:bg-appcolor transition-transform duration-300 transform hover:scale-105' onClick={handleEdit}>
              <EditOutlined /> Düzenle
            </button>
          ) : (
            <div className='flex gap-x-3'>
              <button className='btn btn-secondary bg-gray-600 rounded-sm p-2 hover:bg-opacity-70' onClick={handleCancel}>Vazgeç</button>
              <button className='btn btn-primary bg-green-600 p-2 text-lg rounded-sm hover:bg-opacity-75' onClick={handleSave}><SaveOutlined /> Kaydet</button>
            </div>
          )}
        </div>
        <div className='flex flex-col space-y-12 px-8'>
          <CategoryDropArea title='Seçilen Kategoriler' categories={selectedCategories} moveCategory={moveCategory} from='selected' isEditing={isEditing} />
          <CategoryDropArea title='Uygun Kategoriler' categories={availableCategories} moveCategory={moveCategory} from='available' isEditing={isEditing} />
        </div>
      </div>
    </DndProvider>
  );
}

const CategoryDropArea: React.FC<{
  title: string;
  categories: any[];
  moveCategory: (dragIndex: number, hoverIndex: number, from: any, to: any) => void;
  from: any;
  isEditing: boolean;
}> = ({ title, categories, moveCategory, from, isEditing }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ isOver }, drop] = useDrop({
    accept: 'CATEGORY',
    drop: (item: any) => moveCategory(item.index, categories.length, item.from, from),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  drop(ref);

  return (
    <div className="relative flex justify-center items-center py-16">
      {/* Dalga SVG Arka Plan */}
      {title === 'Uygun Kategoriler' && (
        <div className="absolute inset-0 flex items-end ">
          <WaveSVG />
        </div>
      )}

      <div className="relative z-10 text-center w-full max-w-4xl">
        <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
        <div
          ref={ref}
          className={`flex flex-wrap justify-center gap-4 border-2 border-dashed p-4 rounded-lg shadow-lg ${title==='Uygun Kategoriler'?'bg-white bg-opacity-60':''} ${
            isOver && from === 'selected' ? 'bg-gray-300 bg-opacity-50' : ''
          }`}
        >
          {categories.length === 0 ? (
            <p className="text-gray-500">Buraya kategori sürükleyin</p>
          ) : (
            categories.map((category: any, index: number) => (
              <SortableItem
                key={category.id}
                category={category}
                index={index}
                moveCategory={moveCategory}
                from={from}
                isEditing={isEditing}
                isSelected={from === 'selected'}
                disabled={!isEditing}
                selectedCategories={categories}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
