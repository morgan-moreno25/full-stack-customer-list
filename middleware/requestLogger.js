function useTimestamp() {
	const date = new Date();

	const hours = date.getHours();
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${hours}:${minutes}`;
}

export default function requestLogger(req, res, next) {
	const timestamp = useTimestamp();

	console.log(`*[${timestamp}] - ${req.method} ${req.path}`);
	console.log(`*[${timestamp}] - BODY:`, req.body);
}
