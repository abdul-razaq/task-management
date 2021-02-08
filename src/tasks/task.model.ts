export interface Task {
  readonly id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdOn: string;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
