import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
	return (
		<div className='mycard'>
			<div className='card auth-card'>
				<h2 className='label-h'>Instagram</h2>
				<input type='text' placeholder='email' />
				<input type='password' placeholder='password' />
				<button className='btn waves-effect waves-light #b71c1c red darken-4'>
					Login
				</button>
				<p>
					Don't have an account?{' '}
					<Link to='./signup'>
						<h5>SignUp</h5>
					</Link>{' '}
				</p>
			</div>
		</div>
	);
};

export default Login;
