/** Function to set equal height of passed element in the DOM */
export default function EqualHeight(elem) {
	// Get all elements with the class name 'equal-height'
	const elements = document.querySelectorAll(`.${elem}`);

	// Calculate the maximum height among all elements
	let maxHeight = 0;
	elements.forEach((element) => {
		maxHeight = Math.max(maxHeight, element.offsetHeight);
	});

	// Set the same height for all elements
	elements.forEach((element) => {
		element.style.height = `${maxHeight}px`;
	});
}
