/**
 * @description Creates a new timestamp from the current time
 * @returns {String} The current time formatted as HH:MM
 */
const useTimestamp = () => {
	const date = new Date();

	const hours = date.getHours();
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${hours}:${minutes}`;
};

module.exports = {
	useTimestamp,
};
