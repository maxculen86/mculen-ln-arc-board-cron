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
// import useListBookmarks from '../../common/hooks/bookmark/useListBookmarks';
import Barrier from '../../common/barrier/Barrier';

const Share = props => {
    const { arcSite = 'la-nacion-ar' } = useAppContext() || {};
    const { classCondition, classesNames, requestUri, globalContent } = props;
    const {
        _id: id,
        headlines: { basic: title, mobile: mobileTitle },
        comments: { display_comments: displayComments = true } = {},
        first_publish_date: firstPublishDate
    } = globalContent;

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
    const [barrier, setBarrier] = useState(false);
    const token = getToken();
    const suscription = token ? isSubscribed() : false;

    const checkBookmarkId = useCheckBookmark(termicaBookmark, token, id);

    // console.log('🚀 ~ file: share.jsx ~ line 54 ~ bookmark', bookmark);
    // console.log('🚀 ~ file: share.jsx ~ line 55 ~ toast', toast);
    // console.log(
    //     '🚀 ~ file: share.jsx ~ line 59 ~ checkBookmarkId',
    //     checkBookmarkId
    // );

    // const { bookmarks, morePages, getNextPage } = useListBookmarks(
    //     termicaBookmark,
    //     getToken()
    // );
    // console.log('🚀 ~ file: share.jsx ~ line 59 ~ morePages', morePages);
    // console.log('🚀 ~ file: share.jsx ~ line 58 ~ listOfBookmarks', bookmarks);

    console.count('🚀 ~ file: share.jsx ~ line 79 ~~ RENDER Nº');

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

    const handleBookmarkTimeout = () => {
        setToast(false);
    };

    const handleCloseBarrier = () => {
        setBarrier(false);
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
        <div
            id="v-share"
            className={`mod-share ${classesNames} ${classCondition}`}
        >
            {termicaBookmark && toast && (
                <Toast data={toast} handleTimeout={handleBookmarkTimeout} />
            )}

            {termicaBookmark && barrier && (
                <Barrier
                    show
                    handleBarrier={handleCloseBarrier}
                    type="exclusive-ln"
                    isLogged={token}
                    noteId={id}
                />
            )}

            <AmpContainer isForAmp={false}>
                <div className="container --left">
                    {termicaBookmark && (
                        <ComButton
                            id="btnbookmark"
                            dataEvent="LinkClick"
                            dataSection="Guardar Nota"
                            onClick={onButtonClicked}
                            size="--fourxs"
                            iconName={bookmark ? 'bookmark-filled' : 'bookmark'}
                            title="Notas guardadas"
                            classCondition={`bookmark ${
                                bookmark ? '--is-saved' : ''
                            }`}
                        />
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
                    <ComButton
                        dataEvent="LinkClick"
                        dataSection="CompartirNotaLN"
                        iconName="copy"
                        title="Copiar link de la nota"
                        id="copyLinkNote"
                        onClick={() => copyToClipboard()}
                    />
                    <ComButton
                        id="btnfacebook"
                        dataEvent="LinkClick"
                        dataSection="CompartirNotaLN"
                        iconName="facebook"
                        title="Compartir la nota en Facebook"
                        onClick={() =>
                            popUpCompartirNotaFB(requestUri, config.host, title)
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
    );
};

Share.propTypes = {
    requestUri: PropTypes.string.isRequired,
    classesNames: PropTypes.string,
    classCondition: PropTypes.string,
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

Share.defaultProps = {
    classesNames: '',
    classCondition: ''
};

export default Share;
