import React from 'react';
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
        size,
        style
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

export default ComButton;
