<template>
	<div>
		<nav aria-label="Page navigation">
			<ul class="pagination justify-content-center py-5">
				<li class="page-item">
					<a @click="decrementPage" class="page-link" href="#" aria-label="Previous" :class="isPrevPage">
						<span aria-hidden="true">«</span>
					</a>
				</li>
				<li class="page-item">
					<a class="page-link active" href="#">{{ current }}</a>
				</li>
				<li class="page-item">
					<a @click="incrementPage" class="page-link" href="#" aria-label="Next">
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

function incrementPage() {
	props.setMovie(current.value + 1);
	current.value += 1;
	emits('update:current', current.value);
}
const isPrevPage = computed(() => ({ disabled: current.value <= 1 }));
</script>

<style>
.search-input {
	color: black;
}
</style>
