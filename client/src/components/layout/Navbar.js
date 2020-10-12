import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav>
			<div className='nav-wrapper white fonts'>
				<Link to='#' className='brand-logo left'>
					InstagramLite
				</Link>
				<ul id='nav-mobile' className='right'>
					<li>
						<Link to='./signup'>Sign Up</Link>
					</li>
					<li>
						<Link to='/signin'>Sign In</Link>
					</li>
					<li>
						<Link to='./create'>Create Post</Link>
					</li>
					<li>
						<Link to='./profile'>Get Started</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
