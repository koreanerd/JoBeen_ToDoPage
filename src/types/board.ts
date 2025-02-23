import { Task } from './task';

export interface Board {
  id: number;
  status?: string;
  title: string;
  tasks?: Task[];
}
