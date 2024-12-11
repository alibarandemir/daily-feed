import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import { changePreferences } from '@/stores/Global/actions';
import { toggleModal } from '@/stores/Global/GlobalSlice';
import { Modal, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';

type Props = {
  title: string;
  content: string;
  preferenceKey: string; // Backend'deki tercih anahtarı
  onConfirm?: () => void; // Modal onaylandığında yapılacak işlem
};

export default function InformationModal({
  title,
  content,
  preferenceKey,
  onConfirm,
}: Props) {
 
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const {isModalVisible}=useAppSelector((state)=>state.global)
  const dispatch=useAppDispatch();
  useEffect(() => {
    // LocalStorage'dan preferences bilgisini al
    const preferences = localStorage.getItem("preferences");
    const parsedPreferences = preferences ? JSON.parse(preferences) : {};

    // Eğer preferenceKey'e göre modal gösterilmemesi gerekiyorsa, modalı kapat
    if (parsedPreferences[preferenceKey] === false) {
      console.log("selamlar")
      dispatch(toggleModal()); // Modal kapalı hale getirilir
    }
  }, []);

  //kullanıcı tercihine göre bir şeyler döndüreceksin
  
  const handleOk = async () => {
    dispatch(toggleModal())

    
    if (doNotShowAgain) {
      //backende kullanıcı tercihini kayddettireceksin
      dispatch(changePreferences({preferencesKey:preferenceKey,value:false}))
      const preferences = localStorage.getItem("preferences");
      const parsedPreferences = preferences ? JSON.parse(preferences) : {};
      parsedPreferences[preferenceKey] = false;
      localStorage.setItem("preferences", JSON.stringify(parsedPreferences));

    }

    
  };
  const handleCancel = async () => {
    dispatch(toggleModal())

    
 
    
  };

  return (
    <Modal
      title={title}
      open={isModalVisible}
      onOk={handleOk}
      okText='Tamam'
      onCancel={handleCancel}
      
      cancelText='iptal'
    >
      <p>{content}</p>
      <div className="flex items-center gap-x-1 mt-3">
        <Checkbox onChange={(e) => setDoNotShowAgain(e.target.checked)}>
          Bunu bir daha gösterme
        </Checkbox>
      </div>
    </Modal>
  );
}
