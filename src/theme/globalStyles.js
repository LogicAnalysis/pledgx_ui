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
		--colors-main-text: ${({ theme }) => theme.colorsMainTextColor};

		--colors-light-bg_1:  ${({ theme }) => theme.colorsLightBg_1};

		/* Attention */
		--colors-danger: ${Colors.RED};
		--colors-danger-rgb: ${Colors.RED_RGB};
		--colors-warning: ${Colors.ORANGE};
		--colors-warning-rgb: ${Colors.ORANGE_RGB};
	}
`