import React from 'react';
import '../../../src/statics/LN/css/components/_com-button.scss';
import ComIco from './com-icon';
import ComText from './com-text';

const ComButton = props => {
    const {
        children,
        classCondition,
        onclic,
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
                className={`com-button ${classesNames ? classesNames : ``} ${
                    classCondition ? classCondition : ''
                } ${iconName ? `--icon` : ``} `}
                onClick={onclic}
            >
                <ComIco iconName={iconName} size={size} />
            </button>
        );
    if (iconName && children)
        return (
            <button
                type="button"
                className={`com-button ${classesNames ? classesNames : ``} ${
                    classCondition ? classCondition : ''
                } ${iconName ? `--icon` : ``} ${iconName} ${
                    iconPosition ? iconPosition : ``
                }`}
                onClick={onclic}
            >
                <ComIco iconName={iconName} size={size} />
                <ComText>
                    {children ? children : ``}
                    {textname ? textname : ``}
                </ComText>
            </button>
        );
    return (
        <button
            type="button"
            className={`com-button ${classesNames ? classesNames : ``} ${
                classCondition ? classCondition : ''
            }`}
            onClick={onclic}
        >
            <ComText>
                {children ? children : ``}
                {textname ? textname : ``}
            </ComText>
        </button>
    );
};

export default ComButton;
