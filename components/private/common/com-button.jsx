/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/components/com-button.css';
import ComIco from './com-icon';
import ComText from './text';

const ComButton = props => {
    const {
        id,
        children,
        classCondition,
        dataEvent,
        dataSection,
        onClick,
        onMouseDown,
        on,
        tabIndex,
        classesNames,
        textname,
        iconName,
        iconPosition,
        size,
        title,
        style
    } = props;

    const conditionalProps = {
        ...(iconName && !children && { onMouseDown }),
        ...(iconName && !children && { tabIndex }),
        className: `com-button ${classesNames || ''} ${classCondition || ''} ${
            iconName ? `--icon` : ''
        } ${iconName && children ? `${iconName} ${iconPosition || ''}` : ''}`
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
            {...conditionalProps}
        >
            {iconName && <ComIco iconName={iconName} />}
            {(children || textname) && (
                <ComText size={size || ''}>
                    {children || ``}
                    {textname || ``}
                </ComText>
            )}
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
    iconName: PropTypes.string,
    iconPosition: PropTypes.string,
    size: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    on: PropTypes.string,
    dataEvent: PropTypes.string,
    dataSection: PropTypes.string,
    tabIndex: PropTypes.string,
    style: PropTypes.node
};

ComButton.defaultProps = {
    id: '',
    dataEvent: '',
    dataSection: '',
    style: undefined,
    title: '',
    size: '',
    on: '',
    iconPosition: '',
    iconName: '',
    textname: '',
    classesNames: '',
    classCondition: '',
    tabIndex: '',
    onClick: () => {},
    onMouseDown: () => {},
    children: undefined
};

export default ComButton;
