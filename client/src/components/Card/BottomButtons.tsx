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
  const {isModalVisible,preferences}=useAppSelector((state)=>state.global)
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Kullanıcının daha önce yaptığı işlemi belirle
    console.log("actions dizisi:", actions);
    if (actions?.includes('UPVOTE')) {
      setVoteValue('upvote');
    } else if (actions?.includes('DOWNVOTE')) {
      setVoteValue('downvote');
    }
    else{
      setVoteValue(null)
    }
    const isSaved=actions?.includes("SAVE")
    setIsSaved(isSaved)
    
  }, [actions]);
  useEffect(()=>{
      console.log(preferences)
     
  },[])

  useEffect(()=>{
      console.log("vote value değişti"+voteValue)
  },[voteValue])
  const handleVote = (type: 'upvote' | 'downvote' | null) => {
    if (!isAuthenticated) {
      showToast('error', 'Oy vermek için giriş yapmalısınız.');
      return;
    }
  
    // Eğer aynı oy tekrar basılırsa, oyu kaldır
    if (voteValue === type) {
      console.log(`${type} kaldırıldı!`);
      if (type === 'upvote') setUpvoteCount((prev) => prev - 1);
      if (type === 'downvote') setDownvoteCount((prev) => prev - 1);
      setVoteValue(null); // Oy değerini null olarak güncelle
      dispatch(voteNews({ newsLink: newsLink, type: type })); // Oy değerini null olarak güncelle
      return;
    }
  
    // Yeni bir oy verildiğinde
    const isUpvote = type === 'upvote';
  
    // Oy sayılarını güncelle
    if (isUpvote) {
      setUpvoteCount((prev) => prev + 1);
      if (voteValue === 'downvote') setDownvoteCount((prev) => prev - 1); // Eski downvote'u kaldır
    } else {
      setDownvoteCount((prev) => prev + 1);
      if (voteValue === 'upvote') setUpvoteCount((prev) => prev - 1); // Eski upvote'u kaldır
    }
  
    // Yeni oy değerini güncelle
    setVoteValue(type);
  
    // API'ye yeni oy değerini gönder
    try {
      dispatch(voteNews({ newsLink: newsLink, type }));
      dispatch(toggleModal());
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
      showToast('error','Haberi kaydederken bir hata oluştu')
    }
  }
  return (
    <div className="flex items-center justify-between">
      {isModalVisible&&<InformationModal title='Oy verdiğiniz için teşekkürler!' content='İlgilendiğiniz haberlere oy vererek size daha uygun bir akış oluşturacağız.' preferenceKey='showVotePopup'/>}
         
          {/* Oy Seçimi */}
          <div className="flex gap-3">
            <label>
             
              <AuthPopover
                isAuthenticated={isAuthenticated}
                triggerAction={() => handleVote('upvote')}
                message="Oy vermek için giriş yapmalısınız."
              >
                <div
                  className={`flex items-center p-2 ${
                    voteValue === 'upvote' ? 'bg-green-600 text-white' : 'text-green-500'
                  } rounded hover:bg-green-700 hover:text-white transition-colors cursor-pointer`}
                >
                  <UpCircleOutlined />
                  <span className="ml-1">{upvoteCount}</span>
                </div>
              </AuthPopover>
            </label>

            <label>
             
              <AuthPopover
                isAuthenticated={isAuthenticated}
                triggerAction={() => handleVote('downvote')}
                message="Oy vermek için giriş yapmalısınız."
              >
                <div
                  className={`flex items-center p-2 ${
                    voteValue === 'downvote' ? 'bg-red-600 text-white' : 'text-red-500'
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