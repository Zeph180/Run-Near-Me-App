export interface BasePostRequest {
  postId?: string;
  runnerId: string;
}

export interface RequestReact extends BasePostRequest {
  isLike: true;
}

export type RNFile = {
  uri?: string;
  name?: string;
  type?: string;
};

export interface CreatePostRequest extends BasePostRequest {
  caption: string;
  location: string;
  latitude: string;
  longitude: string;
  postFile: RNFile | null;
}

export type RequestGetPosts = {
  runnerId: string;
  isAdmin?: boolean;
  pageSize?: number;
  pageNumber?: number;
};
