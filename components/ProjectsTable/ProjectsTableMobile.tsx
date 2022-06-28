import { FC } from 'react';
// import { useSelector } from 'react-redux';
// import { selectAuthState } from '../../redux/slices/authSlice';
import { Box, Divider, Typography } from '@mui/material';
// import { useMainPageStyles } from '../../styles/muiStyles';
import BugReportIcon from '@mui/icons-material/BugReport';
import GroupIcon from '@mui/icons-material/Group';
import { formatDateTime, truncateString } from '../../utils';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import Link from '../Link/Link';

interface ProjectsTableMobileProps {
  projects: any[];
}

const ProjectsTableMobile: FC<ProjectsTableMobileProps> = function ProjectsTableMobile({
  projects,
}) {
  //   const { user } = useSelector(selectAuthState);
  return (
    <div>
      <Divider />
      {projects.map((p, i) => (
        <div key={p.id} style={{ paddingBottom: i + 1 === projects.length ? '2em' : 0 }}>
          <Box sx={{ padding: '0.4em 0.3em' }}>
            <Box display="flex" alignItems="center">
              <Box
                component={Link}
                href={`/dashboard/projects/${p.id}`}
                sx={{ flexGrow: 1, textDecoration: 'none' }}
              >
                <Typography variant="h4" color="text.primary">
                  {truncateString(p.name, 30)}
                </Typography>
              </Box>
              <ActionsPopover
                projectId={p.id}
                currentName={p.name}
                currentMembers={p.members.map((m) => m.id)}
                // isAdmin={p.createdBy.id === user?.id}
                isAdmin
                isMobile
                iconSize="default"
              />
            </Box>
            <Typography variant="body2" color="text.primary">
              Admin: <strong>{p.createdBy.username}</strong>
            </Typography>
            <Typography variant="body2" color="text.primary">
              Created: <strong>{formatDateTime(p.createdAt)}</strong>
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%', marginTop: '0.3em' }}
            >
              <Box display="flex" justifyContent="space-between" sx={{ width: '100px' }}>
                <Box display="inline-flex" sx={{ verticalAlign: 'middle' }}>
                  <BugReportIcon color="text.primary" />
                  <Typography variant="subtitle1" color="text.primary">
                    : {p.bugs.length}
                  </Typography>
                </Box>
                <Box display="inline-flex" sx={{ verticalAlign: 'middle' }}>
                  <GroupIcon color="text.primary" />{' '}
                  <Typography variant="subtitle1" color="text.primary">
                    : {p.members.length}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
        </div>
      ))}
    </div>
  );
};
export default ProjectsTableMobile;
