import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-button.css';
import ComIco from './com-icon';
import ComText from './com-text';

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
        classesNames,
        textname,
        iconName,
        iconPosition,
        size,
        title,
        style
    } = props;

    if (iconName && !children)
        return (
            <button
                id={id}
                type="button"
                data-event={dataEvent}
                data-section={dataSection}
                className={`com-button ${classesNames || ``} ${classCondition ||
                    ''} ${iconName ? `--icon` : ``} `}
                onClick={onClick}
                onMouseDown={onMouseDown}
                style={style}
                title={title}
                on={on || ''}
            >
                <ComIco iconName={iconName} />
            </button>
        );
    if (iconName && children)
        return (
            <button
                id={id}
                data-event={dataEvent}
                data-section={dataSection}
                type="button"
                className={`com-button ${classesNames || ``} ${classCondition ||
                    ''} ${
                    iconName ? `--icon` : ``
                } ${iconName} ${iconPosition || ``}`}
                onClick={onClick}
                style={style}
                title={title}
                on={on || ''}
            >
                <ComIco iconName={iconName} />
                <ComText size={size || ''}>
                    {children || ``}
                    {textname || ``}
                </ComText>
            </button>
        );
    return (
        <button
            id={id}
            data-event={dataEvent}
            data-section={dataSection}
            type="button"
            className={`com-button ${classesNames || ``} ${classCondition ||
                ''}`}
            onClick={onClick}
            style={style}
            on={on || ''}
        >
            <ComText size={size || ''}>
                {children || ``}
                {textname || ``}
            </ComText>
        </button>
    );
};

ComButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.string
    ]),
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
    dataEvent: PropTypes.string,
    dataSection: PropTypes.string,
    style: PropTypes.node
};

ComButton.defaultProps = {
    id: '',
    dataEvent: '',
    dataSection: ''
};

export default ComButton;
