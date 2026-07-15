import React from 'react';
import RawHtml from '../../../common/rawHtml/default';

function RawHtmlWrapper(props) {
    return <RawHtml {...props} />;
}

RawHtmlWrapper.arcType = 'raw_html';
RawHtmlWrapper.outputType = 'default';

export default RawHtmlWrapper;
