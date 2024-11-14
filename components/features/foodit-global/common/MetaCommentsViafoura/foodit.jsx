import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_FOODIT } from 'fusion:environment';

export function BuildComments({
    _id,
    canonicalUrl,
    mobile,
    basic,
    layoutsName,
    layout,
    allowComments
}) {
    const layoutsWithComments = [
        layoutsName.FooditFichaReceta,
        layoutsName.FooditFichaNota
    ];

    if (!layoutsWithComments.includes(layout) || !allowComments) {
        return null;
    }

    const title = mobile || basic;

    return (
        <>
            <meta name="vf:container_id" content={_id} />
            <meta name="vf:lang" content="es" />
            <meta name="vf:url" content={`${SITE_FOODIT}${canonicalUrl}`} />
            <meta name="vf:title" content={title} />
        </>
    );
}

BuildComments.propTypes = {
    _id: PropTypes.string,
    canonicalUrl: PropTypes.string,
    mobile: PropTypes.string,
    basic: PropTypes.string,
    layoutsName: PropTypes.shape({
        FooditFichaReceta: PropTypes.string,
        FooditFichaNota: PropTypes.string
    }),
    layout: PropTypes.string,
    allowComments: PropTypes.bool.isRequired
};

BuildComments.defaultProps = {
    _id: '',
    canonicalUrl: '',
    mobile: '',
    basic: '',
    layoutsName: {
        FooditFichaReceta: '',
        FooditFichaNota: ''
    },
    layout: ''
};

export default BuildComments;
