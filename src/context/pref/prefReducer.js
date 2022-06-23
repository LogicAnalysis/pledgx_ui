import {
	DARK_THEME,
	GET_THEME,
	LIGHT_THEME
} from './types'

export default (state, action) => {
	switch(action.type) {
		case GET_THEME:
			return {
				...state,
				callback: {
					...state.callback,
					theme_set: true
				},
				theme: action.payload.theme
			}
		case DARK_THEME:
			localStorage.setItem('theme', 'DARK_THEME')
			return {
				...state,
				callback: {
					...state.callback,
					theme_set: true
				},
				theme: 'DARK_THEME'
			}
		case LIGHT_THEME:
			localStorage.setItem('theme', 'LIGHT_THEME')
			return {
				...state,
				callback: {
					...state.callback,
					theme_set: true
				},
				theme: 'LIGHT_THEME'
		}
		default:
			return state;
	}
}