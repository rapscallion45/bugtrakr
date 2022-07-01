import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { projectActions } from '../../redux/actions';
import { formatDateInWords } from '../../utils';
import { IProjectMember } from '../../redux/types/types';
import { AppState } from '../../redux/reducers';

const tableHeaders = ['ID', 'Username', 'Role', 'Added'];

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

interface MembersTableProps {
  members: IProjectMember[];
  adminId: string;
  projectId: string;
}

const MembersTable: FC<MembersTableProps> = function MembersTable({ members, adminId, projectId }) {
  const dispatch = useDispatch();
  const { removing } = useSelector((state: AppState) => state.projects);
  const { user } = useSelector((state: AppState) => state.authentication);
  const isAdmin = adminId === user?.id;

  const handleRemoveUser = (memberId: string, closeDialog: () => void) => {
    dispatch(projectActions.removeProjectMember(projectId, memberId, closeDialog));
  };

  return (
    <Paper>
      <TableStyle>
        <TableHead>
          <TableRow>
            {tableHeaders.map((m) => (
              <TableCell key={m} align="center">
                {m}
              </TableCell>
            ))}
            {isAdmin && <TableCell align="center">Remove</TableCell>}
          </TableRow>
        </TableHead>
        {members && members.length !== 0 && (
          <TableBody>
            {members.map((m) => (
              <TableRowStyle key={m.id}>
                <TableCell align="center">{m.id}</TableCell>
                <TableCell align="center">
                  {m.member.username} {m.member.id === user?.id && '(You)'}
                </TableCell>
                <TableCell align="center">{m.member.id === adminId ? 'Admin' : 'Member'}</TableCell>
                <TableCell align="center">{formatDateInWords(m.joinedAt)}</TableCell>
                {isAdmin && (
                  <TableCell align="center">
                    {m.member.id === user?.id ? (
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
                  </TableCell>
                )}
              </TableRowStyle>
            ))}
          </TableBody>
        )}
      </TableStyle>
    </Paper>
  );
};

export default MembersTable;
