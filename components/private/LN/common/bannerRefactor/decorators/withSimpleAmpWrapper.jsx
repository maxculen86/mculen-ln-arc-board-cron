/* eslint-disable react/jsx-props-no-spreading */
// TODO: deberia borrarse ya que se usa banner nuevo
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
            <div className="row">
                <div className="col-12">
                    <div className="--bg-banner">
                        <Component {...props} targeting={targeting} />
                    </div>
                </div>
            </div>
        );
    });
};
