import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import MovieDetail from '@/views/MovieDetail.vue';
import SearchPage from '@/views/SearchPage.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/detail/:id',
		name: 'Detail',
		component: MovieDetail,
	},
	{
		path: '/search',
		name: 'Search',
		component: SearchPage,
	},
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});
export default router;
