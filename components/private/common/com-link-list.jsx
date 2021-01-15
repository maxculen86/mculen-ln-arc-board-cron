/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import ComTitle from './com-title';

const ComLinkList = ({ title, list, separator }) =>
    (list && list.length && (
        <>
            <ComTitle tag="h1" size="s" content={title} />
            <ul className={`com-unordered ${separator || ''}`}>
                {list.map(element => (
                    <li className="com-link">
                        <ComLink {...element} />
                    </li>
                ))}
            </ul>
        </>
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
