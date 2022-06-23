import React from 'react';
import { Link } from 'react-router-dom';

import { useWindowSize } from '../../utils/useWindowSize';

import classes from './style/Navigation.module.css';

import AccountButton from './AccountButton';
import LocalizationComponent from '../../components/localization/LocalizationComponent';

import PledgeXLogo from '../../PledgXLogo.png';
import PledgeXLogoMini from '../../PledgXLogoMini.png';

function Navigation() {
	const windowSize = useWindowSize();

	return (
		<div className={ classes['nav-container'] }>
			<div className={ classes.brand }>
				<Link className={ classes['brand-link'] } to='/'>
					<div className={ classes['brand--icon'] }>
						{
							(windowSize && windowSize.width && windowSize.width < 600) ?
								<img className={ classes.logo } src={ PledgeXLogoMini } alt='PledgX' />
							:
								<img className={ classes.logo } src={ PledgeXLogo } alt='PledgX' />
						}
					</div>
				</Link>
			</div>
			<div className={ classes['nav--elements'] }>
				<div className={ classes.localization }>
					<LocalizationComponent />
				</div>
				<div className={ classes.account }>
					<AccountButton icon={ false } />
				</div>
			</div>
		</div>
	);
};

export default Navigation;
