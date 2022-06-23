import {
	GET_USER_FAIL,
	GET_USER_SUCCESS,
	GET_USER_LIST_FAIL,
	GET_USER_LIST_SUCCESS,
	UPDATE_USER_FAIL,
	UPDATE_USER_SUCCESS
} from './types'
import {
	CLEAR_CALLBACK,
	CLEAR_ERRORS,
	SET_LOADING
} from '../commonTypes'

export default (state, action) => {
	switch(action.type) {
		case CLEAR_CALLBACK:
			return {
				...state,
				callback: {
					...state.callback,
					[action.payload]: false
				}
			};
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				error: null
			};
		case GET_USER_FAIL:
			return {
				...state,
				callback: {
					...state.callback,
					current_user: true
				},
				loading: false,
				error: action.payload
			};
		case GET_USER_SUCCESS:
			return {
				...state,
				callback: {
					...state.callback,
					current_user: true
				},
				loading: false,
				error: null,
				current_user: action.payload
			};
		case GET_USER_LIST_FAIL:
			return {
				...state,
				callback: {
					...state.callback,
					user_list: true
				},
				loading: false,
				error: action.payload
			};
		case GET_USER_LIST_SUCCESS:
			return {
				...state,
				callback: {
					...state.callback,
					user_list: true
				},
				loading: false,
				error: null,
				user_list: action.payload
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}