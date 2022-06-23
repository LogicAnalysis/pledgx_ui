import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import authContext from '../../context/auth/authContext';

import classes from './style/AccountButton.module.css';

import Dropdown from '../shared/dropdown/Dropdown';
import SpinnerDots from '../loading/spinners/spinnerDots/SpinnerDots';

function AccountButton(props) {
	const { icon, customStyle } = props;
	const { t } = useTranslation(['common']);
	const AuthContext = useContext(authContext);

	const buttonIcon = icon ? <i className='material-icons'>person</i> : '';

	function handleInteraction({ action, payload }) {
		switch(action) {
			case 'NEW_ACCOUNT':
				break;
			case 'SELECT_ACCOUNT':
				AuthContext.getUser(payload);
				break;
		};
	};

	if (AuthContext.user_list && AuthContext.user_list.length > 0) {
		var buttonOptions = [{ title: 'New Account', id: 'NEW_ACCOUNT', icon: <i className='material-icons'>person_add</i>}].concat(AuthContext.user_list);
		return (
			<div className={ classes.container }>
				<Dropdown
					placeholder={ buttonIcon }
					buttonText={ AuthContext.current_user ? AuthContext.current_user.first_name : 'New Account' }
					onSelect={ id => handleInteraction({ action: 'SELECT_ACCOUNT', payload: id }) }
					optionsDictList={ buttonOptions }
					dropdownStyle={ !customStyle ? 'pledgx-dropdown' : customStyle }
					displayOption='first_name'
				/>
			</div>
		);
	} else {
		if (AuthContext.loading) {
			return (
				<div className={ customStyle ? customStyle : classes['no-options'] }>
					<SpinnerDots color='white' />
				</div>
			)
		} else {
			return (
				<div className={ customStyle ? customStyle : classes['no-options'] }>
					<div>
						{
							AuthContext.current_user && AuthContext.current_user.first_name ?
								AuthContext.current_user.first_name
							:
								'New User'
						}
					</div>
				</div>
			)
		}
	};
};

AccountButton.propTypes = {
	icon: propTypes.bool,
	customStyle: propTypes.string
};

AccountButton.defaultProps = {
	icon: true,
	customStyle: null
};

export default AccountButton
