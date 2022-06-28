import { FC } from 'react';
import router from 'next/router';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Paper,
  Typography,
} from '@mui/material';
// import { useSelector } from 'react-redux';
// import { ProjectState } from '../../redux/types';
// import { selectAuthState } from '../../redux/slices/authSlice';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import { formatDateTime, truncateString } from '../../utils';

const tableHeaders = ['Name', 'Priority', 'Status', 'Added', 'Updated', 'Notes', 'Actions'];

const TableStyle = styled(Table)(({ theme }) => ({
  '& thead th': {
    fontWeight: '600',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.light,
  },
}));

const TableRowStyle = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}20`,
    cursor: 'pointer',
  },
}));

interface BugsTableProps {
  bugs: any[];
}

const BugsTable: FC<BugsTableProps> = function ProjectsTable({ bugs }) {
  //   const { user } = useSelector(selectAuthState);

  return (
    <Paper>
      <TableStyle>
        <TableHead>
          <TableRow>
            {tableHeaders.map((t) => (
              <TableCell key={t} align="center">
                {t}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bugs.map((b) => (
            <TableRowStyle key={b.id}>
              <TableCell onClick={() => router.push(`/dashboard/bugs/${b.id}`)} align="center">
                <Box color="secondary">
                  <Typography variant="h6"> {truncateString(b.title, 30)}</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/bugs/${b.id}`)} align="center">
                {b.priority}
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/bugs/${b.id}`)} align="center">
                {b.isResolved ? 'Closed' : 'Open'}
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/bugs/${b.id}`)} align="center">
                {formatDateTime(b.createdAt)} ~ {b.createdBy.username}
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/bugs/${b.id}`)} align="center">
                {!b.updatedAt || !b.updatedBy
                  ? 'n/a'
                  : `${formatDateTime(b.updatedAt)} ~ ${b.updatedBy.username}`}
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/bugs/${b.id}`)} align="center">
                {b.notes.length}
              </TableCell>
              <TableCell align="center">
                <ActionsPopover
                  bugId={b.id}
                  currentData={{ title: b.title, description: b.description, priority: b.priority }}
                  isResolved={b.isResolved}
                  isMobile={false}
                />
              </TableCell>
            </TableRowStyle>
          ))}
        </TableBody>
      </TableStyle>
    </Paper>
  );
};

export default BugsTable;
