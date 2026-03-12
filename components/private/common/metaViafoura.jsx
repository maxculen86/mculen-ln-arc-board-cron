import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import get from './utils/get';
import { allowComments } from './utils/commentsHelper';
import useTermica from './hooks/useTermica';

function MetaViafoura(props) {
    const { globalContent = {} } = props;
    const { canonical_url: canonicalUrl = '' } = globalContent;
    const allow = useTermica('livefyre') && allowComments(props);

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
        )) ||
        null
    );
}

export default MetaViafoura;
