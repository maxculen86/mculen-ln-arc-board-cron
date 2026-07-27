import React, { useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import useTermica from '../../../private/common/hooks/useTermica';
import config from '../../../../properties/sites/la-nacion-ar';
import CajaTema from '../../../private/LN/common/cajaTema';
import useSetLocalStorage from './_hooks/useSetLocalStorage';
import useBuildMayInterest from './_hooks/useBuildMayInterest';
import { articleBoxesTracker } from '../../../private/common/utils/noteTracker/articleBoxesTracker';
import { replaceUrlsByEnvironment } from '../../../private/common/utils/replaceProductiveImgDomain';

function TePuedeInteresar(props) {
    const showLiftigniter = useTermica('liftigniter');
    if (!showLiftigniter) return null;
    const {
        customFields: { cantidadNotas = 6 } = {},
        outputType = 'default',
        siteProperties = {}
    } = props;

    const { requestUri, globalContent = {}, arcSite, layout } = useAppContext();
    const { host = 'https://www.lanacion.com.ar' } = siteProperties;
    const { layoutsName = {} } = config;
    const url = `${host}${requestUri}`;
    const { _id } = globalContent;
    const { userId, sessionId, excludeItems } = useSetLocalStorage(url);

    const { sectionReference, articles, isReady } = useBuildMayInterest({
        cantidadNotas,
        userId,
        sessionId,
        excludeItems,
        arcSite,
        url,
        idArticle: _id
    });

    const articleRefs = useRef([]);

    useEffect(() => {
        if (articles && articleRefs && articleRefs.current.length > 0) {
            articleBoxesTracker({
                boxType: 'tePuedeInteresar',
                articles: articleRefs.current
            });
        }
    }, [articles]);

    return (
        isReady &&
        articles &&
        articles.length > 0 && (
            <div
                className="row interest"
                ref={sectionReference}
                data-module="tema_tePuedeInteresar"
                data-vwo-hook="article-recommendations"
                data-vwo-candidate="ln-te-puede-interesar"
            >
                <CajaTema
                    title="Te puede interesar"
                    sectionName={
                        layout === layoutsName.Home
                            ? 'TePuedeInteresarHome'
                            : 'TePuedeInteresar'
                    }
                    articles={replaceUrlsByEnvironment(articles)}
                    position="toi"
                    outputType={outputType}
                    withVolanta
                    setRefs={articleRefs}
                />
            </div>
        )
    );
}

TePuedeInteresar.label = 'LN-Nota-tePuedeInteresar';

TePuedeInteresar.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({
            defaultValue: 6,
            min: 3,
            label: 'Cantidad de Notas'
        })
    }).isRequired
};

export default TePuedeInteresar;
