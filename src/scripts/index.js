import '../styles/main.scss';
import Swiper from 'swiper';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

window.addEventListener('load', () => {
	const checkinInput = document.getElementById('checkin');
	const checkoutInput = document.getElementById('checkout');

	const nextWeekDate = new Date();
	nextWeekDate.setDate(nextWeekDate.getDate() + 7);

	const commonFlatpickrConfig = {
		minDate: 'today',
		disableMobile: true,
		altInput: true,
		altFormat: 'D, j M Y',
		dateFormat: 'Y-m-d',
	};

	if (checkinInput) {
		flatpickr(checkinInput, {
			...commonFlatpickrConfig,
			defaultDate: 'today',
		});
	}

	if (checkoutInput) {
		flatpickr(checkoutInput, {
			...commonFlatpickrConfig,
			defaultDate: nextWeekDate,
		});
	}

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
		initialSlide: 0,
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

		breakpoints: {
			1440: {
				slidesPerView: 2.372,
				spaceBetween: 32,
			},
		},
	});

	const swiperPlanners = new Swiper('.planners__swiper', {
		...baseSwiperConfig,
		enabled: false,

		breakpoints: {
			1440: {
				enabled: true,
				slidesPerView: 2.82,
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
				direction: 'horizontal',
				loop: true,
				slidesPerView: 4,
				spaceBetween: 32,
				grid: {
					rows: 1,
				},
			},
		},
	});
});
