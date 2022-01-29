import {Brand} from 'src/core/utils';

export type Timestamp = Brand<'timestamp', string>; // an ISO string
export const timestamp = (date: Date): Timestamp => date.toISOString() as Timestamp;
