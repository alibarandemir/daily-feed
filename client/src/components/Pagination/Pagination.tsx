import React from 'react';
import { Pagination as AntPagination, ConfigProvider } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';

type PaginationProps = {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ current, pageSize, total, onChange }) => {
  const paginationTheme: ThemeConfig = {
    components: {
      Pagination: {
        itemActiveBg: '#0E1217', // Aktif sayfa numarası için mavi arka plan app color
        itemActiveColorDisabled: '#0000', // Aktif sayfa numarası için beyaz yazı rengi
        colorBgTextHover:'#ffff',
        itemLinkBg: '#ffff', // Normal durumda şeffaf arka plan
        itemSize: 34, // Sayfa numarası düğmelerinin boyutu
        itemBg: '#f0f0f0', // Normal durumda açık gri arka plan
        itemInputBg: '#0000', // Input alanı için beyaz arka plan
        colorPrimary: '#ffff', 
        colorPrimaryHover:'#229799'
      },
    },
  };
  return (
    <ConfigProvider theme={paginationTheme}>
      <AntPagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false} // Sayfa başına öğe sayısı seçeneğini gizle
        showQuickJumper={false} // Hızlı sayfa atlama özelliğini gizle
      />
    </ConfigProvider>
  );
};

export default Pagination;

