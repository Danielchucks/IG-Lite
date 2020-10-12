import React from 'react';

import './CreatePosts';

const CreatePosts = () => {
	return (
		<div
			className='card post-container'
			style={{
				margin: '30px auto',
				maxWidth: '500px',
				padding: '20px',
				textAlign: 'center',
			}}
		>
			<input type='text' placeholder='title' />
			<input type='text' placeholder='Body' />

			<div className='file-field input-field'>
				<div className='btn #b71c1c red darken-1'>
					<span>Upload Image</span>
					<input type='file' />
				</div>
				<div className='file-path-wrapper'>
					<input className='file-path validate' type='text' />
				</div>
			</div>
			<button className='btn waves-effect waves-light #b71c1c red darken-1'>
				Login
			</button>
		</div>
	);
};

export default CreatePosts;
