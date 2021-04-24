const btn = document.getElementById('toggle-btn');

const toggleNav = () => {
	document.getElementsByClassName('mobile-nav-div')[0].classList.toggle('mobile-nav-div-toggle');
	if (btn.textContent.toLocaleLowerCase() === 'close') {
		btn.textContent = 'Open';
	} else {
		btn.textContent = 'Close';
	}
};

btn.addEventListener('click', toggleNav);

