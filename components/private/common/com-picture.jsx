import React from 'react';
import PropTypes from 'prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const trim = string => {
    return string.replace(/\s{2,}/g, ' ');
};

const ComPicture = props => {
    const { href, classCondition, children, video, amp } = props;
    const className = trim(`placeholder ${video} ${classCondition}`);
    const picture = <div className={className}>{children}</div>;

    return <>{href ? <a href={href}>{picture}</a> : picture}</>;
};

ComPicture.propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    classCondition: PropTypes.string,
    amp: PropTypes.bool,
    video: PropTypes.string
};

ComPicture.defaultProps = {
    children: undefined,
    href: '',
    classCondition: '',
    amp: false,
    video: ''
};

export default ComPicture;
