import { format } from 'date-fns';

const formatDateInWords = (date: Date) => format(new Date(date), "MMM d', ' YYY");
export default formatDateInWords;
