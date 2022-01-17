/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import TePuedeInteresar from '../../../private/LN/nota/tePuedeInteresar';
import findTermica from '../../../private/common/utils/findTermica';
import config from '../../../../properties/sites/la-nacion-ar';
import getScrollPercent from '../../../private/LN/common/utils/getScrollPercent';

const tePuedeInteresar = props => {
    const showLiftigniter = findTermica('liftigniter');
    if (!showLiftigniter) return <></>;

    const {
        customFields: { cantidadNotas = 6 },
        outputType,
        siteProperties
    } = props;

    const { requestUri, globalContent = {}, arcSite, layout } = useAppContext();
    const { host = 'https://www.lanacion.com.ar' } = siteProperties;
    const { layoutsName = {} } = config;
    const url = `${host}${requestUri}`;
    const { _id } = globalContent;
    const [userId, setUserId] = useState();
    const [sessionId, setSessionId] = useState();
    const [excludeItems, setExcludeItems] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (localStorage) {
            const { urls, sid, uid } = getVariablesFromLocalStorage();
            const newUrlsToExclude = saveUrlToExclude(urls, url);
            setLocalStorage(newUrlsToExclude, sid);
            setSessionId(sid);
            if (uid !== 'N/A') setUserId(uid);
            setExcludeItems(urls);
        }
    }, [url]);

    useEffect(() => {
        const handleScrollForComments = () => {
            const scrollPercentRounded = getScrollPercent();
            if (!isReady && scrollPercentRounded > 60) {
                setIsReady(true);
                window.removeEventListener('scroll', handleScrollForComments);
            }
        };
        !isReady && window.addEventListener('scroll', handleScrollForComments);
        return () => {
            window.removeEventListener('scroll', handleScrollForComments);
        };
    }, [isReady]);

    // Se valida que el sessionId existe, porque en el 1er render viene nulo
    // y llama a la api de liftIgniter 2 veces (la 1ra sin los datos necesarios)
    // if (!sessionId) return <></>;

    return (
        isReady && (
            <TePuedeInteresar
                userId={userId}
                sessionId={sessionId}
                cantidadNotas={cantidadNotas}
                excludeItems={excludeItems}
                outputType={outputType}
                url={url}
                idArticle={_id}
                arcSite={arcSite}
                dataLayerSection={
                    layout === layoutsName.Home
                        ? 'TePuedeInteresarHome'
                        : 'TePuedeInteresar'
                }
            />
        )
    );
};

tePuedeInteresar.label = 'LN-Nota-tePuedeInteresar';

tePuedeInteresar.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({
            defaultValue: 6,
            min: 3,
            label: 'Cantidad de Notas'
        }).isRequired
    }).isRequired,
    outputType: PropTypes.string,
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    })
};

tePuedeInteresar.defaultProps = {
    outputType: 'default',
    siteProperties: {}
};

export default tePuedeInteresar;

const getVariablesFromLocalStorage = () => {
    const urls = JSON.parse(localStorage.getItem('excludeItems')) || [];
    const uid = localStorage.getItem('CDuserId') || 'N/A';
    const sid = localStorage.getItem('sessionId') || generateSessionId();

    return {
        urls,
        sid,
        uid
    };
};

const setLocalStorage = (urls, sessionId) => {
    try {
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('excludeItems', JSON.stringify(urls));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error en setear Local Storage method setLocalStorage');
    }
};

const generateSessionId = () => {
    const cryptoNumber = ([1e7] + -1e3 + -4e3 + -8e3).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );

    const uuid = `${cryptoNumber}-${Date.now()}`;

    return uuid;
};

const saveUrlToExclude = (urls, currentUrl) => {
    if (urls.includes(currentUrl)) return urls;
    if (urls && urls.length > 15) {
        urls.shift();
    }
    urls.push(currentUrl);
    return urls;
};
