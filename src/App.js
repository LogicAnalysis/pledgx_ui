import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyles } from './theme/globalStyles';

import ThemeRouter from './theme/ThemeRouter';

import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import EnvState from './context/env/EnvState';
import PrefState from './context/pref/PrefState';

import './style/Base.css';
import './style/Layout.css';
import './style/Typography.css';
import './style/Components.css';
import './style/Utilities.css';

import MainContainer from './containers/MainContainer';

function App() {
	return (
		<EnvState>
		<AlertState>
		<PrefState>
		<AuthState>
			<ThemeRouter>
				<BrowserRouter>
					<GlobalStyles />
					<div className="App" id="page-top">
						<Switch>
							<Route path="/" component={ MainContainer } />
						</Switch>
					</div>
				</BrowserRouter>
			</ThemeRouter>
		</AuthState>
		</PrefState>
		</AlertState>
		</EnvState>
	);
}

export default App;
