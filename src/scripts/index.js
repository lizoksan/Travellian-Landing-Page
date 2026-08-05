import '../styles/main.scss';
import Swiper from 'swiper';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


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

document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.header');
	const burger = document.querySelector('.header__burger');
	const mobileMenu = document.querySelector('.header__mobile_menu');
	const nav = document.querySelector('.nav');
	const navLinks = document.querySelectorAll('.nav__link');
	const underline = document.querySelector('.nav__underline');

	const checkScrollStatus = () => {
		if (!header) return;
		header.classList.toggle('active', window.scrollY > 100);
	};

	window.addEventListener('scroll', throttle(checkScrollStatus, 100), { passive: true });

	const closeAllMenuStates = () => {
		if (!mobileMenu) return;
		mobileMenu.classList.remove('open');
		header?.classList.remove('menu_open');
		burger?.classList.remove('active');
		document.body.style.overflow = '';
		checkScrollStatus();
	};

	if (burger && mobileMenu) {
		burger.addEventListener('click', () => {
			const isOpen = mobileMenu.classList.toggle('open');
			header?.classList.toggle('menu_open', isOpen);
			burger.classList.toggle('active', isOpen);

			document.body.style.overflow = isOpen ? 'hidden' : '';
			if (isOpen) {
				header?.classList.add('active');
			} else {
				checkScrollStatus();
			}
		});
	}

	navLinks.forEach((link) => link.addEventListener('click', closeAllMenuStates));

	window.addEventListener(
		'resize',
		throttle(() => {
			if (window.innerWidth >= 768 && mobileMenu?.classList.contains('open')) {
				closeAllMenuStates();
			}
			const activeLink = document.querySelector('.nav__link.active');
			if (activeLink) moveUnderline(activeLink);
		}, 150)
	);


	function moveUnderline(element) {
		if (!element || !nav || !underline) return;

	
		underline.style.width = `${element.offsetWidth}px`;
		underline.style.left = `${element.offsetLeft}px`;
	}

	function activateLink(link) {
		if (!link || link.classList.contains('active')) return;
		navLinks.forEach((item) => item.classList.remove('active'));
		link.classList.add('active');
		moveUnderline(link);
	}

	
	const initialActiveLink = document.querySelector('.nav__link.active') || document.querySelector('.nav__link[href="#home"]');
	if (initialActiveLink) activateLink(initialActiveLink);

	
	const observerOptions = {
		root: null,
		rootMargin: '-30% 0px -40% 0px',
		threshold: 0,
	};

	const observerCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const id = entry.target.getAttribute('id');
				const matchingLink = document.querySelector(`.nav__link[href="#${id}"]`);
				if (matchingLink) activateLink(matchingLink);
			}
		});
	};

	const observer = new IntersectionObserver(observerCallback, observerOptions);

	navLinks.forEach((link) => {
		const hash = link.getAttribute('href');
	
		if (hash && hash.startsWith('#') && hash.length > 1) {
			try {
				const targetSection = document.querySelector(hash);
				if (targetSection) observer.observe(targetSection);
			} catch (e) {
				console.warn(`Invalid selector: ${hash}`);
			}
		}
	});

	
	const checkinInput = document.getElementById('checkin');
	const checkoutInput = document.getElementById('checkout');

	if (checkinInput && checkoutInput) {
		const nextWeekDate = new Date();
		nextWeekDate.setDate(nextWeekDate.getDate() + 7);

		const commonFlatpickrConfig = {
			minDate: 'today',
			disableMobile: true,
			altInput: true,
			altFormat: 'D, j M Y',
			dateFormat: 'Y-m-d',
		};

		const fpCheckout = flatpickr(checkoutInput, {
			...commonFlatpickrConfig,
			defaultDate: nextWeekDate,
		});

		flatpickr(checkinInput, {
			...commonFlatpickrConfig,
			defaultDate: 'today',
			onChange: (selectedDates) => {
				if (selectedDates[0]) {
				
					const minCheckoutDate = new Date(selectedDates[0]);
					minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
					fpCheckout.set('minDate', minCheckoutDate);

					
					if (fpCheckout.selectedDates[0] <= selectedDates[0]) {
						fpCheckout.setDate(minCheckoutDate);
					}
				}
			},
		});
	}

	
	const createSwiper = (selector, config) => {
		return document.querySelector(selector) ? new Swiper(selector, config) : null;
	};

	const baseSwiperConfig = {
		modules: [Navigation],
		direction: 'horizontal',
		grabCursor: true,
		initialSlide: 0,
		watchSlidesProgress: true,
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 16,
				loop: true,
			},
			1024: {
				slidesPerView: 2.66,
				spaceBetween: 32,
				loop: false,
			},
		},
	};

	createSwiper('.destinations__swiper', {
		...baseSwiperConfig,
		navigation: {
			nextEl: '.destinations__next',
			prevEl: '.destinations__prev',
		},
	});

	createSwiper('.offers__swiper', {
		...baseSwiperConfig,
		breakpoints: {
			...baseSwiperConfig.breakpoints,
			1024: {
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

	createSwiper('.reviews__swiper', {
		...baseSwiperConfig,
		navigation: {
			nextEl: '.reviews__next',
			prevEl: '.reviews__prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 16,
				loop: true,
			},
			1024: {
				slidesPerView: 2.372,
				spaceBetween: 32,
				loop: false,
				freeMode: true,
			},
		},
	});

	createSwiper('.planners__swiper', {
		...baseSwiperConfig,
		breakpoints: {
			1024: {
				slidesPerView: 2.82,
				spaceBetween: 32,
				loop: true,
			},
		},
	});

	createSwiper('.gallery__swiper', {
		modules: [Navigation, Grid],
		slidesPerView: 1,
		grid: { rows: 4 },
		spaceBetween: 32,
		navigation: {
			nextEl: '.gallery__next',
			prevEl: '.gallery__prev',
		},
		breakpoints: {
			1024: {
				direction: 'horizontal',
				loop: true,
				slidesPerView: 4,
				spaceBetween: 32,
				grid: { rows: 1 },
			},
		},
	});
});
