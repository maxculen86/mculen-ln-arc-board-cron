import React from 'react';
import ComTitle from './com-title';
import Container from './com-container';
import '../../../resources/dist/css/ln/modules/mod-title.css';

const ModTitle = props => {
    const { children, tag, classCondition, size, link } = props;
    if (!children || !tag) return null;
    if (link)
        return (
            <section
                classesNames={`mod-title ${
                    classCondition ? classCondition : ''
                }`}
            >
                <ComTitle
                    tag={tag}
                    size={size}
                    classCondition={`${classCondition ? classCondition : ''}`}
                >
                    <a href={link}>{children}</a>
                </ComTitle>
            </section>
        );
    return (
        <section
            classesNames={`mod-title ${classCondition ? classCondition : ''}`}
        >
            <ComTitle
                tag={tag}
                size={size}
                classCondition={`${classCondition ? classCondition : ''}`}
            >
                {children}
            </ComTitle>
        </section>
    );
};

export default ModTitle;
