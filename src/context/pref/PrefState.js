import React, { useReducer } from 'react';
import { useTranslation } from 'react-i18next';

import prefContext from './prefContext';
import prefReducer from './prefReducer';

import {
	DARK_THEME,
	GET_THEME,
	LIGHT_THEME
} from './types'

const PrefState = props => {
	const { i18n } = useTranslation();
	const initialState = {
		callback: {
			theme_set: false
		},
		theme: localStorage.theme || 'LIGHT_THEME'
	}

	const [state, dispatch] = useReducer(prefReducer, initialState);

	async function changeLanguage(language) {
		i18n.changeLanguage(language);
	};

	function getTheme() {
		if (localStorage.theme) {
			if (['DARK_THEME', 'LIGHT_THEME'].includes(localStorage.theme)) {
				dispatch({
					type: GET_THEME,
					payload: { theme: localStorage.theme }
				});
			};
		};
	};

	function switchTheme(options) {
		var theme = null;
		if (options) {
			theme = options.theme;
		}
		if (!theme) {
			if (state.theme === 'LIGHT_THEME') {
				theme = 'DARK_THEME';
			} else if (state.theme === 'DARK_THEME') {
				theme = 'LIGHT_THEME';
			}
		}
		switch(theme) {
			case 'DARK_THEME':
				dispatch({
					type: DARK_THEME
				});
				break;
			case 'LIGHT_THEME':
				dispatch({
					type: LIGHT_THEME
				});
				break;
			default:
				dispatch({
					type: LIGHT_THEME
				});
		};
	};

	return <prefContext.Provider
		value={{
			callback: state.callback,
			theme: state.theme,
			changeLanguage,
			getTheme,
			switchTheme
		}}
	>
		{props.children}
	</prefContext.Provider>
}

export default PrefState;
