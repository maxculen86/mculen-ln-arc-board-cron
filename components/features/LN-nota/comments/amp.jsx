import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import ComLink from '../../../private/common/com-link';

const CommentsFeature = () => {
    const { globalContent } = useAppContext();
    const toUrl = `${SITE_LANACION}${globalContent.canonical_url}`;

    return (
        (toUrl && (
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

CommentsFeature.label = 'LN-Nota-Comments';

export default CommentsFeature;
