import React, { useEffect, useState, useRef, Fragment } from "react";

function Dropdown ({ value, optionsDictList, optionsList, displayOption='title', detailedReturn=false, dropdownStyle="pledgx-dropdown", dropdownId, checkboxStyle=false, placeholder="Select", buttonType="submit", buttonText, buttonEnd=<i className="material-icons">keyboard_arrow_down</i>, translationCategory='main', allowEmptyValues=false, onSelect, extraData={}, disabled=false, onOpen }) {
	const dropdownRef = useRef();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			if (onOpen) {
				onOpen(!detailedReturn ? true : {dropdownId: dropdownId, open: true})
			}
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
			if (onOpen) {
				onOpen(!detailedReturn ? false : {dropdownId: dropdownId, open: false})
			}
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	function handleClickOutside (e) {
		if (dropdownRef.current.contains(e.target)) {
			return;
		}
		setIsOpen(false);
	};

	function handleClick (selectedValue) {
		if (!detailedReturn) {
			onSelect(selectedValue);
		} else {
			if (optionsDictList) {
				var selectedTitle;
				for (var item in optionsDictList) {
					if (optionsDictList[item].id === selectedValue && (optionsDictList[item].id !== '' || allowEmptyValues)) {
						selectedTitle = optionsDictList[item].title
					}
				}
			}
			var returnDict = {};
			if (selectedTitle) {
				returnDict[dropdownId] = {
					...extraData,
					title: selectedTitle,
					id: selectedValue,
					dropdownId: dropdownId
				}
			}
			if (Object.keys(returnDict).length > 0) {
				onSelect(returnDict);
			}
		}
		if (!checkboxStyle) {
			setIsOpen(false);
		}
	};

	function displayOptions () {
		if (optionsList) {
			return(
				optionsList.map(option => (
					<li className='dropdown-item' onClick={ e => handleClick(option) } key={ option }>
						{ option }
					</li>
				))
			)
		}
		if (optionsDictList) {
			return(
				optionsDictList.map(option =>{
					return(
						<Fragment key={ option.id }>
							{
								option.upperLine &&
									<hr />
							}
							<li className={ `dropdown-item ${ option.subtle ? 'item-subtle' : '' }` } onClick={ e => handleClick(option.id) } title={ option.alt }>
								<div className='dropdown-item--checkbox'>
									{
										option.checked !== undefined && (
											option.checked ?
												<i className='material-icons'>check_box</i>
											:
												<i className='material-icons'>check_box_outline_blank</i>
										)
									}
								</div>
								<div className='dropdown-item--icon'>{ option.icon }</div><div className={ `${dropdownStyle}-item--text` }><span>{ option[displayOption] }</span></div>
							</li>
						</Fragment>
					)
				})
			)
		}
	}

	return (
		<div ref={ dropdownRef } className={ dropdownStyle }>
			<button type={ buttonType } className={ `dropdown-button ${ isOpen? 'open' : 'closed' } ${ disabled && 'button-disabled' }` } onClick={ () => !disabled && setIsOpen(!isOpen) } id={ dropdownId && dropdownId }>
				{
					(value || placeholder) &&
						<div className='dropdown-button--1'>{ value || placeholder }</div>
				}
				{
					buttonText &&
						<div className='dropdown-button--2'>{ buttonText }</div>
				}
				{
					buttonEnd &&
						<div className='dropdown-button--3'>{ buttonEnd }</div>
				}
			</button>
			{isOpen && (
				<ul className='dropdown-content'>
					{ displayOptions() }
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
