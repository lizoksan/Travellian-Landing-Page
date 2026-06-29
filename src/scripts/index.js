import '../styles/main.scss';
import Swiper from 'swiper';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

window.addEventListener('load', () => {
	const baseSwiperConfig = {
		modules: [Navigation],
		direction: 'horizontal',
		loop: true,
		grabCursor: true,
		initialSlide: 1,
		freeMode: true,
		scrollbar: false,
		spaceBetween: 16,
		slidesPerView: 1,
		watchSlidesProgress: true,

		breakpoints: {
			1440: {
				slidesPerView: 2.66,
				spaceBetween: 32,
			},
		},
	};

	const swiperDest = new Swiper('.destinations__swiper', {
		...baseSwiperConfig,
		navigation: {
			nextEl: '.destinations__next',
			prevEl: '.destinations__prev',
		},
	});

	const swiperOffers = new Swiper('.offers__swiper', {
		...baseSwiperConfig,

		breakpoints: {
			1440: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
		},
		navigation: {
			nextEl: '.offers__next',
			prevEl: '.offers__prev',
		},
	});

	const swiperReviews = new Swiper('.reviews__swiper', {
		...baseSwiperConfig,
		navigation: {
			nextEl: '.reviews__next',
			prevEl: '.reviews__prev',
		},
	});

	const swiperPlanners = new Swiper('.planners__swiper', {
		...baseSwiperConfig,
		enabled: false,

		breakpoints: {
			1440: {
				enabled: true,
				slidesPerView: 2.7,
				spaceBetween: 32,
			},
		},
	});

	const swiperGallery = new Swiper('.gallery__swiper', {
		modules: [Navigation, Grid],
		slidesPerView: 1,
		grid: {
			rows: 4,
		},
		spaceBetween: 32,

		navigation: {
			nextEl: '.gallery__next',
			prevEl: '.gallery__prev',
		},

		breakpoints: {
			1440: {
				slidesPerView: 4,
				spaceBetween: 32,
				grid: {
					rows: 1,
				},
			},
		},
	});
});
