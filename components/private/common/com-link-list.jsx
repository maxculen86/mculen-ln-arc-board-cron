/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import ComLink from './com-link';
import setClassName from './utils/setClassName';

function ComLinkList({
    list = [],
    extraClass = '',
    _ref,
    isEditoriales = false,
    isHome = false
}) {
    const classes = setClassName({
        baseClass: 'com-unordered',
        noScroll: '--no-scrollbar',
        extraClass
    });
    const extraOpts = {};
    return (
        (list && list.length && (
            <ul className={classes} ref={_ref}>
                {list.map((element, i) => {
                    if (isEditoriales) {
                        extraOpts['data-pos'] = `990${i + 1}`;
                        extraOpts['data-id'] = element.id;
                        extraOpts['data-notaid'] = element.id;
                    }
                    if (isHome) {
                        Object.assign(element, { dataEvent: 'LinkClick' });
                        Object.assign(element, { dataSection: 'TagsFooter' });
                    }
                    return (
                        <li
                            key={element.id || i}
                            className="item"
                            {...extraOpts}
                        >
                            <ComLink {...element} />
                        </li>
                    );
                })}
            </ul>
        )) ||
        null
    );
}

export default ComLinkList;
