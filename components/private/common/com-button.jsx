import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-button.css';
import ComIco from './com-icon';
import ComText from './com-text';

const ComButton = props => {
    const {
        children,
        classCondition,
        onClick,
        onMouseDown,
        classesNames,
        textname,
        iconName,
        iconPosition,
        size
    } = props;

    if (iconName && !children)
        return (
            <button
                type="button"
                className={`com-button ${classesNames || ``} ${classCondition ||
                    ''} ${iconName ? `--icon` : ``} `}
                onClick={onClick}
                onMouseDown={onMouseDown}
            >
                <ComIco iconName={iconName} />
            </button>
        );
    if (iconName && children)
        return (
            <button
                type="button"
                className={`com-button ${classesNames || ``} ${classCondition ||
                    ''} ${
                    iconName ? `--icon` : ``
                } ${iconName} ${iconPosition || ``}`}
                onClick={onClick}
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
            type="button"
            className={`com-button ${classesNames || ``} ${classCondition ||
                ''}`}
            onClick={onClick}
        >
            <ComText size={size || ''}>
                {children || ``}
                {textname || ``}
            </ComText>
        </button>
    );
};

ComButton.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    classCondition: PropTypes.string,
    classesNames: PropTypes.string,
    textname: PropTypes.string,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    iconName: PropTypes.string,
    iconPosition: PropTypes.string,
    size: PropTypes.string
};

export default ComButton;
