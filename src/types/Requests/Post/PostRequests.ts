export interface BasePostRequest {
  postId: string;
  runnerId: string;
}

export interface RequestReact extends BasePostRequest {
  isLike: true;
}

export type RequestGetPosts = {
  runnerId: string;
  isAdmin?: boolean;
  pageSize?: number;
  pageNumber?: number;
};
