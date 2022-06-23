import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import * as serviceWorker from './serviceWorker';
//import reportWebVitals from './reportWebVitals';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Suspense fallback={(<div>Loading</div>)}>
			<App useSuspense={true} />
		</Suspense>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();