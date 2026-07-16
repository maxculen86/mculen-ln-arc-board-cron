/* eslint-disable react/no-danger */
import React from 'react';

function snippetRender({ data = {}, id = null }) {
    const stringData = JSON.stringify(data, null, 2);

    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: stringData }}
        />
    );
}

export default snippetRender;
