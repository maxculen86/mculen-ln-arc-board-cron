import React from 'react';
import setClassName from './utils/setClassName';
import Link from './com-link';

import '../../../resources/dist/css/ln/modules/mod-list.css';

function List({ children, order, inline, mod, size }) {
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
            {children.map(item => (
                <li key={item.text}>
                    {item.href ? (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
}

export default List;
