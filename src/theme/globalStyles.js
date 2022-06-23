import { createGlobalStyle } from 'styled-components';
import * as Colors from './Colors'

export const GlobalStyles = createGlobalStyle`
	body {
		background: ${({ theme }) => theme.body};
		color: ${({ theme }) => theme.text};
	}

	/* ---------------- GLOBAL VARIABLES -------------------- */

	:root {
		/* Colors - Colors */
		--colors-light-bg_1:  ${({ theme }) => theme.colorsLightBg_1};
		--colors-main-background: ${({ theme }) => theme.colorsMainBgColor};
		--colors-main-highlight: ${Colors.GREEN_PASTEL};
		--colors-main-highlight-bg: ${Colors.GREEN_SUBDUED};
		--colors-main-text: ${({ theme }) => theme.colorsMainTextColor};
		--colors-primary-bg: ${({ theme }) => theme.colorsPrimaryColorBg};

		/* Attention */
		--colors-danger: ${Colors.RED};
		--colors-danger-rgb: ${Colors.RED_RGB};
		--colors-warning: ${Colors.ORANGE};
		--colors-warning-rgb: ${Colors.ORANGE_RGB};

		--shadow-large-light: 0 1rem 6rem rgba(0, 0, 0, .5);
		--shadow-large-dark: 0 1rem 6rem rgba(255, 255, 255, .5);
	}
`