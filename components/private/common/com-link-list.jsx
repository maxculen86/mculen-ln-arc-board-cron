/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';

import '../../../resources/dist/css/ln/modules/mod-linklist.css';

const ComLinkList = ({ list, extraClass, _ref }) =>
    (list && list.length && (
        <ul className={`com-unordered ${extraClass}`} ref={_ref}>
            {list.map(element => (
                <li className="item">
                    <ComLink {...element} />
                </li>
            ))}
        </ul>
    )) ||
    null;

ComLinkList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.obj),
    extraClass: PropTypes.string,
    _ref: PropTypes.obj
};

ComLinkList.defaultProps = {
    list: [],
    extraClass: '',
    _ref: undefined
};

export default ComLinkList;
