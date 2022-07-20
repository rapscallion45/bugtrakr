import { FC } from 'react';
import { useSelector } from 'react-redux';
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
  SortDirection,
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import FormDialog from '../FormDialog/FormDialog';
import ProjectForm from '../ProjectForm/ProjectForm';
import { formatDateTime, truncateString } from '../../utils';
import { AppState } from '../../redux/reducers';
import { IProjectState } from '../../redux/types/types';

interface ITableHeader {
  label: string;
  value: string;
  sortAsc: string | null;
  sortDesc: string | null;
}

const tableHeaders: ITableHeader[] = [
  { label: 'Name', value: 'name', sortAsc: 'a-z', sortDesc: 'z-a' },
  {
    label: 'Bugs',
    value: 'bugs',
    sortAsc: 'most-bugs',
    sortDesc: 'least-bugs',
  },
  { label: 'Members', value: 'members', sortAsc: 'most-members', sortDesc: 'least-members' },
  { label: 'Admin', value: 'admin', sortAsc: null, sortDesc: null },
  { label: 'Added', value: 'added', sortAsc: 'newest', sortDesc: 'oldest' },
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

interface ProjectsTableProps {
  projects: IProjectState[];
  sortBy: string;
  sortDir: SortDirection;
  sortChange: (value: string) => void;
}

const ProjectsTable: FC<ProjectsTableProps> = function ProjectsTable({
  projects,
  sortBy,
  sortDir,
  sortChange,
}) {
  const { user } = useSelector((state: AppState) => state.authentication);

  const handleTHeadClick = (value: string) => {
    const type = tableHeaders.find((header) => header.value === value);
    if (type.sortAsc && type.sortDesc) {
      sortChange(sortDir === 'asc' ? type.sortAsc : type.sortDesc);
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
        {projects.length !== 0 && (
          <TableBody>
            {projects.map((p) => (
              <TableRowStyle key={p.id}>
                <TableCell
                  onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                  align="center"
                >
                  <Box color="secondary">
                    <Typography variant="h6"> {truncateString(p.name, 30)}</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                  align="center"
                >
                  {p.bugs.length}
                </TableCell>
                <TableCell
                  onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                  align="center"
                >
                  {p.members.length}
                </TableCell>
                <TableCell
                  onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                  align="center"
                >
                  {p.createdBy.username}
                </TableCell>
                <TableCell
                  onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                  align="center"
                >
                  {formatDateTime(p.createdAt)}
                </TableCell>
                <TableCell align="center">
                  <ActionsPopover
                    projectId={p.id}
                    currentName={p.name}
                    currentMembers={p.members.map((m) => m.member.id)}
                    isAdmin={p.createdBy.id === user?.id}
                    isMobile={false}
                  />
                </TableCell>
              </TableRowStyle>
            ))}
          </TableBody>
        )}
      </TableStyle>
      {!projects.length && (
        <Box display="flex" alignItems="center" flexDirection="column" py={5}>
          <Typography pb={1} variant="h6">
            No projects to show.
          </Typography>
          <FormDialog
            triggerBtn={{
              type: 'normal',
              icon: AddIcon,
              text: 'Create New Project',
            }}
            title="Create New Project"
          >
            <ProjectForm editMode={null} />
          </FormDialog>
        </Box>
      )}
    </Paper>
  );
};

export default ProjectsTable;
