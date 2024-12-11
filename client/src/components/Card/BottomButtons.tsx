import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import useAuth from '@/hooks/useAuth';
import { saveNews, voteNews } from '@/stores/User/actions';
import { DownCircleOutlined, InboxOutlined, UpCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import AuthPopover from '../AuthPopover/AuthPopover';
import { showToast } from '@/utils/showToast';
import { Modal } from 'antd';
import InformationModal from '../Modal/Modal';
import { toggleModal } from '@/stores/Global/GlobalSlice';

type Props = {
    upvote:number,
    downvote:number,
    actions:string[],
    newsLink:string,
    category:string
}

export default function BottomButtons({upvote,downvote,actions,newsLink,category}: Props) {
    const { isAuthenticated } = useAuth();
  const [voteValue, setVoteValue] = useState<'upvote' | 'downvote' | null>(null);
  const [isSaved,setIsSaved]=useState<boolean>(false)
  const [upvoteCount, setUpvoteCount] = useState(upvote);
  const [downvoteCount, setDownvoteCount] = useState(downvote);
  const {isModalVisible}=useAppSelector((state)=>state.global)
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Kullanıcının daha önce yaptığı işlemi belirle
    console.log(actions)
    if (actions?.includes('UPVOTE')) {
      setVoteValue('upvote');
    } else if (actions?.includes('DOWNVOTE')) {
      setVoteValue('downvote');
    }
    const isSaved=actions?.includes("SAVE")
    setIsSaved(isSaved)
    
  }, []);
  const handleVote = (type: 'upvote' | 'downvote') => {
    console.log(isAuthenticated)
    if (actions.includes(type.toUpperCase())) {
        showToast('info', 'Daha önce aynı oyu verdiniz')
        return; // İşlemi durdur
      }
    // Seçili bir değer varsa ve tekrar aynı değer seçiliyorsa oyu kaldır
    if (voteValue === type) {
      setVoteValue(null);
      console.log(`${type} kaldırıldı!`);
      if (type === 'upvote') setUpvoteCount((prev) => prev - 1);
      if (type === 'downvote') setDownvoteCount((prev) => prev - 1);
      return;
    }

    // Yeni bir oy seçildiğinde durumu güncelle
    const isUpvote = type === 'upvote';
    setVoteValue(type);

    // Oy sayısını güncelle
    if (isUpvote) {
      setUpvoteCount((prev) => prev + 1);
      if (voteValue === 'downvote') setDownvoteCount((prev) => prev - 1); // Downvote kaldırılır
    } else {
      setDownvoteCount((prev) => prev + 1);
      if (voteValue === 'upvote') setUpvoteCount((prev) => prev - 1); // Upvote kaldırılır
    }

    try {
      // Örneğin, `newsContent.link` ile haberi oyla
       dispatch(voteNews({ newsLink: newsLink, type }));
       dispatch(toggleModal())
       console.log(isModalVisible)
       
    } catch (e: any) {
      console.error('Haberi oylarken bir hata oluştu:', e.message);
    }
  };
  const handleSave=()=>{
    try{
        dispatch(saveNews(newsLink));
        setIsSaved((prev)=>!prev)
        
        
    }
    catch(e){

    }
  }
  return (
    <div className="flex items-center justify-between">
      {isModalVisible&&<InformationModal title='Oy verdiğiniz için teşekkürler!' content='İlgilendiğiniz haberlere oy vererek size daha uygun bir akış oluşturacağız.' preferenceKey='showVotePopup'/>}
         
          {/* Oy Seçimi */}
          <div className="flex gap-3">
            <label>
              <input
                type="radio"
                className="hidden"
                checked={voteValue === 'upvote'}
                onChange={() => handleVote('upvote')}
              />
              <AuthPopover
                isAuthenticated={isAuthenticated}
                triggerAction={() => handleVote('upvote')}
                message="Oy vermek için giriş yapmalısınız."
              >
                <div
                  className={`flex items-center p-2 ${
                    voteValue === 'upvote' ? 'bg-green-700 text-white' : 'text-green-500'
                  } rounded hover:bg-green-700 hover:text-white transition-colors cursor-pointer`}
                >
                  <UpCircleOutlined />
                  <span className="ml-1">{upvoteCount}</span>
                </div>
              </AuthPopover>
            </label>

            <label>
              <input
                type="radio"
                className="hidden"
                checked={voteValue === 'downvote'}
                onChange={() => handleVote('downvote')}
              />
              <AuthPopover
                isAuthenticated={isAuthenticated}
                triggerAction={() => handleVote('downvote')}
                message="Oy vermek için giriş yapmalısınız."
              >
                <div
                  className={`flex items-center p-2 ${
                    voteValue === 'downvote' ? 'bg-red-700 text-white' : 'text-red-500'
                  } rounded hover:bg-red-700 hover:text-white transition-colors cursor-pointer`}
                >
                  <DownCircleOutlined />
                  <span className="ml-1">{downvoteCount}</span>
                </div>
              </AuthPopover>
            </label>
          </div>

          {/*Kategori */}
          <div className='text-appcolor font-bold'>
            #<span className='text-gray-400'>{category}</span>
          </div>

          {/* Kaydetme */}
          <AuthPopover
            isAuthenticated={isAuthenticated}
            triggerAction={() => handleSave()}
            message="Kaydetmek için giriş yapmalısınız."
          >
            <div className="flex items-center justify-center bg-gray-900 p-3 rounded gap-3">
              <InboxOutlined className={` ${isSaved? "text-appcolor text-xl":"text-white"} text-lg hover:text-gray-700 transition-colors cursor-pointer`} />
            </div>
          </AuthPopover>
        </div>
  )
}