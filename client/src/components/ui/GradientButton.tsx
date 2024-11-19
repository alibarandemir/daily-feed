import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(6,6,40,1) 19%, rgba(17,68,97,1) 45%, rgba(23,134,157,1) 74%, rgba(0,212,255,1) 97%);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

interface GradientButtonProps {
  text: string;
  icon?: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({ text, icon }) => {
  const { styles } = useStyle();

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Space>
        <Button type="primary" size="large" icon={icon}>
          {text}
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default GradientButton;
