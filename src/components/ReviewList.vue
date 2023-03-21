<template>
	<hr />
	<h3 class="h3">리뷰</h3>
	<div class="d-flex justify-content-end">
		<button class="btn btn-outline-primary" @click="">수정</button>
	</div>
	<table class="table">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">First</th>
				<th scope="col">Last</th>
				<th scope="col">Handle</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in posts" :key="i">
				<td>{{ item.id }}</td>
				<td>{{ item.author }}</td>
				<td>{{ item.title }}</td>
				<td>{{ item.createdAt }}</td>
			</tr>
		</tbody>
	</table>

	<div v-for="(item, i) in posts" :key="i" class="py-1 d-flex">
		<input type="text" class="form-control" :value="item.title" />
		<input type="text" class="form-control" :value="item.author" />
		<input type="text" class="form-control" :value="item.createdAt" readonly />
	</div>
</template>

<script setup>
import { getPosts } from '../api/posts';
import { ref } from 'vue';

const posts = ref([]);
const fetchPosts = async () => {
	({ data: posts.value } = await getPosts());
	console.log(posts);
};
fetchPosts();
</script>

<style lang="scss" scoped></style>
