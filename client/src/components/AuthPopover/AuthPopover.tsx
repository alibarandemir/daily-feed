import React from 'react';
import { Popover, Button } from 'antd';
import Link from 'next/link';

type AuthPopoverProps = {
  children: React.ReactNode;
  triggerAction: () => void;
  message: string;
  isAuthenticated: boolean | null;
};

const AuthPopover: React.FC<AuthPopoverProps> = ({ children, triggerAction, message, isAuthenticated }) => {
  if (isAuthenticated) {
    return <div onClick={triggerAction}>{children}</div>;
  }

  return (
    <Popover
      content={
        <div className="flex flex-col gap-y-3">
          <p>{message}</p>
          <Link href="/login">
            <Button className="bg-secondary text-white hover:bg-appcolor">Giriş Yap</Button>
          </Link>
        </div>
      }
      trigger="click"
    >
      <div>{children}</div>
    </Popover>
  );
};

export default AuthPopover;
