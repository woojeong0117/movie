<template>
	<div>
		<LoadingPage v-if="loading"></LoadingPage>
		<ErrorPage v-else-if="error" :message="error.message" />
		<form @submit.prevent="onSearch" class="py-5">
			<input class="form-control" v-model="keyword" placeholder="영화 제목을 입력하세요." />
		</form>
		<MovieList :movieList="search"></MovieList>
		<LoadingPage v-if="loading"></LoadingPage>
		<ErrorPage v-else-if="error" :message="error.message" />
		<Pagination v-if="search.length" :current="current" :setMovie="searchMovie" @update:current="onPageChanged" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import MovieList from '../components/MovieList.vue';
import LoadingPage from '../components/LoadingPage.vue';
import ErrorPage from '../components/ErrorPage.vue';
import { movieApi } from '../api';
import Pagination from '../components/AppPagination.vue';

defineProps({
	movieList: Object,
});

const search = ref({});
const keyword = ref('');
const current = ref(1);
const loading = ref(false);
const error = ref(null);

const onSearch = async () => {
	try {
		loading.value = true;

		if (!keyword.value) {
			alert('영화 제목을 입력하세요!');
			keyword.value = '';
			return;
		}

		const { data } = await movieApi.search(keyword.value);
		search.value = data.results;
		console.log(data);
	} catch (err) {
		console.error(err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};

const searchMovie = async () => {
	try {
		loading.value = true;
		const res = await movieApi.search(keyword.value, current.value);
		search.value = res.data.results;
	} catch (err) {
		console.error(err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};

const onPageChanged = pageNum => {
	current.value = pageNum;
	searchMovie();
};

searchMovie();
</script>

<style>
.search-input {
	color: black;
}
</style>
