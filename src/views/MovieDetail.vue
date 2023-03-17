<template>
	<LoadingPage v-if="loading" />
	<ErrorPage v-else-if="error" :message="error.message" />
	<div v-else class="detail-wrap my-4">
		<div class="bg">
			<img style="height: 80vh" :src="`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`" />
		</div>
		<img class="poster" :src="`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`" />
		<div class="txt-wrap">
			<p class="title">{{ movieDetail.title }}</p>
			<ul class="d-flex genres">
				<li v-for="genre in movieDetail.genres" :key="genre.id">
					{{ genre.name }}
					<span> / </span>
				</li>
			</ul>
			<p class="runtime">{{ movieDetail.runtime }} 분</p>
			<p class="desc">{{ movieDetail.overview }}</p>
		</div>
	</div>
</template>

<script setup>
import LoadingPage from '../components/LoadingPage.vue';
import ErrorPage from '../components/ErrorPage.vue';
import { movieApi } from '../api';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const id = route.params.id;
const movieDetail = ref({});
const loading = ref(false);
const error = ref(null);
async function fetchData() {
	try {
		loading.value = true;
		const res = await movieApi.movieDetail(id);
		movieDetail.value = res.data;
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
}
fetchData();
</script>

<style lang="scss" scoped>
.detail-wrap {
	position: relative;
}

.bg {
	position: relative;

	&:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
	}

	img {
		width: 100%;
		height: 100%;
	}
}

.poster {
	position: absolute;
	left: 50px;
	top: 50%;
	transform: translateY(-50%);
	width: 300px;
	height: 500px;
}

.txt-wrap {
	position: absolute;
	left: 40%;
	top: 20%;
	width: 50%;
	color: #fff;

	.title {
		font-size: 50px;
		font-weight: 900;
	}

	.genres {
		list-style: none;
		padding: 0;

		li {
			span {
				display: inline-block;
				padding: 0 4px;
			}

			&:last-child {
				span {
					display: none;
				}
			}
		}
	}
}
</style>
