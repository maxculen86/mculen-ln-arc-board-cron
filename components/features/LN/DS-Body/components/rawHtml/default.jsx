import React from 'react';
import RawHtml from '../../../common/rawHtml/default';
import { WrapperBody } from '../../../common/wrapperBody/default';

function RawHtmlWrapper(props) {
    const { data = {} } = props;
    const { content, _id: idMedia } = data;

    if (!content) return null;

    return (
        <WrapperBody className="mb-64">
            <RawHtml htmlData={content} idMedia={idMedia} />
        </WrapperBody>
    );
}

RawHtmlWrapper.arcType = 'raw_html';
RawHtmlWrapper.outputType = 'default';

export default RawHtmlWrapper;
