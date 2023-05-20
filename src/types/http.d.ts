export interface ResultData<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
