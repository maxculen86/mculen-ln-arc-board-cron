import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import ComLink from '../../private/common/com-link';

const CallToCommentsButton = ({ outputType }) => {
    const { globalContent } = useAppContext();
    const toUrl = `${SITE_LANACION}${globalContent.canonical_url}`;

    return (
        (toUrl && outputType === 'amp' && (
            <section className="mod-commentamp">
                <ComLink
                    textname="VER COMENTARIOS"
                    link={`${toUrl}#comentarios`}
                />
                <ComLink link={toUrl} textname="Ir a la nota original" />
            </section>
        )) ||
        null
    );
};

CallToCommentsButton.label = 'LN-Nota-ComentariosAncla';

CallToCommentsButton.propTypes = {
    outputType: PropTypes.string
};

export default Consumer(CallToCommentsButton);
