import { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ActionsPopover from './ActionsPopover/ActionsPopover';
import { formatTimeAgo } from '../../../utils';
import { INote } from '../../../redux/types/types';

interface NoteItemProps extends IconButtonProps {
  note: INote;
  bugId: string | string[];
  projectId: string | string[];
  isAdmin: boolean;
  isMobile: boolean;
}

const NoteItem: FC<NoteItemProps> = function NoteItem({
  note,
  bugId,
  projectId,
  isAdmin,
  isMobile,
}) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {note.author.username.slice(0, 1)}
          </Avatar>
        }
        action={
          <ActionsPopover
            note={note}
            bugId={bugId}
            projectId={projectId}
            isAdmin={isAdmin}
            isMobile={isMobile}
          />
        }
        title={<Typography>{note.author.username}</Typography>}
        subheader={
          <>
            <Typography variant="caption">{formatTimeAgo(note?.createdAt)} ago</Typography>
            {note?.updatedAt !== note?.createdAt && (
              <Typography color="secondary" variant="caption">
                {' '}
                • updated <em>{formatTimeAgo(note?.updatedAt)} ago</em>
              </Typography>
            )}
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {note?.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="inherit" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NoteItem;
