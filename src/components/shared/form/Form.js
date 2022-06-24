import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import authContext from '../../../context/auth/authContext';

import SpinnerDots from '../../loading/spinners/spinnerDots/SpinnerDots';

import { ReactComponent as CanadaFlag } from '../../../static/ca.svg';
import { ReactComponent as USFlag } from '../../../static/us.svg';

function Form(props) {
	const { customStyle, id } = props;
	const { t } = useTranslation(['form']);
	const AuthContext = useContext(authContext);

	const [state, setState] = useState({
		enteredInfo: {}
	});

	useEffect(() => {
		if (AuthContext.current_user || (Object.keys(state.enteredInfo).length > 0)) {
			setState({
				...state,
				enteredInfo: AuthContext.current_user || {}
			});
		};
	}, [AuthContext.current_user]);

	function handleInteraction({ action, payload }) {
		switch(action) {
			case 'COUNTRY_CHANGED':
				setState({
					...state,
					enteredInfo: { ...state.enteredInfo, country: payload }
				});
				break;
			case 'ELEMENT_CHANGED':
				setState({
					...state,
					enteredInfo: { ...state.enteredInfo, [payload.target.id]: payload.target.value }
				});
				break;
			case 'SAVE':
				AuthContext.updateUser(state.enteredInfo);
				break;
		};
	};

	return(
		<form
			className={ customStyle }
			key={ id }
			noValidate={ true }
			onSubmit={ (e) => e.preventDefault() }
		>
			<div className='form-top-container'>
				<div className='form-title header-2'>{ t('form:edit_your_contact_info') }</div>
				<div className='form-pfp-area'>
					<div className='photo-component' style={{ backgroundColor: 'red', height: 200, width: 200, margin: '3rem 0' }}></div>
				</div>
				<div className='form-fields-container'>
					<div className='form-fields-row form-name-row'>
						<div className='form-element-container'>
							<label className='form-element-label' htmlFor='first_name'>{ t('form:first_name') }</label>
							<input
								id='first_name'
								className='form-element-input'
								onChange={ (e) => handleInteraction({ action: 'ELEMENT_CHANGED', payload: e }) }
								value={ state.enteredInfo.first_name || '' }
							/>
						</div>
						<div className='form-element-container'>
							<label className='form-element-label' htmlFor='last_name'>{ t('form:last_name') }</label>
							<input
								id='last_name'
								className='form-element-input'
								onChange={ (e) => handleInteraction({ action: 'ELEMENT_CHANGED', payload: e }) }
								value={ state.enteredInfo.last_name || '' }
							/>
						</div>
					</div>
					<div className='form-fields-row'>
						<div className='form-element-container'>
							<label className='form-element-label' htmlFor='phone_number'>{ t('form:phone_number') }</label>
							<input
								id='phone_number'
								className='form-element-input'
								onChange={ (e) => handleInteraction({ action: 'ELEMENT_CHANGED', payload: e }) }
								value={ state.enteredInfo.phone_number || '' }
							/>
						</div>
					</div>
					<div className='form-fields-row'>
						<div className='form-element-container'>
							<label className='form-element-label' htmlFor='job_title'>{ t('form:job_title') }</label>
							<input
								id='job_title'
								className='form-element-input'
								onChange={ (e) => handleInteraction({ action: 'ELEMENT_CHANGED', payload: e }) }
								value={ state.enteredInfo.job_title || '' }
							/>
						</div>
					</div>
					<div className='form-fields-row country-label-row'>
						<label className='form-element-label' htmlFor='job_title'>{ t('form:Country') }</label>
					</div>
					<div className='form-fields-row form-country-row'>
						<div
							className={ ['form-country-selector-container', (state.enteredInfo.country === 'CA') && 'selected'].join(' ') }
							onClick={ () => handleInteraction({ action: 'COUNTRY_CHANGED', payload: 'CA' }) }
						>
							<CanadaFlag className='flag-image'/>
							<span className='flag-text'>Canada</span>
						</div>
						<div
							className={ ['form-country-selector-container', (state.enteredInfo.country === 'US') && 'selected'].join(' ') }
							onClick={ () => handleInteraction({ action: 'COUNTRY_CHANGED', payload: 'US' }) }
						>
							<USFlag className='flag-image'/>
							<span className='flag-text'>USA</span>
						</div>
					</div>
				</div>
			</div>
			<div className='form-bottom-container'>
				<button type='button' className='pledgx-form-btn' value='Test' onClick={ () => handleInteraction({ action: 'SAVE' }) }>
					{
						AuthContext.loading ?
							<SpinnerDots color='white' />
						:
							t('form:save') 
					}
				</button>
			</div>
		</form>
	);
};

Form.propTypes = {
	customStyle: propTypes.string,
	id: propTypes.string.isRequired
};

Form.defaultProps = {
	customStyle: 'pledgx-form'
};

export default Form;
