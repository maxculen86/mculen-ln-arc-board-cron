import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import ComLink from '../../../private/common/com-link';
import get from '../../../private/common/utils/get';

const CommentsFeature = () => {
    const { globalContent } = useAppContext();
    const canonicalUrl = get(globalContent, 'canonical_url', '');

    const toUrl = `${SITE_LANACION}${canonicalUrl}`;

    return (
        (!!canonicalUrl && (
            <section className="mod-commentamp">
                <ComLink
                    textname="VER COMENTARIOS"
                    link={`${toUrl}#footer`}
                    classCondition="com-button --secondary"
                />
                <ComLink link={toUrl} textname="Ir a la nota original" />
            </section>
        )) ||
        null
    );
};

export default CommentsFeature;
