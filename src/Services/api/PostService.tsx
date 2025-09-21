import { ApiBaseService } from "@/Services/api/base";
import { RequestGetPosts } from "@/types/Requests/Post/PostRequests";
import { ApiEndpoints } from "@/Constants/ApiEndpoints";
import { ResponseGetPosts } from "@/types/responses/Post/PostResponses";

class PostService extends ApiBaseService {
  async getPosts(request: RequestGetPosts) {
    console.log("PostService.getPosts called");

    const url = `${ApiEndpoints.posts.getPostsByUserId}?RunnerId=${request.runnerId}&PageNumber=${request.pageNumber}&PageSize=${request.pageSize}`;

    return this.makeRequest<ResponseGetPosts>(url, {
      method: "GET",
    });
  }
}

export const postService = new PostService();
