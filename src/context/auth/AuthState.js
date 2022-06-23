import React, { useContext, useReducer } from 'react';
import axios from 'axios';

import authContext from './authContext';
import authReducer from './authReducer';
import envContext from '../env/envContext';

import {
	GET_USER_FAIL,
	GET_USER_SUCCESS,
	GET_USER_LIST_FAIL,
	GET_USER_LIST_SUCCESS,
	UPDATE_USER_FAIL,
	UPDATE_USER_SUCCESS
} from './types';

import {
	CLEAR_CALLBACK,
	CLEAR_ERRORS,
	SET_LOADING
} from '../commonTypes';

const AuthState = props => {
	const EnvContext = useContext(envContext);
	const API_PATH = EnvContext.variables.API_PATH;
	const API_VERSION = EnvContext.variables.API_VERSION;
	
	const initialState = {
		callback: {
			current_user: false,
			user_list: false
		},
		current_user: null,
		user_list: []
	}

	const [state, dispatch] = useReducer(authReducer, initialState);

	const clearCallback = (callback) => dispatch({ type: CLEAR_CALLBACK, payload: callback });
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
	const setLoading = () => dispatch({ type: SET_LOADING });

	async function getUser(user_id) {
		setLoading();
		try {
			const res = await axios.post(API_PATH + API_VERSION + '/get_user', { user_id: user_id });
			localStorage.setItem('current_user_id', JSON.stringify(user_id));
			dispatch({
				type: GET_USER_SUCCESS,
				payload: res.data.user
			});
		} catch (err) {
			dispatch({
				type: GET_USER_FAIL,
				payload: err.response.data.error
			});
		};
	};

	async function getUserList() {
		setLoading();
		try {
			const res = await axios.get(API_PATH + API_VERSION + '/get_user_list');
			dispatch({
				type: GET_USER_LIST_SUCCESS,
				payload: res.data.users
			});
		} catch (err) {
			dispatch({
				type: GET_USER_LIST_FAIL,
				payload: err.response.data.error
			});
		};
	};
	
	/*
	async function updateUser(formData) {
		setLoading();
		try {
			// eslint-disable-next-line
			const res = await axios.patch(API_PATH + API_VERSION + '/account/manage/', formData);
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		} catch (err) {
			extracted_error = extractErrorFromApiResponse({ error: err });
			dispatch({
				type: UPDATE_USER_FAIL,
				payload: extracted_error
			});
		};
	};
	*/

	return <authContext.Provider
		value={{
			callback: state.callback,
			current_user: state.current_user,
			user_list: state.user_list,
			clearCallback,
			clearErrors,
			getUser,
			getUserList
		}}
	>
		{ props.children }
	</authContext.Provider>
}

export default AuthState;