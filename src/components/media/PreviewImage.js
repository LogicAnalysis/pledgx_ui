import React, { useState } from 'react';
import propTypes from 'prop-types';

import classes from './style/PreviewImage.module.css';

function PreviewImage(props) {
	const { id, newImageLink, startingImage } = props;
	const [state, setState] = useState({
		currentImage: null
	});

	function handleInteraction({ action, payload }) {
		switch(action) {
			case 'PHOTO_CHANGED':
				if (payload && payload.target && payload.target.files && payload.target.files.length > 0) {
					var imageLink = URL.createObjectURL(payload.target.files[0]);
					setState({ ...state,currentImage: imageLink });
					if (newImageLink) {
						newImageLink(imageLink);
					};
				};
				break;
		};
	};

	return(
		<div className={ classes.container }>
			{
				state.currentImage ?
					<img className={ classes.image } src={ state.currentImage } />
				:
					startingImage ?
						<img className={ classes.image } src={ startingImage } />
					:
					<div className={ [classes.image, classes['empty-image']].join(' ') }></div>
			}
			<div className={ classes['edit-container'] }>
				<label htmlFor='photo-select-input'>
					<i className='material-icons'>edit</i>
				</label>
				<input id='photo-select-input' onChange={ (e) => handleInteraction({ action: 'PHOTO_CHANGED', payload: e }) } type="file" accept=".jpeg, .jpg, .png" />
			</div>
		</div>
	)
}

PreviewImage.propTypes = {
	id: propTypes.string,
	newImageLink: propTypes.func,
	startingImage: propTypes.string
};

PreviewImage.defaultProps = {
};

export default PreviewImage;
