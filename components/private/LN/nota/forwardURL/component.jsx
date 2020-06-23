/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'fusion:prop-types';

const ForwardUrl = props => {
    const { url } = props;
    if (!url) return null;
    const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (!regExp.test(url)) return null;
    const script = `
        window.location.replace('${url}')
    `;
    return (
        <script
            async
            id="forward-url"
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: script }}
        />
    );
};

ForwardUrl.propTypes = {
    url: PropTypes.string.isRequired
};

export default ForwardUrl;
