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
  SortDirection,
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import FormDialog from '../FormDialog/FormDialog';
import BugForm from '../BugForm/BugForm';
import { formatDateTime, getBugPriorityColor, truncateString } from '../../utils';
import { IBugState } from '../../redux/types/types';

interface ITableHeader {
  label: string;
  value: string;
  sortAsc: string | null;
  sortDesc: string | null;
}

const tableHeaders: ITableHeader[] = [
  { label: 'Name', value: 'name', sortAsc: 'a-z', sortDesc: 'z-a' },
  { label: 'Priority', value: 'priority', sortAsc: 'h-l', sortDesc: 'l-h' },
  { label: 'Status', value: 'status', sortAsc: 'closed', sortDesc: 'reopened' },
  { label: 'Added', value: 'added', sortAsc: 'newest', sortDesc: 'oldest' },
  { label: 'Updated', value: 'updated', sortAsc: 'updated', sortDesc: null },
  { label: 'Notes', value: 'notes', sortAsc: 'most-notes', sortDesc: 'least-notes' },
  { label: 'Actions', value: 'actions', sortAsc: null, sortDesc: null },
];

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
  projectId?: string | string[];
  isMyBugs?: boolean;
  sortBy: string;
  sortDir: SortDirection;
  sortChange: (value: string) => void;
}

const BugsTable: FC<BugsTableProps> = function BugsTable({
  bugs,
  projectId,
  isMyBugs,
  sortBy,
  sortDir,
  sortChange,
}) {
  const handleTHeadClick = (value: string) => {
    const type = tableHeaders.find((header) => header.value === value);
    if (type.sortAsc && type.sortDesc) {
      sortChange(sortDir === 'asc' ? type.sortAsc : type.sortDesc);
    } else if (type.sortAsc && !type.sortDesc) {
      sortChange(type.sortAsc);
    }
  };

  return (
    <Paper>
      <TableStyle>
        <TableHead>
          <TableRow>
            {tableHeaders.map((t) => (
              <TableCell key={t.value} align="center" onClick={() => handleTHeadClick(t.value)}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ cursor: t.sortAsc && t.sortAsc ? 'pointer' : '' }}
                >
                  {t.label}
                  {Boolean(sortBy) && sortBy === t.sortAsc && (
                    <ArrowDropDownIcon fontSize="small" />
                  )}
                  {Boolean(sortBy) && sortBy === t.sortDesc && <ArrowDropUpIcon fontSize="small" />}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bugs.map((b) => (
            <TableRowStyle key={b.id}>
              <TableCell
                onClick={() => router.push(`/dashboard/projects/${b.projectId}/bugs/${b.id}`)}
                align="center"
              >
                <Box color="secondary">
                  <Typography variant="h6"> {truncateString(b.title, 30)}</Typography>
                </Box>
              </TableCell>
              <TableCell
                onClick={() => router.push(`/dashboard/projects/${b.projectId}/bugs/${b.id}`)}
                align="center"
              >
                <Chip
                  label={b.priority.toUpperCase()}
                  color={getBugPriorityColor(b.priority)}
                  sx={{ fontWeight: 'bold' }}
                />
              </TableCell>
              <TableCell
                onClick={() => router.push(`/dashboard/projects/${b.projectId}/bugs/${b.id}`)}
                align="center"
              >
                <Chip
                  label={b.isResolved ? 'Closed' : 'Open'}
                  color={b.isResolved ? 'secondary' : 'info'}
                />
              </TableCell>
              <TableCell
                onClick={() => router.push(`/dashboard/projects/${b.projectId}/bugs/${b.id}`)}
                align="center"
              >
                {formatDateTime(b.createdAt)} by {b.createdBy.username}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/dashboard/projects/${b.projectId}/bugs/${b.id}`)}
                align="center"
              >
                {!b.updatedAt || !b.updatedBy
                  ? 'No updates'
                  : `${formatDateTime(b.updatedAt)} by ${b.updatedBy.username}`}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/dashboard/projects/${b.projectId}/bugs/${b.id}`)}
                align="center"
              >
                {b.notes.length}
              </TableCell>
              <TableCell align="center">
                <ActionsPopover
                  bugId={b.id}
                  currentData={{ title: b.title, description: b.description, priority: b.priority }}
                  isResolved={b.isResolved}
                  isMobile={false}
                  projectId={b.projectId}
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
          {!isMyBugs && (
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
          )}
        </Box>
      )}
    </Paper>
  );
};

export default BugsTable;
