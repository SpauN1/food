function slider() {
	const slides = document.querySelectorAll('.offer__slide'),
			slider = document.querySelector('.offer__slider'),
			sliderBtnPrev  = document.querySelector('.offer__slider-prev'),
			sliderBtnNext  = document.querySelector('.offer__slider-next'),
			sliderTotalCounter  = document.querySelector('#total'),
			sliderCurrentCounter  = document.querySelector('#current'),
			sliderWrapper = document.querySelector('.offer__slider-wrapper'),
			sliderField = document.querySelector('.offer__slider-inner'),
			sliderWidth = window.getComputedStyle(sliderWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		sliderTotalCounter.textContent = `0${slides.length}`;
		sliderCurrentCounter.textContent = `0${slideIndex}`;
	} else {
		sliderTotalCounter.textContent = slides.length;
		sliderCurrentCounter.textContent = slideIndex;
	}

	sliderField.style.width = 100 * slides.length + '%';
	sliderField.style.display = 'flex';
	sliderField.style.transition = '0.5s all';
	
	sliderWrapper.style.overflow = 'hidden';

	slides.forEach((slide) => {
		slide.style.width = sliderWidth;
	});

	slider.style.position = 'relative';

	const sliderDots = document.createElement('ol');
	const dots = [];

	sliderDots.classList.add('carousel-indicators');
	sliderDots.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(sliderDots);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		sliderDots.append(dot);
		dots.push(dot);
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}
	
	function currentNumberSlide() {
		if (slides.length < 10) {
			sliderCurrentCounter.textContent = `0${slideIndex}`;
		} else {
			sliderCurrentCounter.textContent = slideIndex;
		}
	}

	function dotsOpacity() {
		dots.forEach((dot) => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	}

	sliderBtnNext.addEventListener('click', () => {
		if (offset == deleteNotDigits(sliderWidth) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(sliderWidth);
		}

		sliderField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		currentNumberSlide();

		dotsOpacity();
	});

	sliderBtnPrev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(sliderWidth) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(sliderWidth);
		}

		sliderField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		currentNumberSlide();

		dotsOpacity();
	});

	dots.forEach((dot) => {
		dot.addEventListener('click', (event) => {
			const slideTo = event.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(sliderWidth) * (slideTo - 1);

			sliderField.style.transform = `translateX(-${offset}px)`;

			currentNumberSlide();

			dotsOpacity();
		});
	});
}

export default slider;
