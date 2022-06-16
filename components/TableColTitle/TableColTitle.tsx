import { FC } from 'react';
import Tooltip from '@mui/material/Tooltip';

interface TableColTitleProps {
  children?: any;
  tooltipText?: string;
  clickHandler?: () => void;
}

const TableColTitle: FC<TableColTitleProps> = function TableColTitle({
  children,
  tooltipText,
  clickHandler = () => null,
}) {
  return (
    <Tooltip
      title={tooltipText}
      sx={{ maxWidth: '300px', textAlign: 'center' }}
      onClick={clickHandler}
    >
      {children}
    </Tooltip>
  );
};
export default TableColTitle;
