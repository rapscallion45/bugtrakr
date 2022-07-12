import { INote } from '../redux/types/types';

export type NoteSortValues = 'newest' | 'oldest' | 'updated';

const sortNotes = (notes: INote[], sortBy: NoteSortValues) => {
  switch (sortBy) {
    case 'newest':
      return notes.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    case 'oldest':
      return notes.slice().sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

    case 'updated':
      return notes.slice().sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

    default:
      return notes;
  }
};

export default sortNotes;
