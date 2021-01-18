/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import ComTitle from './com-title';

import '../../../resources/dist/css/ln/modules/mod-linklist.css';

const ComLinkList = ({ title, list, separator }) =>
    (list && list.length && (
        <section className="mod-linklist">
            {title ? <ComTitle size="--twoxs" content={title} /> : ''}

            <ul className={`com-unordered ${separator || ''}`}>
                {list.map(element => (
                    <li className="item">
                        <ComLink {...element} />
                    </li>
                ))}
            </ul>
        </section>
    )) ||
    null;

ComLinkList.propTypes = {
    title: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.obj),
    separator: PropTypes.string
};

ComLinkList.defaultProps = {
    title: '',
    list: [],
    separator: ''
};

export default ComLinkList;
