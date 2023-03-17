<template>
	<div class="d-flex loading justify-content-center align-items-center">
		<div class="spinner-grow text-danger" role="status"></div>
		<p class="text-light text-center">Loading...</p>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background: rgba($color: #000000, $alpha: 0.7);
	flex-wrap: wrap;

	p {
		margin: 0;
		padding-left: 10px;
	}
}
</style>
