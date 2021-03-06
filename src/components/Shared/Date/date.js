import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./date.module.scss";

/**
 *
 * @param {boolean}	container - true - display or don't display container class on top level element
 * @param {boolean}	displayInput - true: display user input DOM element; false: display existing value instead
 * @param {string}	displayValue - text to display instead of allowing userInput
 * @param {string}	extraClasses - extra classes to apply to parent element
 * @param {function} handleOnChange - update parent state with user input
 * @param {string}	labelText - text to display as label
 * @param {string}	name - input type name
 * @param {string}	helpText - Text to display when mouseover question mark icon
 */
const DateComponent = ({
	container = true,
	displayInput,
	displayValue,
	extraClasses,
	handleOnChange,
	labelText,
	name,
	helpText = "",
}) => {
	const onChange = (event) => {
		handleOnChange(event.target.name, event.target.value);
	};

	return (
		<div
			className={
				(container ? styles.container + " " : "") +
				styles.dateComponent +
				" d-flex flex-column" +
				(extraClasses ? " " + extraClasses : "")
			}>
			<label>{labelText}</label>
			{displayInput ? (
			<div className="d-flex flex-row">
				<span className='d-flex flex-row justify-content-between'>
					<input type='date' name={name} value={displayValue} onChange={onChange} />
				</span> { helpText.length ? <FontAwesomeIcon icon='question-circle' size='sm' className={"ml-1 mt-2 " + styles['cursor-help']} title={helpText} /> : null}
			</div>
			) : (
				<span className='d-flex flex-row justify-content-between'>{displayValue} </span>
			)}
		</div>
	);
};

export { DateComponent };
