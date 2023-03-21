<template>
	<hr />
	<div class="d-flex justify-content-between">
		<h3 class="h3">리뷰</h3>
	</div>
	<hr />
	<form @submit.prevent="save">
		<div class="mb-3">
			<label for="title" class="form-label">작성자</label>
			<input v-model="form.author" type="text" class="form-control" id="author" />
		</div>
		<div class="mb-3">
			<label for="contents" class="form-label">내용</label>
			<textarea v-model="form.content" class="form-control" id="content" rows="3"></textarea>
		</div>
		<div class="d-flex justify-content-end">
			<button class="btn btn-outline-primary create">등록</button>
		</div>
	</form>
	<table class="table">
		<thead>
			<tr>
				<th scope="col">순서</th>
				<th scope="col">작성자</th>
				<th scope="col">내용</th>
				<th scope="col">날짜</th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in posts" :key="i">
				<td>{{ posts.length - i }}</td>
				<td>{{ item.author }}</td>
				<td>{{ item.content }}</td>
				<td>{{ dayjs(item.createdAt).format('YYYY-MM-DD') }}</td>
				<td><button class="btn btn-outline-danger" @click.prevent="deleteReview(i, item.id)">삭제</button></td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { getPosts } from '../api/posts';
import { createPost, deletePosts } from '../api/posts';
import { ref } from 'vue';
import dayjs from 'dayjs';

const posts = ref({});
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
});
const fetchPosts = async () => {
	({ data: posts.value } = await getPosts(params.value));
};
fetchPosts();

const form = ref({
	author: null,
	content: null,
});

const error = ref(null);

const save = () => {
	if (!form.value.author || !form.value.content) {
		alert('작성자및 내용을 입력하세요🙏');

		return;
	}
	try {
		createPost({
			...form.value,
			createdAt: Date.now(),
		});
		fetchPosts();
		alert('리뷰가 등록되었습니다👌');
		form.value.author = null;
		form.value.content = null;
	} catch (err) {
		error.value = err;
	}
};

// deletePost 함수 추가
const deleteReview = (index, reviewId) => {
	console.log('deleteReview');
	try {
		deletePosts(reviewId);
		console.log(posts.value);
		console.log(index);
		posts.value.splice(index, 1);
	} catch (err) {
		error.value = err;
		console.log(err);
	}
};
</script>

<style lang="scss" scoped>
.table {
	margin-bottom: 100px;
}
</style>
