import React from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import Profile from './components/pages/profile/Profile';
import Signup from './components/pages/signup/Signup';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Route exact path='/' component={Home} />
			<Route path='/signin' component={Login} />
			<Route path='/profile' component={Profile} />
			<Route path='/signup' component={Signup} />
		</BrowserRouter>
	);
}

export default App;
