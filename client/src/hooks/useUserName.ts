// hooks/useUserName.ts
import { useEffect, useState } from 'react'
import { api } from '@/config/axios'

const useUserName = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const localName = localStorage.getItem('userName');

    if (localName) {
      setUserName(localName);
    } else {
      api.get('/auth/me')
        .then(res => {
          const { name, lastname } = res.data.data;
          const fullName = `${name} ${lastname}`;
          localStorage.setItem('userName', fullName);
          setUserName(fullName);
        })
        .catch(err => {
          
          setUserName(null);
        });
    }
  }, []);

  return userName;
};

export default useUserName;
