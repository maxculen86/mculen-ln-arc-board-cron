/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import ComText from './text';

import '../../../resources/dist/css/ln/components/com-button.css';

function ComButton({
    id = '',
    children,
    dataEvent = '',
    dataSection = '',
    onClick = () => {},
    onMouseDown = () => {},
    on = '',
    tabIndex = '',
    classesNames = '',
    classCondition = '',
    textname = '',
    iconStart = null,
    iconEnd = null,
    size = '',
    title = '',
    style,
    disabled = false
}) {
    const conditionalProps = {
        ...((iconStart || iconEnd) && !children && { onMouseDown }),
        ...((iconStart || iconEnd) && !children && { tabIndex }),
        className: classNames('com-button', classesNames, classCondition)
    };

    return (
        <button
            id={id}
            data-event={dataEvent}
            data-section={dataSection}
            type="button"
            onClick={onClick}
            style={style}
            title={title}
            // eslint-disable-next-line react/no-unknown-property
            on={on || ''}
            disabled={disabled}
            {...conditionalProps}
        >
            {iconStart}
            {(children || textname) && (
                <ComText size={size || ''}>
                    {children || ''}
                    {textname || ''}
                </ComText>
            )}
            {iconEnd}
        </button>
    );
}

export default ComButton;
