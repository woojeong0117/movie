<template>
	<div>
		<MovieList :movieList="popular"></MovieList>
		<LoadingPage v-if="loading"></LoadingPage>
		<ErrorPage v-else-if="error" :message="error.message" />
		<Pagination :current="current" :setMovie="setMovie" :totalCount="totalCount" />
	</div>
</template>

<script setup>
import MovieList from '../components/MovieList.vue';
import Pagination from '../components/AppPagination.vue';
import { movieApi } from '../api';
import { ref } from 'vue';
import LoadingPage from '../components/LoadingPage.vue';
import ErrorPage from '../components/ErrorPage.vue';

const popular = ref([]);
const current = ref(1);
const loading = ref(false);
const error = ref(null);
const totalCount = ref();
const setMovie = async page => {
	try {
		loading.value = true;
		const { data } = await movieApi.popular(page);
		popular.value = data.results;
		current.value = page;
		totalCount.value = data.total_pages;
	} catch (err) {
		console.error(err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};
setMovie(current.value);
</script>
