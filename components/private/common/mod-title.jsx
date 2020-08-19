import React from 'react';
import ComTitle from './com-title';
import '../../../resources/dist/css/ln/modules/mod-title.css';

const ModTitle = ({ children, tag, classCondition, size, link }) =>
    children || tag ? (
        <section classesNames={`mod-title ${classCondition || ''}`}>
            <ComTitle
                tag={tag}
                size={size}
                classCondition={`${classCondition || ''}`}
            >
                {link ? <a href={link}>{children}</a> : children}
            </ComTitle>
        </section>
    ) : null;

export default ModTitle;
