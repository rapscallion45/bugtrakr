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
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import FormDialog from '../FormDialog/FormDialog';
import BugForm from '../BugForm/BugForm';
import { formatDateTime, getBugPriorityColor, truncateString } from '../../utils';
import { IBugState } from '../../redux/types/types';

const tableHeaders = ['Name', 'Priority', 'Status', 'Added', 'Updated', 'Notes', 'Actions'];

const TableStyle = styled(Table)(({ theme }) => ({
  '& thead th': {
    fontWeight: '600',
    backgroundColor: theme.palette.primary.main,
  },
}));

const TableRowStyle = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}20`,
    cursor: 'pointer',
  },
}));

interface BugsTableProps {
  bugs: IBugState[];
  projectId: string | string[];
}

const BugsTable: FC<BugsTableProps> = function BugsTable({ bugs, projectId }) {
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
                <Chip
                  label={b.priority.toUpperCase()}
                  color={getBugPriorityColor(b.priority)}
                  sx={{ fontWeight: 'bold' }}
                />
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/bugs/${b.id}`)} align="center">
                <Chip
                  label={b.isResolved ? 'Closed' : 'Open'}
                  color={b.isResolved ? 'secondary' : 'info'}
                />
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
                  projectId={projectId}
                />
              </TableCell>
            </TableRowStyle>
          ))}
        </TableBody>
      </TableStyle>
      {!bugs.length && (
        <Box display="flex" alignItems="center" flexDirection="column" py={5}>
          <Typography pb={1} variant="h6">
            No bugs to show.
          </Typography>
          <FormDialog
            triggerBtn={{
              type: 'normal',
              icon: AddIcon,
              text: 'Create New Bug',
            }}
            title="Create New Bug"
          >
            <BugForm isEditMode={false} projectId={projectId} />
          </FormDialog>
        </Box>
      )}
    </Paper>
  );
};

export default BugsTable;
