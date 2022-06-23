import React, { Fragment, useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import PrefContext from '../context/pref/prefContext'

import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';

const ThemeRouter = (props) => {
	const prefContext = useContext(PrefContext);
	const { theme } = prefContext;

	if (theme === 'DARK_THEME') {
		return (
			<Fragment>
				<ThemeProvider theme={ darkTheme }>
					{ props.children }
				</ThemeProvider>
			</Fragment>
		)
	} else {
		return (
			<Fragment>
				<ThemeProvider theme={ lightTheme }>
					{ props.children }
				</ThemeProvider>
			</Fragment>
		)
	}

}

export default ThemeRouter