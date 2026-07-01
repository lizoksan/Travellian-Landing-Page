import '../styles/main.scss';
import Swiper from 'swiper';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

window.addEventListener('load', () => {
	const header = document.querySelector('.header');
	const burger = document.querySelector('.header__burger');
	const mobileMenu = document.querySelector('.header__mobile_menu');
	const nav = document.querySelector('.nav');
	const navLinks = document.querySelectorAll('.nav__link');
	const underline = document.querySelector('.nav__underline');
	const activeLink = document.querySelector('.nav__link.active');

	const checkinInput = document.getElementById('checkin');
	const checkoutInput = document.getElementById('checkout');
	const nextWeekDate = new Date();
	nextWeekDate.setDate(nextWeekDate.getDate() + 7);

	function throttle(func, delay) {
		let isThrottled = false;

		return function (...args) {
			if (isThrottled) return;

			func.apply(this, args);
			isThrottled = true;

			setTimeout(() => {
				isThrottled = false;
			}, delay);
		};
	}

	const checkScrollStatus = () => {
		if (window.scrollY > 100) {
			header.classList.add('active');
		} else {
			header.classList.remove('active');
		}
	};

	const optimizedScroll = throttle(checkScrollStatus, 100);

	window.addEventListener('scroll', optimizedScroll, { passive: true });

	const openMenu = () => {
		mobileMenu.classList.toggle('open');
		header.classList.toggle('menu_open');

		if (mobileMenu.classList.contains('open')) {
			document.body.style.overflow = 'hidden';
			header.classList.add('active');
		} else {
			document.body.style.overflow = '';
			checkScrollStatus();
		}
	};

	burger.addEventListener('click', openMenu);

	const menuLinks = document.querySelectorAll('.nav__link');

	const closeAllMenuStates = () => {
		mobileMenu.classList.remove('open');
		header.classList.remove('menu_open');
		document.body.style.overflow = '';
		checkScrollStatus();
	};

	menuLinks.forEach((link) => link.addEventListener('click', closeAllMenuStates));

	const closeMenuOnResize = () => {
		if (window.innerWidth >= 768) {
			if (mobileMenu.classList.contains('open')) {
				closeAllMenuStates();
			}
		}
	};

	const optimizedResize = throttle(closeMenuOnResize, 150);
	window.addEventListener('resize', optimizedResize);

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
		grabCursor: true,
		initialSlide: 0,
		freeMode: true,
		scrollbar: false,

		watchSlidesProgress: true,

		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 16,
				loop: true,
			},

			1440: {
				slidesPerView: 2.66,
				spaceBetween: 32,
				loop: false,
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
			...baseSwiperConfig.breakpoints,
			1440: {
				slidesPerView: 3,
				spaceBetween: 32,
				loop: true,
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
			320: {
				...baseSwiperConfig.breakpoints[320],
				freeMode: false,
			},

			1440: {
				slidesPerView: 2.372,
				spaceBetween: 32,
				loop: false,
				freeMode: true,
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
