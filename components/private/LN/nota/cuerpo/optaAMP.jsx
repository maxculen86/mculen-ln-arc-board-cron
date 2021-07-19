import React from 'react';
import { OPTA_WIDGET_URL } from 'fusion:environment';
import Consumer from 'fusion:consumer';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import getAssetsPath from '../../../common/utils/getAssetsPath';

const hasOptaElements = content => content.includes('opta-widget');

const OptaAMP = props => {
    const { data, contextPath, deployment } = props;
    const { globalContent } = useAppContext();
    const { _id: idNote } = globalContent;
    const { content = null, width = '360', height = '300', _id: idRawHtml } =
        data || {};

    let urlForOpta = null;
    if (hasOptaElements(content)) {
        urlForOpta = `${OPTA_WIDGET_URL}/${idRawHtml}/${idNote}/?_website=la-nacion-ar&outputType=opta`;
    }

    const placeholder = getAssetsPath(contextPath)(deployment)(
        'placeholderLN.jpg'
    );

    return (
        <div className="com-embed --html">
            <amp-iframe
                width={width}
                height={height}
                sandbox="allow-scripts allow-same-origin"
                frameborder="0"
                layout="responsive"
                src={urlForOpta || content}
            >
                <amp-img layout="fixed" src={placeholder} placeholder />
            </amp-iframe>
        </div>
    );
};

OptaAMP.arcType = 'raw_html';
OptaAMP.outputType = 'opta';
OptaAMP.isStatic = true;
OptaAMP.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string
    }).isRequired,
    deployment: PropTypes.func.isRequired,
    contextPath: PropTypes.string.isRequired
};

export default Consumer(OptaAMP);
