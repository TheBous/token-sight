import { useEffect, useState } from "react";

const useWindowSizes = () => {
	const [windowSizes, setWindowSizes] = useState({ width: 0, height: 0 });

	useEffect(() => {
		// Set initial value
		const width = window.innerWidth;
		const height = window.innerHeight;
		setWindowSizes({ width, height });

		// Listen resizes
		window.addEventListener("resize", () => {
			const _width = window.innerWidth;
			const _height = window.innerHeight;
			setWindowSizes({ width: _width, height: _height });
		});
		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);

	return windowSizes;
};

export { useWindowSizes };
export default useWindowSizes;
