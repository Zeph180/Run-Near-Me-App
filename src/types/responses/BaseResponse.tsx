export interface BaseResponse {
  success: boolean;
  message: string;
  data: any;
  error: any;
  statusCode: number;
}
