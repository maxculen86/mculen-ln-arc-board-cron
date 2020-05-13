/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFusionContext } from 'fusion:context';

import { getTargetingFormat } from './utils';

export default Component => {
    return React.memo(props => {
        const fusionContext = useFusionContext();

        const {
            globalContent: { taxonomy },
            outputType
        } = fusionContext;

        const { sections, tags } = taxonomy || {
            sections: [],
            tags: []
        };

        const targeting = getTargetingFormat(sections)(tags);

        if (outputType !== 'amp') return null;
        return (
            <div className="row sticky-amp">
                <div className="col-12">
                    <div className="--bg-banner hlp-desksm-none">
                        <amp-sticky-ad layout="nodisplay">
                            <Component {...props} targeting={targeting} />
                        </amp-sticky-ad>
                    </div>
                </div>
            </div>
        );
    });
};
