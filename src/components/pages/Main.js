import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import authContext from '../../context/auth/authContext';

import classes from './style/Main.module.css';

import Form from '../shared/form/Form';

function Main() {
	localStorage.setItem('lastPage', '/main')
	const { t } = useTranslation(['home', 'brand', 'prompts', 'specifics']);
	const AuthContext = useContext(authContext);

	useEffect(() => {
		// Check localstorage for user_id. Load user if one exists, and no user is loaded
	}, []);

	function handleInteraction({ action, payload }) {
		switch(action) {
			case 'CHANGE_LANGUAGE':
				break;
			case 'SAVE_USER':
				break;
		};
	};
	
	return (
		<div className={ classes.container }>
			<div className={ classes['form-container'] }>
				<Form id='main_form' />
			</div>
		</div>
	)
}

export default Main
