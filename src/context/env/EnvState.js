import React, { useState, useEffect } from 'react';
import envContext from './envContext';
import development from '../../env.development.json';
import production from '../../env.production.json';

const EnvState = props => {
	const initialState = {
		app_mode: 'DEVELOPMENT', // 'PRODUCTION'
		variables: development // CRITICAL DEPLOYMENT: REMEMBER TO SWITCH TO PRODUCTION BEFORE DEPLOYMENT!
	};
	const [state, setState] = useState(initialState);

	useEffect(() => {
		setState({
			...initialState,
			variables: development
		});
		// CRITICAL DEPLOYMENT: REMEMBER TO SWITCH TO PRODUCTION BEFORE DEPLOYMENT!
	}, []);

	return <envContext.Provider
		value={{
			app_mode: state.app_mode,
			variables: state.variables
		}}
	>
		{props.children}
	</envContext.Provider>
}

export default EnvState;
