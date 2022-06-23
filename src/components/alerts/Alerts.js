import React, { Fragment, useContext } from 'react'
import alertContext from '../../context/alert/alertContext'

import classes from './style/Alerts.module.css'

function Alerts() {
	const AlertContext = useContext(alertContext);

	function alertBuilder(alert) {
		var alertIcon = 'error';
		if (alert.type) {
			switch(alert.type) {
				case 'error':
					alertIcon = 'error';
					break;
				case 'notification':
					alertIcon = 'notifications';
					break;
			}
		}
		return(
			<div className={ `pl-alert ${ (alert.title && alert.msg) ? classes['alert-two-rows'] : classes['alert-one-row'] } ${ classes[`alert-${ alert.type }`] }` } key={ alert.id }>
				<div className={ `pl-alert--icon ${ classes.icon }` }>
					<i className="material-icons">{ alertIcon }</i>
				</div>
				{ alert.title &&
					<div className={ `pl-alert--title ${ classes.title }` }>
						{ alert.title }
					</div>
				}
				{ (alert.title && alert.closeable) &&
					<div className={ `pl-alert--close ${ classes.close }` } onClick={ () => AlertContext.removeAlertById(alert.id) }>
						<i className="material-icons">close</i>
					</div>
				}
				{
					alert.msg &&
						<div className={ `pl-alert--content ${ classes.content }` }>
							{ alert.msg }
						</div>
				}
				{ (!alert.title && alert.closeable) &&
					<div className={ `pl-alert--close ${ classes.close }` } onClick={ () => AlertContext.removeAlertById(alert.id) }>
						<i className="material-icons">close</i>
					</div>
				}
			</div>
		)
	}

	if (AlertContext.alerts && AlertContext.alerts.length > 0) {
		return(
			<div className={ classes['alerts-position'] }>
				{
					AlertContext.alerts.map(alert =>
						<div className={ ['pl-alerts-container', classes['alerts-container'], alert.type && classes[alert.type]].join(' ') } key={ alert.id }>
							{ alertBuilder(alert) }
						</div>
					)
				}
			</div>
		)
	} else {
		return(
			<Fragment />
		)
	}
}

export default Alerts
