import React from 'react';
import { Link } from 'react-router-dom';

import './Signup.css';

const Signup = () => {
	return (
		<div className='mycard'>
			<div className='card auth-card'>
				<h2 className='label-h'>Instagram</h2>
				<input type='text' placeholder='Full name' />
				<input type='text' placeholder='email' />
				<input type='password' placeholder='password' />
				<button className='btn waves-effect waves-light #b71c1c red darken-4'>
					Sign Up
				</button>
				<p>
					Already have an account{' '}
					<h5>
						<Link to='/signin'>Login</Link>
					</h5>
				</p>
			</div>
		</div>
	);
};

export default Signup;
