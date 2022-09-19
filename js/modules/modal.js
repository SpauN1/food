function modal() {
	// Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
			modal = document.querySelector('.modal');


	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
	}

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
		clearInterval(modalTimerId);
	}
	
	modal.addEventListener('click', (event) => {
		if	(event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 25000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
