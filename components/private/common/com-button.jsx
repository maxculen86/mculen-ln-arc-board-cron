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
            >
                <ComIco iconName={iconName} size={size} />
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
                <ComIco iconName={iconName} size={size} />
                <ComText>
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
            <ComText>
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
    iconName: PropTypes.string,
    iconPosition: PropTypes.string,
    size: PropTypes.string
};

export default ComButton;
