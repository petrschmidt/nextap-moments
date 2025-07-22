export * from './user.ts';
export * from './moment.ts';

export type ApiResponse<T> = {
  data: T;
  cursor: Cursor;
};

export type Cursor = {
  before?: string;
  after?: string;
};
