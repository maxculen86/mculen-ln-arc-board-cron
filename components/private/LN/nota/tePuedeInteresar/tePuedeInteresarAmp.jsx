import React from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'fusion:prop-types';
import CajaTema from '../../common/cajaTema';

const TePuedeInteresarAmp = props => {
    const {
        userId,
        sessionId,
        cantidadNotas,
        excludeItems,
        outputType,
        url,
        idArticle,
        arcSite,
        dataLayerSection
    } = props;

    const articles = useContent({
        source: 'liftigniterSource',
        query: {
            cantidadNotas,
            referrer: url,
            imageConfig: 'm',
            idArticle,
            userId,
            sessionId,
            excludeItems,
            arcSite,
            action: 'model'
        }
    });

    return (
        articles &&
        articles.length > 0 && (
            <div className="row interest">
                <CajaTema
                    title="Te puede interesar"
                    sectionName={dataLayerSection}
                    articles={articles}
                    position="toi"
                    outputType={outputType}
                    handleClick={null}
                    withVolanta
                />
            </div>
        )
    );
};

TePuedeInteresarAmp.propTypes = {
    outputType: PropTypes.string.isRequired
};

export default TePuedeInteresarAmp;
