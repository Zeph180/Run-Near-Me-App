import { BaseResponse } from "@/types/responses/BaseResponse";

export interface ResponseReact extends BaseResponse {
  data: { reacted: boolean };
}

export interface Post extends BaseResponse {
  caption: string;
  comments: any[];
  createdAt: string;
  imageUrl: string | null;
  likesCount: number;
  location: string | null;
  postId: string;
  poster: any | null;
  videoUrl: string | null;
}

export type ResponseGetPosts = {
  data: Post[];
  errors: any;
  message: string;
  statusCode: number;
  success: boolean;
};
