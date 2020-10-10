import React from 'react';

import './Home.css';

const Home = () => {
	return (
		<div className='home'>
			<div className='card home-card'>
				<h5>DannyBrad</h5>
				<div className='card-image'>
					<img src='https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' />
				</div>
				<div className='card-content'>
					<i className='material-icons'>favorite_border</i>
					<h6>Title</h6>
					<p>This is a amazing quote</p>
					<input type='text' placeholder='Add a comment' />
				</div>
			</div>
			<div className='card home-card'>
				<h5>DannyBrad</h5>
				<div className='card-image'>
					<img src='https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' />
				</div>
				<div className='card-content'>
					<i className='material-icons'>favorite</i>
					<h6>Title</h6>
					<p>This is a amazing quote</p>
					<input type='text' placeholder='Add a comment' />
				</div>
			</div>
			<div className='card home-card'>
				<h5>DannyBrad</h5>
				<div className='card-image'>
					<img src='https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' />
				</div>
				<div className='card-content'>
					<h6>Title</h6>
					<p>This is a amazing quote</p>
					<i className='material-icons'>favorite_border</i>
					<input type='text' placeholder='Add a comment' />
				</div>
			</div>
		</div>
	);
};

export default Home;
