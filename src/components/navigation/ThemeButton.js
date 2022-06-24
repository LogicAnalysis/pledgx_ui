import React, { useContext } from 'react';

import prefContext from '../../context/pref/prefContext';

import classes from './style/ThemeButton.module.css';

function ThemeButton() {
	const PrefContext = useContext(prefContext);

	function toggleTheme() {
		PrefContext.switchTheme();
	}

	return(
		<div className={ classes.container } onClick={ () => toggleTheme() }>
			<i className='material-icons'>{ (PrefContext.theme === 'LIGHT_THEME') ? 'light_mode' : 'dark_mode' }</i> 
		</div>
	);
};

export default ThemeButton
