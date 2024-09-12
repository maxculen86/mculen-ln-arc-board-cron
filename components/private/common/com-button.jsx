/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import ComText from './text';
import classNames from 'classnames';

import '../../../resources/dist/css/ln/components/com-button.css';

const ComButton = props => {
    const {
        id,
        children,
        dataEvent,
        dataSection,
        onClick,
        onMouseDown,
        on,
        tabIndex,
        classesNames,
        classCondition,
        textname,
        iconStart,
        iconEnd,
        size,
        title,
        style,
        disabled
    } = props;

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
};

ComButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    classCondition: PropTypes.string,
    classesNames: PropTypes.string,
    textname: PropTypes.string,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    iconStart: PropTypes.node,
    iconEnd: PropTypes.node,
    size: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    on: PropTypes.string,
    dataEvent: PropTypes.string,
    dataSection: PropTypes.string,
    tabIndex: PropTypes.string,
    style: PropTypes.node,
    disabled: PropTypes.bool
};

ComButton.defaultProps = {
    id: '',
    dataEvent: '',
    dataSection: '',
    style: undefined,
    title: '',
    size: '',
    on: '',
    iconStart: null,
    iconEnd: null,
    textname: '',
    classesNames: '',
    classCondition: '',
    tabIndex: '',
    onClick: () => {},
    onMouseDown: () => {},
    children: undefined,
    disabled: false
};

export default ComButton;
