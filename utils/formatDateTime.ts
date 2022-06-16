import { format } from 'date-fns';

const formatDateTime = (date: Date) => format(new Date(date), "dd/MM/yy',' h':'mm a");
export default formatDateTime;
