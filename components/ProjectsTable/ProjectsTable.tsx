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

const tableHeaders = ['Name', 'Bugs', 'Members', 'Admin', 'Added', 'Actions'];

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

interface ProjectsTableProps {
  projects: any[];
}

const ProjectsTable: FC<ProjectsTableProps> = function ProjectsTable({ projects }) {
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
          {projects.map((p) => (
            <TableRowStyle key={p.id}>
              <TableCell onClick={() => router.push(`/dashboard/projects/${p.id}`)} align="center">
                <Box color="secondary">
                  <Typography variant="h6"> {truncateString(p.name, 30)}</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/projects/${p.id}`)} align="center">
                {p.bugs.length}
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/projects/${p.id}`)} align="center">
                {p.members.length}
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/projects/${p.id}`)} align="center">
                {p.createdBy.username}
              </TableCell>
              <TableCell onClick={() => router.push(`/dashboard/projects/${p.id}`)} align="center">
                {formatDateTime(p.createdAt)}
              </TableCell>
              <TableCell align="center">
                <ActionsPopover
                  projectId={p.id}
                  currentName={p.name}
                  currentMembers={p.members.map((m) => m.id)}
                  // isAdmin={p.createdBy.id === user?.id}
                  isAdmin
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

export default ProjectsTable;
