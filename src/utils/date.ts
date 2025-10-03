import { format, fromUnixTime } from 'date-fns';

export const formatTime = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), 'h:mm a');
};

export const formatDate = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), 'EEEE, MMMM d');
};

export const formatShortDate = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), 'EEE, MMM d');
};

export const formatHour = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), 'ha');
};
