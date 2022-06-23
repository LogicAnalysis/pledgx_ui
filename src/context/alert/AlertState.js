import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'

import alertContext from './alertContext';
import alertReducer from './alertReducer';
import {
	SET_ALERT,
	REMOVE_ALERT,
} from './types'

const AlertState = props => {
	const initialState = [];
	const [state, dispatch] = useReducer(alertReducer, initialState)

	// Set alert
	function setAlert({ title, msg, type='warning', window=true, closeable=true, timeout=10000, id=uuidv4() }) {
		dispatch({
			type: SET_ALERT,
			payload: { title, msg, type, window, closeable, id }
		});

		setTimeout(() => dispatch({
			type: REMOVE_ALERT,
			payload: id
		}), timeout || 5000);
	};

	function removeAlertById(id) {
		dispatch({
			type: REMOVE_ALERT,
			payload: id
		});
	};

	return <alertContext.Provider
		value={{
			alerts: state,
			setAlert,
			removeAlertById
		}}
	>
		{props.children}
	</alertContext.Provider>
}

export default AlertState;
