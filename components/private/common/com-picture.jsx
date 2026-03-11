import React from 'react';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const trim = (string = '') => string.replace(/\s{2,}/g, ' ');

function ComPicture({ href = '', classCondition = '', children, video = '' }) {
    const className = trim(`placeholder ${video} ${classCondition}`);
    const picture = <div className={className}>{children}</div>;

    if (href) {
        return <a href={href}>{picture}</a>;
    }

    return picture;
}

export default ComPicture;
