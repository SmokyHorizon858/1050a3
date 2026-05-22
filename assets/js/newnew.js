(function () {
	/* smooth scrolling */
	var navJoin = document.querySelector('#nav a[href="#contact"]');
	var contact = document.getElementById('contact');
	if (navJoin && contact) {
		navJoin.addEventListener('click', function (event) {
			event.preventDefault();
			contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}

	/* talk to us section*/
	var form = document.getElementById('contact-form');
	if (!form) {
		return;
	}

	var topicSelect = document.getElementById('topic');
	var topicHint = document.getElementById('topic-hint');
	var helpBox = document.getElementById('help');
	var errorBox = document.getElementById('form-error');
	var successBox = document.getElementById('form-success');

	//each topic: hint + placeholder
	var topics = {
		join: {
			hint: 'Tell us you are new or returning, and which training nights you can attend.',
			placeholder: 'e.g. I am a first-year student and want to join weekly training...'
		},
		schools: {
			hint: 'Include your school name, year levels, and preferred dates for a visit or workshop.',
			placeholder: 'e.g. We would like a debating workshop for Year 10 students on...'
		},
		sponsorship: {
			hint: 'Briefly describe your organisation and what kind of partnership you have in mind.',
			placeholder: 'e.g. Our company would like to sponsor a public debate...'
		},
		resources: {
			hint: 'Say which materials you need (videos, manuals, BP intro) and how you plan to use them.',
			placeholder: 'e.g. I would like permission to use NAD training slides for...'
		},
		other: {
			hint: 'Please be as specific as you can so we can forward your message to the right person.',
			placeholder: 'Type your question here...'
		}
	};

	// change topic → update hint and placeholder
	topicSelect.addEventListener('change', function () {
		var key = topicSelect.value;
		var info = topics[key];

		errorBox.hidden = true;
		errorBox.textContent = '';

		if (!info) {
			topicHint.textContent = 'Choose a topic above so we can guide your message.';
			helpBox.placeholder = '';
			return;
		}

		topicHint.textContent = info.hint;
		helpBox.placeholder = info.placeholder;
	});

	// submit form → validate input and show result
	form.addEventListener('submit', function (event) {
		event.preventDefault();

		errorBox.hidden = true;
		errorBox.textContent = '';

		var first = document.getElementById('firstname');
		var last = document.getElementById('lastname');
		var email = document.getElementById('email');
		var topic = topicSelect.value;
		var message = helpBox.value.trim();

		//validation (in order, show only first or combine multiple)
		var errors = [];

		if (!topic) {
			errors.push('Please choose a topic.');
		}
		if (!first.value.trim()) {
			errors.push('First name is required.');
		}
		if (!last.value.trim()) {
			errors.push('Last name is required.');
		}
		if (!email.value.trim()) {
			errors.push('Email is required.');
		} else if (!email.checkValidity()) {
			errors.push('Please enter a valid email address.');
		}
		if (!message) {
			errors.push('Please enter your message.');
		}

		if (errors.length > 0) {
			errorBox.textContent = errors.join(' ');
			errorBox.hidden = false;
			errorBox.focus();
			return;
		}

		//success: hide form, show thank you
		form.hidden = true;
		successBox.hidden = false;
		successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	});
})();