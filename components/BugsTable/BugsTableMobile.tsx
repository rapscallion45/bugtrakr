import { FC } from 'react';
import { Box, Divider, Typography, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import HideOnScroll from '../HideOnScroll/HideOnScroll';
import FormDialog from '../FormDialog/FormDialog';
import Link from '../Link/Link';
import { formatDateTime, getBugPriorityColor, truncateString } from '../../utils';

interface BugsTableMobileProps {
  bugs: any[];
}

const BugsTableMobile: FC<BugsTableMobileProps> = function BugsTableMobile({ bugs }) {
  return (
    <Box pb={14}>
      <Divider />
      {bugs.length !== 0 &&
        bugs.map((b, i) => (
          <div key={b.id} style={{ paddingBottom: i + 1 === bugs.length ? '2em' : 0 }}>
            <Box sx={{ padding: '0.4em 0.3em' }}>
              <Box display="flex" alignItems="center">
                <Box
                  component={Link}
                  href={`/dashboard/bugs/${b.id}`}
                  sx={{ flexGrow: 1, textDecoration: 'none' }}
                >
                  <Typography variant="h4" color="text.primary">
                    {truncateString(b.title, 30)}
                  </Typography>
                </Box>
                <ActionsPopover
                  bugId={b.id}
                  currentData={{ title: b.title, description: b.description, priority: b.priority }}
                  isResolved={b.isResolved}
                  isMobile
                />
              </Box>
              <Box display="flex" my={1}>
                <Box display="flex" mr={2}>
                  <Typography variant="body2" color="text.primary" mr={1}>
                    Priority:{' '}
                  </Typography>
                  <Chip
                    label={b.priority.toUpperCase()}
                    color={getBugPriorityColor(b.priority)}
                    sx={{ fontWeight: 'bold' }}
                    size="small"
                  />
                </Box>
                <Box display="flex" mr={2}>
                  <Typography variant="body2" color="text.primary" mr={1}>
                    Status:{' '}
                  </Typography>
                  <Chip
                    label={b.isResolved ? 'Closed' : 'Open'}
                    color={b.isResolved ? 'secondary' : 'info'}
                    size="small"
                  />
                </Box>
              </Box>
              <Typography variant="body2" color="text.primary">
                Created:{' '}
                <strong>
                  {formatDateTime(b.createdAt)} ~ {b.createdBy.username}
                </strong>
              </Typography>
              <Typography variant="body2" color="text.primary">
                Updated:{' '}
                <strong>
                  {b.updatedAt !== null
                    ? `${formatDateTime(b.updatedAt)} ~ ${b.updatedBy.username}`
                    : `n/a`}
                </strong>
              </Typography>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%', marginTop: '0.3em' }}
              >
                <Box display="flex" justifyContent="space-between" sx={{ width: '100px' }}>
                  <Box display="inline-flex" sx={{ verticalAlign: 'middle' }}>
                    <StickyNote2Icon />
                    <Typography variant="subtitle1" color="text.primary">
                      : {b.notes.length || 0}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
          </div>
        ))}
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
            {/* <ProjectForm editMode={null} /> */}
          </FormDialog>
        </Box>
      )}
      <HideOnScroll>
        <Box position="fixed" sx={{ bottom: '100px', right: '25px', maxWidth: '170px' }}>
          <FormDialog
            triggerBtn={{
              type: 'fab',
              icon: AddIcon,
            }}
            title="Create New Bug"
          >
            {/* <ProjectForm editMode={null} /> */}
          </FormDialog>
        </Box>
      </HideOnScroll>
    </Box>
  );
};
export default BugsTableMobile;
