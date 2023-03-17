import axios from 'axios';
// export function getMovie() {
// 	return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6f26edc26d6ed9d164d9bc332258be3f&language=ko-KR');
// }

const request = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: '6f26edc26d6ed9d164d9bc332258be3f',
		language: 'ko-KR',
	},
});

export const movieApi = {
	popular: (page=1) => 
	request.get('movie/popular',{
		params: {
			page,
		},
	}),
	
	movieDetail: id =>
		request.get(`movie/${id}`),

	search: (keyword, page=1) =>
    request.get("search/movie", {
      params: {
        query: keyword,
		page
      },
    }),
};
