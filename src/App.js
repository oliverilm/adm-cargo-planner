import React from 'react';
import NavigationBar from './components/Navigation/NavigationBar';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="App">
			<Router>
				<div>
					<NavigationBar />
				</div>
			</Router>
		</div>
	);
}

export default App;
