import { ApiBaseService } from "@/Services/api/base";
import {
  RequestGetPosts,
  RequestReact,
} from "@/types/Requests/Post/PostRequests";
import { ApiEndpoints } from "@/Constants/ApiEndpoints";
import {
  ResponseGetPosts,
  ResponseReact,
} from "@/types/responses/Post/PostResponses";

class PostService extends ApiBaseService {
  async getPosts(request: RequestGetPosts) {
    console.log("PostService.getPosts called");

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
}

export const postService = new PostService();
