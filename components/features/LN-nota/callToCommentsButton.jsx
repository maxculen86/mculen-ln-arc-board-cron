import React from 'react';
import { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import ModCallToComments from '../../private/common/mod-callToComments';

const CallToCommentsButton = ({ outputType }) => {
    const { globalContent } = useAppContext();
    const toUrl = `${SITE_LANACION}${globalContent.canonical_url}`;

    return (
        <ModCallToComments
            defaultLink={toUrl}
            commentsLink={`${toUrl}#comentarios`}
            outputType={outputType}
        />
    );
};

CallToCommentsButton.label = 'LN-Nota-ComentariosAncla';

CallToCommentsButton.propTypes = {
    outputType: PropTypes.string
};

export default Consumer(CallToCommentsButton);
