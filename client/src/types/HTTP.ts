export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

export enum Status {
  pending,
  rejected,
  fulfiled
}
