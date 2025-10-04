export const ApiEndpoints = {
  baseUrl: "http://10.0.2.2/Runnearme/api",
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  posts: {
    getPostsByUserId: "/Post/get-posts-by-runner-id",
    react: "/Post/react",
    createPost: "/Post/create-post",
  },
  notifications: {
    getNotifications: "/notifications",
  },
  profile: {
    getProfile: "/profile",
  },
};
