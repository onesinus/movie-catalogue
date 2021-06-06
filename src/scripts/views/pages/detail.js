import UrlParser from '../../routes/url-parser';
import TheMovieDbSource from '../../data/themoviedb-source';
import { createMovieDetailTemplate, createLikeButtonTemplate } from '../templates/template-creator';
import LikeButtonInisiator from '../../utils/like-button-inisiator';

const Detail = {
	async render() {
		return `
			<div id="movie" class="movie"></div>
			<div id="likeButtonContainer"></div>
		`;
	},

	async afterRender() {
		const url = UrlParser.parseActiveUrlWithoutCombiner();
		const movie = await TheMovieDbSource.detailMovie(url.id);
		const moviesContainer = document.querySelector("#movie")
		moviesContainer.innerHTML = createMovieDetailTemplate(movie);

		const likeButtonContainer = document.querySelector("#likeButtonContainer");
		LikeButtonInisiator.init({
			likeButtonContainer,
			movie: {
		        id: movie.id,
		        title: movie.title,
		        overview: movie.overview,
		        backdrop_path: movie.backdrop_path,
		        vote_average: movie.vote_average,
			}
		})
	}
};

export default Detail;