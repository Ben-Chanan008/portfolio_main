const keyframe = [
	{
		// opacity: 0,
		transform: "translateX(-20%)",
	},
	{
		// opacity: 1,
		transform: "translateX(0%)",
	},
];

const keyframes = [];

const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);
const $animate = ({ content, option, duration = 300, iterations = 1 }) => {
	const timing = {
		duration: duration,
		iterations: iterations,
	};
	if (content.constructor.name.includes("HTML")) {
		if (!keyframes.length) {
			try {
				content.animate(keyframe, timing);
			} catch (error) {
				console.error(error);
			}
		} else {
			content.animate(keyframes, timing);
		}
	} else {
		console.error("Not a valid selector");
	}
};
const $fade = ({ content, start, end, duration = 300, iterations = 1 }) => {
	const timing = {
		duration: duration,
		iterations: iterations,
	};
	const fade = [
		{
			opacity: start,
		},
		{
			opacity: end,
		},
	];
	if (content.constructor.name.includes("HTML")) {
		content.animate(fade, timing);
		console.log(fade);
	}
};
/************ !Functions for animations! ********** */

function slideIn (timeout) {
	return {
		keyFrame: [{ top: "100vh", bottom: "-100vh" }, { bottom: 0, top: 0 }],
		timing: {
			duration: timeout,
			iterations: 1
		}
	}
}

function slideDown (timeout) {
	return {
		keyFrame: [{ top: 0, bottom: 0 }, { top: '100vh', bottom: '-100vh' }],
		timing: {
			duration: timeout,
			iterations: 1
		}
	}
}
/************ ?Functions for animations?********** */

/*************** !functions declarations! ***************/
const SI = slideIn(500);
const SD = slideDown(500);
/*************** ?functions declarations? ***************/

/*************** !animations! ***************/
const content = $('.content-wrapper');
console.log(content);
const links = $all('a');
// console.log(links)
links.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		console.log(SI.keyFrame)
		const evt = e.currentTarget;
		const id = $(`${evt.getAttribute('href')}`);
		const cancelBtn = $('.cancel');

		content.style.display = 'block';
		const contentAnim = content.animate(SI.keyFrame, SI.timing);
		// content.classList.add('z-index');
		contentAnim.finished.then(() => setTimeout(() => {
			// id.style.opacity = 1
			id.style.display = 'block';
			$fade({ content: id, start: 0, end: 1, duration: 800, iterations: 1 });
			cancelBtn.style.display = 'block';
			cancelBtn.addEventListener('click', (e) => {
				// id.style.display = 'none';
				const closeContentAnim = content.animate(SD.keyFrame, SD.timing);

				closeContentAnim.finished.then(() => {
					id.style.display = 'none';
					content.style.display = 'none';
					// cancelBtn.style.display = 'none'
				});
			});
		}, 100));
	});
});
$('.contact').addEventListener('click', () => {
	$('.contact').innerHTML = 'bchanan.boss@gmail.com';
});
// const cancelBtn = $('.cancel');

$animate({ content: $("h2"), iterations: 1, option: false });
// $fade({ content: $(".blink"), start: 0, end: 1, duration: 2000, iterations: 2 });
