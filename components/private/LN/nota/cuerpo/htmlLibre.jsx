/* eslint-disable react/no-danger */
import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

function HtmlLibre(props) {
    const {
        outputType,
        globalContent: { _id, content_elements: contentElements = [] } = {}
    } = props;

    const [defaultHTML = {}, bodyHTML = {}] = contentElements;

    const content =
        contentElements.length > 1 ? bodyHTML.content : defaultHTML.content;

    return (
        outputType === 'default' && (
            <Static id="LN-htmlLibre">
                <div
                    key={_id}
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                />
            </Static>
        )
    );
}

HtmlLibre.outputType = 'default';

export default Consumer(HtmlLibre);
