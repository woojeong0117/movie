<template>
	<div class="container py-4">
		<div class="row gy-5" v-if="movieList">
			<div class="col-12 col-md-6 col-lg-3" v-for="item in movieList" :key="item.id">
				<div class="card-wrap" @click="goDetail(item.id)">
					<div class="card" style="width: 18rem">
						<img v-if="item.poster_path" class="card-img" :src="`https://image.tmdb.org/t/p/w300/${item.poster_path}`" alt="" />
						<img v-else class="no-img" src="../assets/img/notfound.png" alt="" />
						<div class="card-body">
							<p class="card-text text-dark text-center">{{ item.title }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps({
	movieList: Object,
});

const goDetail = id => {
	router.push(`detail/${id}`);
};
</script>

<style lang="scss" scoped>
.card-wrap {
	cursor: pointer;

	.card {
		position: relative;

		&:hover {
			.card-img {
				opacity: 0.5;
			}
		}
	}

	.card-img {
		height: 429px;
	}

	.no-img {
		object-fit: scale-down;
		height: 429px;
	}

	.card-body {
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
