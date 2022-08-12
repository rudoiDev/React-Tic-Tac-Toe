import React from 'react'
import './app.css';
import Main from '../main/Main';

class App extends React.Component {

	render() {
		return (
			<div className="App">
				<h1>Крестики-нолики</h1>
				<Main />
			</div>
		)
	}
}

export default App;
