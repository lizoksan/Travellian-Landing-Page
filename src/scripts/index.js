import '../styles/main.scss';
import Swiper from 'swiper';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

window.addEventListener('load', () => {
	const nav = document.querySelector('.nav');
	const navLinks = document.querySelectorAll('.nav__link');
	const underline = document.querySelector('.nav__underline');
	const activeLink = document.querySelector('.nav__link.active');

	const checkinInput = document.getElementById('checkin');
	const checkoutInput = document.getElementById('checkout');
	const nextWeekDate = new Date();
	nextWeekDate.setDate(nextWeekDate.getDate() + 7);

	function moveUnderline(element) {
		if (!element) return;

		const navRect = nav.getBoundingClientRect();
		const elRect = element.getBoundingClientRect();

		underline.style.width = `${elRect.width}px`;
		underline.style.left = `${elRect.left - navRect.left}px`;
	}

	function activateLink(link) {
		if (!link) return;
		navLinks.forEach((item) => item.classList.remove('active'));
		link.classList.add('active');
		moveUnderline(link);
	}

	if (activeLink) {
		moveUnderline(activeLink);
	}

	navLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			activateLink(this);
		});
	});

	const observerOptions = {
		root: null,
		rootMargin: '-40% 0px -40% 0px',
		threshold: 0,
	};

	const observerCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const id = entry.target.getAttribute('id');
				const matchingLink = document.querySelector(`.nav__link[href="#${id}"]`);
				activateLink(matchingLink);
			}
		});
	};

	const observer = new IntersectionObserver(observerCallback, observerOptions);

	navLinks.forEach((link) => {
		const hash = link.getAttribute('href');
		if (hash.startsWith('#')) {
			const targetSection = document.querySelector(hash);
			if (targetSection) {
				observer.observe(targetSection);
			}
		}
	});

	window.addEventListener('resize', () => {
		const currentActive = document.querySelector('.nav__link.active');
		if (currentActive) {
			moveUnderline(currentActive);
		}
	});

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

	if (window.scrollY < 100) {
		const homeLink = document.querySelector('.nav__link[href="#home"]');
		if (homeLink && !homeLink.classList.contains('active')) {
			document.querySelectorAll('.nav__link').forEach((item) => item.classList.remove('active'));
			homeLink.classList.add('active');
			moveUnderline(homeLink);
		}
	}

	const baseSwiperConfig = {
		modules: [Navigation],
		direction: 'horizontal',
		loop: false,
		grabCursor: true,
		initialSlide: 1,
		freeMode: true,
		scrollbar: false,
		spaceBetween: 16,
		slidesPerView: 1,
		watchSlidesProgress: true,

		breakpoints: {
			320: {
				// slidesPerView: 1,
				loop: true,
			},
		},

		breakpoints: {
			1440: {
				slidesPerView: 2.66,
				spaceBetween: 32,
				loop: false,
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

				slidesPerView: 4,
				spaceBetween: 32,
				grid: {
					rows: 1,
				},
			},
		},
	});
});
