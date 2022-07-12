import { formatDistanceToNowStrict } from 'date-fns';

const formatTimeAgo = (date: Date) => formatDistanceToNowStrict(new Date(date));
export default formatTimeAgo;
