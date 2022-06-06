/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/control-has-associated-label,jsx-a11y/label-has-associated-control,react/jsx-curly-newline */
import React, { useEffect, useState } from 'react';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/modules/mod-share.css';
import config from '../../../../properties/sites/la-nacion-ar';
import {
    popUpCompartirNotaTW,
    popUpCompartirNotaFB,
    shareWhatsAppDesktop,
    popUpCompartirMailTo,
    scrollToComments,
    copyToClipboard
} from '../common/utils/shareHelper';
import ComButton from '../../common/com-button';
import ComLine from '../../common/com-line';
import AmpContainer from '../../common/ampContainer';
import get from '../../common/utils/get';
import Icon from '../../common/icon';
import { conditionallyCallViafoura } from '../../common/utils/commentsHelper';
import findTermica from '../../common/utils/findTermica';
import getToken from '../../common/utils/getToken';
import Toast from '../../common/toast/Toast';
import { isSubscribed } from '../common/utils/contextHelper';
import toggleBookmark from '../../common/utils/bookmarkHelper';
import useCheckBookmark from '../../common/hooks/bookmark/useCheckBookmark';
import { getViewport } from '../common/utils/homeHelper';
import Barrier from '../../common/barrier/Barrier';
import ModTooltip from '../../common/mod-tooltip';

const Share = props => {
    const { arcSite = 'la-nacion-ar' } = useAppContext() || {};
    const { requestUri, globalContent } = props;
    const {
        _id: id,
        headlines: { basic: title, mobile: mobileTitle },
        comments: { display_comments: displayComments = true } = {},
        first_publish_date: firstPublishDate,
        subtype
    } = globalContent;

    const classCondition = subtype === '5' ? ' --video' : '';

    const { totalVisibleContent = '' } =
        useContent({
            source: conditionallyCallViafoura(firstPublishDate),
            query: { arcSite, id, firstPublishDate }
        }) || {};

    const siteVars = getProperties(arcSite);
    const twiterTitle =
        mobileTitle !== '' && mobileTitle !== undefined ? mobileTitle : title;

    const facebookId = get(siteVars, 'shareConfig.facebook.appID', undefined);

    const termicaBookmark = findTermica('bookmark_web');
    const [bookmark, setBookmark] = useState(false);
    const [toast, setToast] = useState(false);
    const [copy, setCopy] = useState(false);
    const [barrier, setBarrier] = useState(false);
    const token = getToken();
    const { isMobile } = getViewport();
    const suscription = token ? isSubscribed() : false;

    const checkBookmarkId = useCheckBookmark(
        termicaBookmark,
        token,
        id,
        suscription
    );

    const onButtonClicked = () => {
        if (token && suscription && !toast) {
            toggleBookmark(
                token,
                globalContent,
                bookmark,
                setBookmark,
                setToast
            );
        } else if (!suscription && !toast) {
            setBarrier(true);
        }
    };

    useEffect(() => {
        termicaBookmark && setBookmark(checkBookmarkId);
    }, [termicaBookmark, checkBookmarkId]);

    // TODO: arreglar el tema de las URL's
    const mystyle = {
        maxWidth: '32px',
        maxHeight: '32px'
    };

    return (
        <div className={`mod-share${classCondition}`}>
            {termicaBookmark && toast.status && isMobile && (
                <Toast data={toast} handleTimeout={() => setToast(false)} />
            )}

            {termicaBookmark && barrier && (
                <Barrier
                    type="exclusive-ln"
                    handleBarrier={() => setBarrier(false)}
                    isLogged={!!token}
                    redirectCallback={
                        typeof window !== 'undefined'
                            ? window.btoa(location.href)
                            : ''
                    }
                />
            )}
            <div id="v-share" className="share">
                <AmpContainer isForAmp={false}>
                    <div className="container --left">
                        {termicaBookmark && (
                            <div className="btn-container">
                                <ComButton
                                    id="btnbookmark"
                                    dataEvent="LinkClick"
                                    dataSection="Guardar Nota"
                                    onClick={onButtonClicked}
                                    size="--fourxs"
                                    iconName={
                                        bookmark
                                            ? 'bookmark-filled'
                                            : 'bookmark'
                                    }
                                    title="Notas guardadas"
                                    classCondition={`bookmark ${
                                        bookmark ? '--is-saved' : ''
                                    }`}
                                />
                                {!isMobile && toast.status === 'success' && (
                                    <ModTooltip
                                        label={
                                            bookmark ? 'Guardado' : 'Borrado'
                                        }
                                        handleTimeout={() => setToast(false)}
                                    />
                                )}
                            </div>
                        )}

                        {displayComments && (
                            <>
                                <ComButton
                                    id="btncomments"
                                    dataEvent="LinkClick"
                                    dataSection="CompartirNotaLN"
                                    onClick={() => scrollToComments()}
                                    size="--fivexs"
                                    iconName="chat"
                                    title="Ir a los comentarios de la nota"
                                    classCondition="comment-btn"
                                    textname={`${totalVisibleContent}`}
                                />
                            </>
                        )}
                    </div>

                    <ComLine />

                    <div className="container --right">
                        <ComButton
                            dataEvent="LinkClick"
                            dataSection="CompartirNotaLN"
                            iconName="whatsapp"
                            title="Compartir la nota en WhatsApp"
                            id="whatsAppShareDesktop"
                            onClick={() =>
                                shareWhatsAppDesktop(requestUri, config.host)
                            }
                        />
                        {/* Boton para copiar Link de la nota a compartir */}
                        <div className="btn-container">
                            <ComButton
                                dataEvent="LinkClick"
                                dataSection="CompartirNotaLN"
                                iconName="copy"
                                title="Copiar link de la nota"
                                id="copyLinkNote"
                                onClick={() => {
                                    copyToClipboard();
                                    setCopy(true);
                                }}
                            />
                            {copy && (
                                <ModTooltip
                                    className="copy"
                                    label="Copiado"
                                    handleTimeout={() => setCopy(false)}
                                />
                            )}
                        </div>
                        <ComButton
                            id="btnfacebook"
                            dataEvent="LinkClick"
                            dataSection="CompartirNotaLN"
                            iconName="facebook"
                            title="Compartir la nota en Facebook"
                            onClick={() =>
                                popUpCompartirNotaFB(
                                    requestUri,
                                    config.host,
                                    title
                                )
                            }
                        />
                        <ComButton
                            id="btntwitter"
                            dataEvent="LinkClick"
                            dataSection="CompartirNotaLN"
                            iconName="twitter"
                            title="Compartir la nota en Twitter"
                            onClick={() =>
                                popUpCompartirNotaTW(
                                    requestUri,
                                    config.host,
                                    twiterTitle
                                )
                            }
                        />
                        <ComButton
                            id="btnemail"
                            dataEvent="LinkClick"
                            dataSection="CompartirNotaLN"
                            iconName="email"
                            title="Compartir la nota por E-mail"
                            onClick={() =>
                                popUpCompartirMailTo(requestUri, config.host)
                            }
                        />
                    </div>
                </AmpContainer>

                <AmpContainer isForAmp>
                    <div className="container --left">
                        <amp-social-share
                            style={mystyle}
                            type="facebook"
                            data-param-app_id={facebookId}
                        >
                            <Icon name="facebook-filled" />
                        </amp-social-share>

                        <amp-social-share
                            style={mystyle}
                            type="twitter"
                            data-param-text={title}
                        >
                            <Icon name="twitter-filled" />
                        </amp-social-share>

                        <amp-social-share style={mystyle} type="whatsapp">
                            <Icon name="whatsapp-filled" />
                        </amp-social-share>
                    </div>

                    <ComLine />

                    <div className="container --right">
                        <amp-social-share
                            style={mystyle}
                            type="email"
                            data-param-subject="Te recomiendo esta nota de LA NACION"
                            data-param-body={`Lee esta nota de LA NACION ${config.host}${requestUri}`}
                        >
                            <Icon name="email" />
                        </amp-social-share>
                    </div>
                </AmpContainer>
            </div>
        </div>
    );
};

Share.propTypes = {
    requestUri: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        subtype: PropTypes.string,
        first_publish_date: PropTypes.string,
        headlines: PropTypes.shape({
            basic: PropTypes.string,
            mobile: PropTypes.string
        }),
        comments: PropTypes.shape({
            display_comments: PropTypes.bool
        })
    }).isRequired
};

export default Share;
