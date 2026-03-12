import React from 'react';
import { transformedFilterNames } from '../_helpers';

function CheckBoxHeader({ checkboxes = [], handleCheckBox = () => {} }) {
    return (
        <ol className="flex flex-column gap-8">
            {checkboxes.map(
                ({ key, value, checked, facetedKey, group }) =>
                    key !== '1' && (
                        <li
                            className="flex ai-center gap-8"
                            data-filter-value="Carne picada"
                            key={`${key}-${facetedKey || group}`}
                        >
                            <input
                                className="input-search"
                                id={`${key}-${facetedKey || group}`}
                                type="checkbox"
                                checked={checked}
                                name={transformedFilterNames(key)}
                                value={key}
                                onChange={event =>
                                    handleCheckBox(event, facetedKey)
                                }
                            />
                            <label
                                className="pointer"
                                htmlFor={`${key}-${facetedKey || group}`}
                            >
                                {transformedFilterNames(key) || key} ({value})
                            </label>
                        </li>
                    )
            )}
        </ol>
    );
}

export default CheckBoxHeader;
