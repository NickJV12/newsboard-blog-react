import api from "./api";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getCommentsByPost = async (id) => {
  const response = await api.get(`/posts/${id}/comments`);
  return response.data;
};