import { FC } from 'react';
// import { useSelector } from 'react-redux';
// import { selectAuthState } from '../../redux/slices/authSlice';
import { Box, Divider, Typography } from '@mui/material';
// import { useMainPageStyles } from '../../styles/muiStyles';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { formatDateTime, truncateString } from '../../utils';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import Link from '../Link/Link';

interface BugsTableMobileProps {
  bugs: any[];
}

const BugsTableMobile: FC<BugsTableMobileProps> = function BugsTableMobile({ bugs }) {
  //   const { user } = useSelector(selectAuthState);
  return (
    <div>
      <Divider />
      {bugs.map((b, i) => (
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
    </div>
  );
};
export default BugsTableMobile;
