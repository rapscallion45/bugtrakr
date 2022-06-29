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
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import { formatDateTime, truncateString } from '../../utils';

const tableHeaders = ['Name', 'Bugs', 'Members', 'Admin', 'Added', 'Actions'];

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
  projects: any[];
}

const ProjectsTable: FC<ProjectsTableProps> = function ProjectsTable({ projects }) {
  const { user } = useSelector((state) => state.authentication);

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
                    currentMembers={p.members.map((m) => m.id)}
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
          <Button variant="contained" startIcon={<AddIcon />}>
            Create New Project
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default ProjectsTable;
