import { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import HideOnScroll from '../HideOnScroll/HideOnScroll';
import MHidden from '../@MUI-Extended/MHidden';
import FormDialog from '../FormDialog/FormDialog';
import NoteItem from './NoteItem/NoteItem';
import NoteForm from '../NoteForm/NoteForm';
import { INote } from '../../redux/types/types';

interface NotesTableProps {
  notes: INote[];
  projectId: string | string[];
  bugId: string | string[];
  isAdmin: boolean;
  isMobile: boolean;
}

const NotesTable: FC<NotesTableProps> = function NotesTable({
  notes,
  projectId,
  bugId,
  isAdmin,
  isMobile,
}) {
  return (
    <Paper>
      {!notes.length && (
        <Box display="flex" alignItems="center" flexDirection="column" py={5}>
          <Typography pb={1} variant="h6">
            No notes to show.
          </Typography>
          <FormDialog
            triggerBtn={{
              type: 'normal',
              icon: NoteAddIcon,
              text: 'Add Note',
            }}
            title="Create New Note"
          >
            <NoteForm isEditMode={false} projectId={projectId} bugId={bugId} />
          </FormDialog>
        </Box>
      )}
      {notes.map((n) => (
        <div key={n.id}>
          <Box pb={2}>
            <NoteItem
              note={n}
              bugId={bugId}
              projectId={projectId}
              isMobile={isMobile}
              isAdmin={isAdmin}
            />
          </Box>
        </div>
      ))}
      <MHidden width="smUp">
        <HideOnScroll>
          <Box position="fixed" sx={{ bottom: '100px', right: '25px', maxWidth: '170px' }}>
            <FormDialog
              triggerBtn={{
                type: 'fab',
                icon: NoteAddIcon,
              }}
              title="Add Note"
            >
              <NoteForm isEditMode={false} projectId={projectId} bugId={bugId} />
            </FormDialog>
          </Box>
        </HideOnScroll>
      </MHidden>
    </Paper>
  );
};
export default NotesTable;
