import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { Box, Divider, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HideOnScroll from '../HideOnScroll/HideOnScroll';
import FormDialog from '../FormDialog/FormDialog';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import ProjectForm from '../ProjectForm/ProjectForm';
import { projectActions } from '../../redux/actions';
import { formatDateInWords } from '../../utils';
import { IProjectMember } from '../../redux/types/types';
import { AppState } from '../../redux/reducers';

interface MembersTableMobileProps {
  members: IProjectMember[];
  adminId: string;
  projectId: string;
  projectName: string;
}

const MembersTableMobile: FC<MembersTableMobileProps> = function MembersTableMobile({
  members,
  adminId,
  projectId,
  projectName,
}) {
  const dispatch = useDispatch();
  const { removing } = useSelector((state: AppState) => state.projects);
  const { data: session } = useSession();
  const { user } = session;
  const isAdmin = adminId === user?.uid;

  const handleRemoveUser = (memberId: string, closeDialog: () => void) => {
    dispatch(projectActions.removeProjectMember(projectId, memberId, closeDialog));
  };

  return (
    <Box pb={14}>
      <Divider />
      {members.length !== 0 &&
        members.map((m, i) => (
          <div key={m.id} style={{ paddingBottom: i + 1 === members.length ? '2em' : 0 }}>
            <Box sx={{ padding: '0.4em 0.3em' }}>
              <Box display="flex" alignItems="center">
                <Box sx={{ flexGrow: 1, textDecoration: 'none' }}>
                  <Typography variant="h4" color="text.primary">
                    {m.member.username} {m.member.id === user?.uid && '(You)'}
                  </Typography>
                </Box>
                {isAdmin && (
                  <Box>
                    {m.member.id === user?.uid ? (
                      <BlockIcon color="secondary" fontSize="large" />
                    ) : (
                      <ConfirmDialog
                        title="Confirm Remove User"
                        contentText={`Are you sure you want to remove ${m.member.username} from the project?`}
                        actionBtnText="Remove User"
                        triggerBtn={{
                          type: 'icon',
                          iconSize: 'large',
                          icon: HighlightOffIcon,
                          size: 'small',
                        }}
                        processing={removing}
                        actionFunc={(closeDialog) => handleRemoveUser(m.member.id, closeDialog)}
                      />
                    )}
                  </Box>
                )}
              </Box>
              <Typography variant="body2" color="text.primary">
                Role: <strong>{m.member.id === adminId ? 'Admin' : 'Member'}</strong>
              </Typography>
              <Typography variant="body2" color="text.primary">
                Joined: <strong>{formatDateInWords(m.joinedAt)}</strong>
              </Typography>
            </Box>
            <Divider />
          </div>
        ))}
      {isAdmin && (
        <HideOnScroll>
          <Box position="fixed" sx={{ bottom: '100px', right: '25px', maxWidth: '170px' }}>
            <FormDialog
              triggerBtn={{
                type: 'fab',
                icon: PersonAddIcon,
              }}
              title="Add User"
            >
              <ProjectForm
                editMode="members"
                projectId={projectId}
                currentMembers={members.map((m) => m.member.id)}
                currentName={projectName}
              />
            </FormDialog>
          </Box>
        </HideOnScroll>
      )}
    </Box>
  );
};
export default MembersTableMobile;
