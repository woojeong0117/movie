<template>
	<div class="not">
		<div class="text-center text-danger py-5">
			<h1>페이지를 표시할 수 없습니다.🤷‍♀️</h1>
			<h2>404 NOT FOUND</h2>
			<div class="py-5">
				<RouterLink to="/">
					<button class="btn btn-primary">HOME으로 이동</button>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.not {
	> div {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
