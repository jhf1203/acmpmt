import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from "react-router-dom"
// STRICTMODE WAS BROWSERROUTER

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById('root')
);
