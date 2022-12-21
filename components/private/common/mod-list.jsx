import React from 'react';
import PropTypes from 'fusion:prop-types';
import setClassName from './utils/setClassName';
import Link from './com-link';

import '../../../resources/dist/css/ln/modules/mod-list.css';

const List = ({ children, order, inline, mod, size }) => {
    const CustomTag = order ? 'ol' : 'ul';
    const orderedClass = order ? '--ordered' : '';
    const inlineClass = inline ? '--inline' : '';
    const _className = setClassName({
        baseClass: 'mod-list',
        inlineClass,
        orderedClass,
        mod,
        size
    });

    return (
        <CustomTag className={_className}>
            {children.map((item, index) => (
                <li key={item.text}>
                    {item.href ? (
                        <Link
                            textname={item.text}
                            title={item.alt || item.text}
                            link={item.href}
                            target={item.target}
                            rel={item.rel}
                        />
                    ) : (
                        item.text
                    )}
                </li>
            ))}
        </CustomTag>
    );
};

List.propTypes = {
    children: PropTypes.element,
    order: PropTypes.bool,
    inline: PropTypes.bool,
    mod: PropTypes.string,
    size: PropTypes.string
};

export default List;
