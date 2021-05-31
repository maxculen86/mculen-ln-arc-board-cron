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
        onClick,
        onMouseDown,
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
                className={`com-button ${classesNames || ``} ${classCondition ||
                    ''} ${iconName ? `--icon` : ``} `}
                onClick={onClick}
                onMouseDown={onMouseDown}
                style={style}
                title={title}
            >
                <ComIco iconName={iconName} />
            </button>
        );
    if (iconName && children)
        return (
            <button
                id={id}
                type="button"
                className={`com-button ${classesNames || ``} ${classCondition ||
                    ''} ${
                    iconName ? `--icon` : ``
                } ${iconName} ${iconPosition || ``}`}
                onClick={onClick}
                style={style}
                title={title}
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
            type="button"
            className={`com-button ${classesNames || ``} ${classCondition ||
                ''}`}
            onClick={onClick}
            style={style}
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
    style: PropTypes.node
};

export default ComButton;
