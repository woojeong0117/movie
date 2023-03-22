import { posts } from '.';

export function getPosts(params) {
	return posts.get('/', { params });
}

export function getPostById(id) {
	return posts.get(`/${id}`);
}

export function createPost(data) {
	return posts.post('', data);
}

export function deletePosts(id) {
	return posts.delete(`/${id}`);
}

export function updatePost(id, data) {
	return posts.patch(`/${id}`, data);
}
