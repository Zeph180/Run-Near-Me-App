import { ApiBaseService } from "@/Services/api/base";
import {
  CreatePostRequest,
  RequestGetPosts,
  RequestReact,
} from "@/types/Requests/Post/PostRequests";
import { ApiEndpoints } from "@/Constants/ApiEndpoints";
import {
  Post,
  ResponseGetPosts,
  ResponseReact,
} from "@/types/responses/Post/PostResponses";

class PostService extends ApiBaseService {
  async getPosts(request: RequestGetPosts) {
    const url = `${ApiEndpoints.posts.getPostsByUserId}?RunnerId=${request.runnerId}&PageNumber=${request.pageNumber}&PageSize=${request.pageSize}`;

    return this.makeRequest<ResponseGetPosts>(url, {
      method: "GET",
    });
  }

  async react(request: RequestReact) {
    console.log("PostService.react called");
    return this.makeRequest<ResponseReact>(ApiEndpoints.posts.react, {
      method: "POST",
      data: JSON.stringify(request),
    });
  }

  async createPost(request: CreatePostRequest): Promise<Post> {
    const formData = new FormData();
    console.log("PostService.CreatePostRequest called");

    formData.append("caption", request.caption);
    formData.append("Location", request.location);
    formData.append("Longitude", request.longitude);
    formData.append("Latitude", request.latitude);
    formData.append("RunnerId", request.runnerId);

    if (request.postFile) {
      formData.append("file", {
        uri: request.postFile.uri,
        name: request.postFile.name,
        type: request.postFile.type,
      } as any);
    }

    return this.makeRequest<Post>(ApiEndpoints.posts.createPost, {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export const postService = new PostService();
