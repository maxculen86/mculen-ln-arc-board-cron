import React from 'react';
import PropTypes from 'prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const trim = (string = '') => string.replace(/\s{2,}/g, ' ');

function ComPicture(props) {
    const { href, classCondition, children, video } = props;
    const className = trim(`placeholder ${video} ${classCondition}`);
    const picture = <div className={className}>{children}</div>;

    if (href) {
        return <a href={href}>{picture}</a>;
    }

    return picture;
}

ComPicture.propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    classCondition: PropTypes.string,
    video: PropTypes.string
};

ComPicture.defaultProps = {
    children: undefined,
    href: '',
    classCondition: '',
    video: ''
};

export default ComPicture;
