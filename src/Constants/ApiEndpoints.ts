export const ApiEndpoints = {
  baseUrl: "http://10.0.2.2/Runnearme/api",
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  posts: {
    getPosts: "/Post/get-posts-by-runner-id?",
  },
  notifications: {
    getNotifications: "/notifications",
  },
  profile: {
    getProfile: "/profile",
  },
};
