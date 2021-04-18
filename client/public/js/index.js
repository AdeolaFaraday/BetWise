const btn = document.getElementById('toggle-btn');
const modal = document.getElementById('modal-btn');

const toggleNav = () => {
	document.getElementsByClassName('mobile-nav-div')[0].classList.toggle('mobile-nav-div-toggle');
	if (btn.textContent.toLocaleLowerCase() === 'close') {
		btn.textContent = 'Open';
	} else {
		btn.textContent = 'Close';
	}
};

const toggleModal = () => {
	document.getElementsByClassName('modal-bg')[0].classList.toggle('modal-toggle');
};

modal.addEventListener('click', toggleModal);

btn.addEventListener('click', toggleNav);

