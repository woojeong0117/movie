<template>
	<header class="justify-content-between">
		<RouterLink to="/" class="logo">MOVIE LIST</RouterLink>
		<RouterLink to="/search" class="search">검색</RouterLink>
		<!-- <RouterLink to="/about" class="m-4">About</RouterLink> -->
	</header>
</template>

<style scoped>
.logo {
	text-decoration: none;
	color: darkslateblue;
	font-weight: 900;
	font-size: 40px;
}

.search {
	text-decoration: none;
	color: darkslateblue;
	font-size: 20px;
	font-weight: 900;
}
</style>
