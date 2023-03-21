import axios from 'axios';

export function getPosts() {
	return axios.get('http://localhost:5000/posts');
}

export function getPostById(id) {
	return axios.get(`http://localhost:5000/posts/${id}`);
}

export function createPost(id, data) {
	return axios.get(`http://localhost:5000/posts/${id}`, data);
}

export function deletePosts(id) {
	return axios.delete(`http://localhost:5000/posts/${id}`);
}
