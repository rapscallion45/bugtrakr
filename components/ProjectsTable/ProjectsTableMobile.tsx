import { FC } from 'react';
// import { useSelector } from 'react-redux';
// import { selectAuthState } from '../../redux/slices/authSlice';
import { Box, Divider, Typography } from '@mui/material';
// import { useMainPageStyles } from '../../styles/muiStyles';
import BugReportTwoToneIcon from '@mui/icons-material/BugReportTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
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
              <Box component={Link} href={`/projects/${p.id}`} sx={{ flexGrow: 1 }}>
                <Typography variant="h4" color="primary">
                  {truncateString(p.name, 30)}
                </Typography>
              </Box>
              <ActionsPopover
                projectId={p.id}
                currentName={p.name}
                currentMembers={p.members.map((m) => m.id)}
                // isAdmin={p.createdBy.id === user?.id}
                isAdmin
                iconSize="default"
              />
            </Box>
            <Typography variant="body2" color="primary">
              Admin: <strong>{p.createdBy.username}</strong>
            </Typography>
            <Typography variant="body2" color="primary">
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
                  <BugReportTwoToneIcon color="primary" />
                  <Typography variant="subtitle1" color="primary">
                    : {p.bugs.length}
                  </Typography>
                </Box>
                <Box display="inline-flex" sx={{ verticalAlign: 'middle' }}>
                  <PeopleAltTwoToneIcon color="primary" />{' '}
                  <Typography variant="subtitle1" color="primary">
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
