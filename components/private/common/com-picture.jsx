import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const trim = string => {
    return string.replace(/\s{2,}/g, ' ');
};

const ComPicture = props => {
    const { href, classCondition, children, video, amp } = props;
    const className = trim(`mod-picture ${video} ${classCondition}`);
    const picture = amp ? (
        <div className={className}>{children}</div>
    ) : (
        <picture className={className}>{children}</picture>
    );

    return <>{href ? <a href={href}>{picture}</a> : picture}</>;
};

ComPicture.propTypes = {
    children: PropTypes.elementType.isRequired,
    href: PropTypes.string,
    classCondition: PropTypes.string,
    amp: PropTypes.string,
    video: PropTypes.string
};

ComPicture.defaultProps = {
    href: '',
    classCondition: '',
    amp: '',
    video: ''
};

export default ComPicture;
