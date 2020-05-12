import React from "react";
import styles from "./select.module.scss";
/**
 *
 * @param {string} labelText - label text
 * @param{string} name - name of select
 * @param{string} existingValue - if not a new item the field value of the existing document
 * @param{array} data - array holding key-value data for all the select options
 * @param{string} displayKey - key holding the data to display in the select option
 * @param{string} valueKey - key holding the value datafor the select option
 */
const Select = ({ labelText, name, existingValue = false, data, displayKey, valueKey, newButtonText, onNewItem }) => (
	<div className={styles.container}>
		<div>
			<label>{labelText}</label>
			{existingValue ? (
				<span>{existingValue}</span>
			) : data && data.length ? (
				<span>
					<select name={name}>
						{data.map((ob) => (
							<option key={ob[valueKey]} value={ob[valueKey]}>
								{ob[displayKey]}
							</option>
						))}
					</select>
					{newButtonText && (
						<button className='btn btn-primary ml-3' onClick={onNewItem}>
							{newButtonText}
						</button>
					)}
				</span>
			) : (
				""
			)}
		</div>
	</div>
);

export { Select };
