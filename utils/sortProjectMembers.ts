import { IProjectMember, ProjectMemberSortValues } from '../redux/types/types';

const sortProjectMembers = (users: IProjectMember[], sortBy: ProjectMemberSortValues) => {
  switch (sortBy) {
    case 'oldest':
      return users.slice().sort((a, b) => +new Date(a.joinedAt) - +new Date(b.joinedAt));

    case 'a-z':
      return users
        .slice()
        .sort((a, b) =>
          a.member.username.localeCompare(b.member.username, 'en', { sensitivity: 'base' })
        );

    case 'z-a':
      return users
        .slice()
        .sort((a, b) =>
          b.member.username.localeCompare(a.member.username, 'en', { sensitivity: 'base' })
        );

    case 'newest':
    default:
      return users.slice().sort((a, b) => +new Date(b.joinedAt) - +new Date(a.joinedAt));
  }
};

export default sortProjectMembers;
