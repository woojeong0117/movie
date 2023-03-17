<template>
	<div>
		<nav aria-label="Page navigation">
			<ul class="pagination justify-content-center py-5">
				<li class="page-item">
					<a @click="firstPage" class="page-link" href="#" aria-label="Previous" :class="isPrevPage">
						<span aria-hidden="true">«</span>
					</a>
				</li>
				<li class="page-item">
					<a @click="decrementPage" class="page-link" href="#" aria-label="Previous" :class="isPrevPage">
						<span aria-hidden="true">&lt;</span>
					</a>
				</li>

				<li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: current === page }">
					<a class="page-link" href="#" @click.prevent="currentPage(page)">{{ page }}</a>
				</li>

				<li class="page-item">
					<a @click="incrementPage" class="page-link" href="#" aria-label="Next" :class="isNextPage">
						<span aria-hidden="true">&gt;</span>
					</a>
				</li>
				<li class="page-item">
					<a @click="lastPage" class="page-link" href="#" aria-label="Next" :class="isNextPage">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
	current: {
		type: Number,
		required: true,
	},
	setMovie: {
		type: Function,
		required: true,
	},
});

const emits = defineEmits(['update:current']);
const current = ref(props.current);
function decrementPage() {
	props.setMovie(current.value - 1);
	current.value -= 1;
	emits('update:current', current.value);
}

function currentPage(page) {
	props.setMovie(page);
	current.value = page;
	emits('update:current', current.value);
}

function incrementPage() {
	props.setMovie(current.value + 1);
	current.value += 1;
	emits('update:current', current.value);
}

function firstPage() {
	props.setMovie(current.value);
	current.value = 1;
	emits('update:current', current.value);
}

function lastPage() {
	props.setMovie(current.value);
	current.value = totalCount;
	emits('update:current', current.value);
}

const isPrevPage = computed(() => ({ disabled: current.value <= 1 }));
const isNextPage = computed(() => ({ disabled: current.value === totalCount }));

// 페이지네이션 세팅
const totalCount = 48;

const visiblePages = computed(() => {
	const maxVisiblePages = 3;
	const currentPageValue = current.value;
	const lastPage = totalCount;
	const startPage = Math.max(1, Math.ceil(currentPageValue / maxVisiblePages) * maxVisiblePages - maxVisiblePages + 1);
	const endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);
	const visiblePagesArray = [];
	for (let i = startPage; i <= endPage; i++) {
		visiblePagesArray.push(i);
	}
	return visiblePagesArray;
});
</script>
<style>
.search-input {
	color: black;
}
</style>
