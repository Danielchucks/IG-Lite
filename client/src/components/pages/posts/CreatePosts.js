import React from 'react';

const CreatePosts = () => {
	return (
		<div className='card input-field'>
			<input type='text' placeholder='title' />
			<input type='text' placeholder='Body' />

			<div className='file-field input-field'>
				<div className='btn'>
					<span>File</span>
					<input type='file' />
				</div>
				<div className='file-path-wrapper'>
					<input className='file-path validate' type='text' />
				</div>
			</div>
		</div>
	);
};

export default CreatePosts;
