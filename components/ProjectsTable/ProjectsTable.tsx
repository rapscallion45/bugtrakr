import { FC } from 'react';
import router from 'next/router';
import { Table, TableHead, TableBody, TableRow, TableCell, Box, Paper } from '@mui/material';
import Link from '../Link/Link';
// import { useSelector } from 'react-redux';
// import { ProjectState } from '../../redux/types';
// import { selectAuthState } from '../../redux/slices/authSlice';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import { formatDateTime, truncateString } from '../../utils';

const tableHeaders = ['Name', 'Bugs', 'Members', 'Admin', 'Added', 'Actions'];

interface ProjectsTableProps {
  projects: any[];
}

const ProjectsTable: FC<ProjectsTableProps> = function ProjectsTable({ projects }) {
  //   const { user } = useSelector(selectAuthState);

  return (
    <Paper>
      <Table>
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
            <TableRow key={p.id}>
              <TableCell onClick={() => router.push(`/projects/${p.id}`)} align="center">
                <Box component={Link} href={`/projects/${p.id}`} color="secondary">
                  {truncateString(p.name, 30)}
                </Box>
              </TableCell>
              <TableCell align="center">{p.bugs.length}</TableCell>
              <TableCell align="center">{p.members.length}</TableCell>
              <TableCell align="center">{p.createdBy.username}</TableCell>
              <TableCell align="center">{formatDateTime(p.createdAt)}</TableCell>
              <TableCell align="center">
                <ActionsPopover
                  projectId={p.id}
                  currentName={p.name}
                  currentMembers={p.members.map((m) => m.id)}
                  // isAdmin={p.createdBy.id === user?.id}
                  isAdmin
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProjectsTable;
