export interface BaseResponse {
  success: boolean;
  message: string;
  data: any;
  errors: any;
  errorCode: string;
  statusCode: number;
  timestamp: string;
}
