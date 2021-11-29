import React from 'react';
import PropTypes from 'fusion:prop-types';
import isOnlyIframeWithPym from '../../../common/utils/isOnlyIframeWithPym';

const formatContent = content => {
    const DOMElement = content.match(/src="(.*?)"/g);

    return DOMElement
        ? DOMElement.map(x => x.replace(/src=/g, '').replace(/\"/g, '')).join()
        : content;
};

const HtmlAMP = props => {
    const { data = '' } = props;
    const { content = null, width = '300', height = '400' } = data;

    if (!content || !isOnlyIframeWithPym(content)) return <></>;

    const contentSrc = formatContent(content);

    return (
        <div className="com-embed --html">
            <amp-iframe
                width={width}
                height={height}
                sandbox="allow-scripts allow-same-origin"
                layout="responsive"
                src={contentSrc}
            >
                <amp-img
                    layout="fill"
                    src={contentSrc}
                    placeholder="placeholder"
                />
            </amp-iframe>
        </div>
    );
};

HtmlAMP.arcType = 'raw_html';
HtmlAMP.outputType = 'amp';
HtmlAMP.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string
    })
};

HtmlAMP.defaultProps = {
    data: {
        _id: '',
        content: ''
    }
};

export default HtmlAMP;
