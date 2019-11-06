import React from 'react';
import withCorrectHref from '../../../common/hocs/withCorrectHref';

export default withCorrectHref(function HeaderItem(props) {
    return (
        <a
            href={props.href}
            className="header__nav__link"
            alt={props.alt}
            data-event="LinkClick"
            data-section="HeaderOTT"
        >
            {props.description}
        </a>
    );
});
