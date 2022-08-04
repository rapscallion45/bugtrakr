import { IBugState, BugFilterValues } from '../redux/types/types';

const filterBugs = (filterBy: BugFilterValues, bug: IBugState) => {
  switch (filterBy) {
    case 'closed':
      return bug.isResolved === true;
    case 'open':
      return bug.isResolved === false;
    case 'all':
    default:
      return true;
  }
};

export default filterBugs;
