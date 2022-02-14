import React from 'react';
import PropTypes from 'prop-types';
import { SITE_LANACION } from 'fusion:environment';
import get from './utils/get';
import { allowComments } from './utils/commentsHelper';
import findTermica from './utils/findTermica';

const MetaViafoura = props => {
    const { globalContent = {} } = props;
    const { canonical_url: canonicalUrl = '' } = globalContent;
    const allow = Boolean(allowComments(props) && findTermica('livefyre'));
    return (
        (allow && (
            <>
                <meta
                    name="vf:container_id"
                    content={get(props, 'globalContent._id', null)}
                />
                <meta name="vf:lang" content="es" />
                <meta
                    name="vf:url"
                    content={`${SITE_LANACION}${canonicalUrl}`}
                />
            </>
        )) || <></>
    );
};

MetaViafoura.propTypes = {
    globalThis: PropTypes.shape({
        _id: PropTypes.string,
        type: PropTypes.string
    }).isRequired
};

export default MetaViafoura;
