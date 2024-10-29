import { Pagination as AntPagination } from 'antd';

type PaginationProps = {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ current, pageSize, total, onChange }) => {
  return (
    <AntPagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
    />
  );
};

export default Pagination;
