import React, { useContext, useEffect, Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Alerts from '../components/alerts/Alerts';

import Main from '../components/pages/Main';

import authContext from '../context/auth/authContext';
import prefContext from '../context/pref/prefContext';

function MainContainer() {
	const AuthContext = useContext(authContext);
	const PrefContext = useContext(prefContext);

	useEffect(() => {
		if (!AuthContext.isAuthenticated) {
			AuthContext.getUserList();
		};
		PrefContext.getTheme();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<Alerts />
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/main" />} />
				<Route exact path='/main' component={ Main } />
			</Switch>
		</Fragment>
	);
}

export default MainContainer;
