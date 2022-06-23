import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import classes from './style/LocalizationComponent.module.css';

import Dropdown from '../shared/dropdown/Dropdown';
import { languageList } from './languageList';

function LocalizationComponent({ icon=false, customStyle=null }) {
	const { i18n, t }= useTranslation(['main']);
	const [languageState, setLanguageState] = useState([]);

	useEffect(() => {
		orderLanguages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [languageList]);
	
	function handleClick(lang) {
		i18n.changeLanguage(lang);
		localStorage.setItem('i18_lang', lang);
		orderLanguages();
	};

	function orderLanguages() {
		if (languageList && languageList.length > 0) {
			var tempLanguageList = [];
			for (var language of languageList) {
				if (language.id === i18n.language) {
					tempLanguageList.unshift(language);
				} else {
					tempLanguageList.push(language);
				};
			};
			setLanguageState(tempLanguageList);
		};
	};

	return (
		<Fragment>
			<div className={ !customStyle ? classes.wrapper : customStyle }>
				<Dropdown
					placeholder={ icon ? <i className='material-icons'>language</i> : '' }
					buttonText={ t(`main:${ i18n.language.toString() }`) }
					onSelect= { lang => handleClick(lang) }
					optionsDictList={ languageState }
					buttonEnd=''
					dropdownStyle={ !customStyle ? classes.dropdown : 'dropdown' }
				/>
			</div>
		</Fragment>
	);

};

export default LocalizationComponent;
