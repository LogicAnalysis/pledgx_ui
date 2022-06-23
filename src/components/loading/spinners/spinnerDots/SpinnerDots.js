import React from 'react'
import propTypes from 'prop-types'

import classes from './SpinnerDots.module.css'

function Spinner (props) {
	const { size, color } = props;
	return (
		<div className={ classes.spinner } style={{ width: `${size*3}rem` }}>
			<div className={ classes.bounce1 } style={{ width: `${size}rem`, height: `${size}rem`, backgroundColor: color }}></div>
			<div className={ classes.bounce2 } style={{ width: `${size}rem`, height: `${size}rem`, backgroundColor: color }}></div>
			<div className={ classes.bounce3 } style={{ width: `${size}rem`, height: `${size}rem`, backgroundColor: color }}></div>
		</div>
	)
}

Spinner.propTypes = {
	size: propTypes.string,
	color: propTypes.string
};

Spinner.defaultProps = {
	size: "1",
	color: "#72C5A2"
};

export default Spinner
