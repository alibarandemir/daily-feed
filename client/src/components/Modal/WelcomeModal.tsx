import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import { resetAuthState, resetIsLogIn } from '@/stores/Auth/AuthSlice'
import { getPreferences, changePreferences} from '@/stores/Global/actions'
import { setPreferences, toggleModal } from '@/stores/Global/GlobalSlice'
import { Modal, Checkbox, List } from 'antd'
import React, { useEffect, useState } from 'react'


export default function WelcomeModal() {
    const {isModalVisible,preferences}=useAppSelector((state)=>state.global)
    const {isLogIn}=useAppSelector((state)=>state.auth)
    const dispatch=useAppDispatch()
    const [doNotShowAgain, setDoNotShowAgain] = useState(false)

    useEffect(()=>{
            const storedPreferences = localStorage.getItem('preferences')
            if(!storedPreferences){
                    dispatch(getPreferences())
            }
            else{
                const parsedPreferences = JSON.parse(storedPreferences)
                console.log(isLogIn)
                console.log(parsedPreferences)
                if(isLogIn&&parsedPreferences.showWelcomeMessagePopup === true){
                    dispatch(toggleModal())
                }   
            }
    },[isLogIn, dispatch])
    const closeModal=()=>{
        if (doNotShowAgain) {
            console.log('bunu bir daha gösterme işaretli')
            dispatch(changePreferences({ preferencesKey:'showWelcomeMessagePopup',value:false}))   
        }
        dispatch(toggleModal())
        dispatch(resetIsLogIn())
    }
  return (
    <Modal 
        title='Hoş Geldiniz🎉' 
        open={isModalVisible} 
        onClose={closeModal} 
        onOk={closeModal} 
        okText='Tamam' 
        cancelText=''
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
    >
        <p>Sum<span className='text-appcolor'>flood</span> <span className='font-bold'>V1</span>'e hoşgeldiniz. Bu uygumalayı hepimizin haberleri yakından takip etmeyi ederken de zaman kazanmayı amaçlayarak geliştirdim. Kendinize özel akışlar oluşturup ilgi alanlarınızla ilgili konuları takip edebilirsiniz. İstediğiniz haberi özetleyerek zaman kazanıp okumalar yapabilirsiniz.</p>
        <p>Uygulamadaki eksiklikleri gidermem adına geri dönüşünüz ve desteğiniz benim için çok önemli. Bana iletişim adreslerimden ulaşabilirsiniz. En büyük desteğiniz uygulamayı kullanmak olacaktır.</p>
        <hr className='border-2 my-3'/>
        <h4 className='w-full text-center'>Notlar -<span className='font-bold'>V1</span>-</h4>
        <List
            bordered
            dataSource={[
                "Özetleme yaparken Api kullanıldığı için her isteğin fiyatlandırması var. O yüzden şimdilik özetleme yaparken bazı kısıtlamalar var ama ileriki versiyonlarda kendi summarization modelimi oluşturup kullanacağım.",
                
            ]}
            renderItem={item => (
                <List.Item>
                    {item}
                </List.Item>
            )}
        />

        <Checkbox onChange={(e) => setDoNotShowAgain(e.target.checked)}>
            Bunu bir daha gösterme
        </Checkbox>
    </Modal>
  )
}