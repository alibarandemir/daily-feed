import React, { useState } from 'react';
import { Popover, Button } from 'antd';
import Link from 'next/link';

type AuthPopoverProps = {
  children: React.ReactNode;
  triggerAction: () => void;
  message: string;
  isAuthenticated: boolean|null;
};

const AuthPopover: React.FC<AuthPopoverProps> = ({ children, triggerAction, message, isAuthenticated }) => {
  const [visible, setVisible] = useState(false);

  const handleAction = () => {
    if (!isAuthenticated) {
      setVisible(true);
      return;
    }
    triggerAction();
  };

  const popoverContent = (
    <div className='flex flex-col gap-y-3'>
      <p>{message}</p>
      <Link href="/login">
        <Button className='bg-secondary text-white hover:bg-appcolor '>Giriş Yap</Button>
      </Link>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      visible={visible}
      onVisibleChange={(v) => setVisible(v)}
      trigger="click"
    >
      <div onClick={handleAction}>{children}</div>
    </Popover>
  );
};

export default AuthPopover;
