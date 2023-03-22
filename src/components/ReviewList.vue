<template>
	<div class="d-flex justify-content-between">
		<h3 class="h3">리뷰 작성하기</h3>
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
	<div class="pt-5">
		<div class="d-flex justify-content-between">
			<h3 class="h3">리뷰 리스트</h3>
		</div>
		<hr />
		<table class="table">
			<thead>
				<tr>
					<th scope="col" style="width: 5%">순서</th>
					<th scope="col" style="width: 10%">작성자</th>
					<th scope="col" style="width: 35%">내용</th>
					<th scope="col" style="width: 11%">날짜</th>
					<th scope="col" style="width: 10%"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, i) in posts" :key="i">
					<template v-if="isEditing && editIndex === i">
						<td>{{ posts.length - i }}</td>
						<!-- <td><input type="text" class="form-control" /></td> -->
						<td><input type="text" class="form-control" v-model="edit.author" /></td>
						<td><input type="text" class="form-control" v-model="edit.content" /></td>
						<!-- <td><input type="text" class="form-control" /></td> -->
						<td>{{ dayjs(item.createdAt).format('YYYY-MM-DD') }}</td>
						<td>
							<button class="btn btn-outline-primary edit" @click.prevent="saveEdit(i)">저장</button>
							<button class="btn btn-outline-secondary cancel" @click.prevent="cancelEdit">취소</button>
						</td>
					</template>
					<template v-else>
						<td>{{ posts.length - i }}</td>
						<td>{{ item.author }}</td>
						<td>{{ item.content }}</td>
						<td>{{ dayjs(item.createdAt).format('YYYY-MM-DD') }}</td>
						<td>
							<button class="btn btn-outline-primary edit" @click.prevent="editReview(i, item)">수정</button>
							<button class="btn btn-outline-danger" @click.prevent="deleteReview(i, item.id)">삭제</button>
						</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { getPosts } from '../api/posts';
import { createPost, deletePosts, updatePost } from '../api/posts';
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const posts = ref({});
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	movie_id: id,
});
const fetchPosts = async () => {
	({ data: posts.value } = await getPosts(params.value));
};
fetchPosts();

const form = ref({
	author: null,
	content: null,
	movie_id: id,
});

const edit = ref({
	author: null,
	content: null,
	movie_id: id,
});

const error = ref(null);

const isEditing = ref(false);
const editIndex = ref(-1);

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
	if (confirm('삭제하시겠습니까?🤬🤬') === false) {
		return;
	}
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

// editReview 함수 추가
const editReview = (index, post) => {
	edit.value.author = post.author;
	edit.value.content = post.content;
	isEditing.value = true;
	editIndex.value = index;
};

// cancelEdit 함수 추가
const cancelEdit = () => {
	form.value.author = null;
	form.value.content = null;
	isEditing.value = false;
	editIndex.value = -1;
};

// saveEdit 함수 추가
const saveEdit = async index => {
	if (!edit.value.author || !edit.value.content) {
		alert('작성자및 내용을 입력하세요🙏');
		return;
	}
	try {
		await updatePost(posts.value[index].id, {
			author: edit.value.author,
			content: edit.value.content,
		});
		await fetchPosts();
		edit.value.author = null;
		edit.value.content = null;
		isEditing.value = false;
		editIndex.value = -1;
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

td {
	vertical-align: middle;
}

.edit {
	margin: 0 18px;
}
</style>
