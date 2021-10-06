import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import React from 'react';
import { shouldLoadViafouraSSR } from '../../../private/common/utils/commentsHelper';

const CommentsViafouraFeature = props => {
    const { id: featureId, outputType } = props;
    const loadViafoura = shouldLoadViafouraSSR(props);

    return (
        ((outputType === 'widgets' || loadViafoura) && (
            <Static id={featureId}>
                <div className="viafoura">
                    <vf-conversations />
                </div>
            </Static>
        )) || <></>
    );
};

CommentsViafouraFeature.propTypes = {
    id: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        first_publish_date: PropTypes.string
    }).isRequired
};

CommentsViafouraFeature.static = true;
CommentsViafouraFeature.label = 'LN-Nota-Comments-Viafoura';

export default Consumer(CommentsViafouraFeature);
