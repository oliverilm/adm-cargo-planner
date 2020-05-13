import React from 'react';
import NavigationBar from './components/Navigation/NavigationBar';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function App() {

	return (
		<div className="App">
			<Router>
				<div>
					<ReactNotification />
					<NavigationBar />
				</div>
			</Router>
		</div>
	);
}

export default App;
