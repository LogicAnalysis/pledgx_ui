import { useState, useEffect } from 'react';

export function useWindowSize() {
	const isClient = typeof window === 'object';
	const [windowSize, setWindowSize] = useState(getSize);

	function handleResize() {
		setWindowSize(getSize());
	}

	useEffect(() => {
		if (!isClient) {
			return false;
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function getSize() {
		return {
			width: isClient ? window.innerWidth : 0,
			height: isClient ? window.innerHeight : 0
		};
	}

	return windowSize;
}