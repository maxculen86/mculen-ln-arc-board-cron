/* eslint-disable jsx-a11y/control-has-associated-label,jsx-a11y/label-has-associated-control,react/jsx-curly-newline */
import React from 'react';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/modules/mod-share.css';
import config from '../../../../properties/sites/la-nacion-ar';
import {
    popUpCompartirNotaTW,
    popUpCompartirNotaFB,
    shareWhatsAppDesktop,
    popUpCompartirMailTo,
    scrollToComments
} from '../common/utils/shareHelper';
import ComButton from '../../common/com-button';
import ComLine from '../../common/com-line';
import AmpContainer from '../../common/ampContainer';
import get from '../../common/utils/get';
import { shouldLoadViafoura } from '../../common/utils/commentsHelper';

const Share = props => {
    const {
        classCondition,
        classesNames,
        requestUri,
        globalContent: {
            headlines: { basic: title, mobile: mobileTitle },
            comments: { display_comments: displayComments } = {},
            _id: articleId,
            subtype,
            first_publish_date: firstPublishDate
        }
    } = props;

    const { arcSite = 'la-nacion-ar' } = useAppContext() || {};
    const siteVars = getProperties(arcSite);
    const twiterTitle =
        mobileTitle !== '' && mobileTitle !== undefined ? mobileTitle : title;

    const facebookId = get(siteVars, 'shareConfig.facebook.appID', undefined);

    const livefyreSiteId = get(
        siteVars,
        `livefyre.${Number(subtype) === 7 ? 'recetas.siteId' : 'siteId'}`,
        undefined
    );

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
            <AmpContainer isForAmp={false}>
                <div className="container --left">
                    <ComButton
                        iconName="facebook-filled"
                        title="Compartir la nota en Facebook"
                        onClick={() =>
                            popUpCompartirNotaFB(requestUri, config.host, title)
                        }
                    />
                    <ComButton
                        iconName="twitter-filled"
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
                        iconName="whatsapp-filled"
                        title="Compartir la nota en WhatsApp"
                        id="whatsAppShareDesktop"
                        onClick={() =>
                            shareWhatsAppDesktop(requestUri, config.host)
                        }
                    />
                </div>

                <ComLine />

                <div className="container --right">
                    <ComButton
                        iconName="email"
                        title="Compartir la nota por E-mail"
                        onClick={() =>
                            popUpCompartirMailTo(requestUri, config.host)
                        }
                    />
                    {/* Se oculta temporalmente para luego refactorizar */}
                    {displayComments && (
                        <ComButton
                            onClick={() => scrollToComments()}
                            size="--fourxs"
                            iconName="comment"
                            title="Ir a los comentarios de la nota"
                        >
                            {!shouldLoadViafoura(firstPublishDate) && (
                                <label
                                    id="livefyre-commentcount"
                                    className="livefyre-commentcount"
                                    data-lf-site-id={livefyreSiteId}
                                    data-lf-article-id={articleId}
                                >
                                    {/* Se necesita tener un número dentro del
                                elemento html para poder reemplazarlo al hacer la
                                consulta desde la cdn del contador de comentarios de 
                                Livefyre */}
                                    0
                                </label>
                            )}
                        </ComButton>
                    )}
                </div>
            </AmpContainer>

            <AmpContainer isForAmp>
                <div className="container --left">
                    <amp-social-share
                        style={mystyle}
                        type="facebook"
                        data-param-app_id={facebookId}
                    />
                    <amp-social-share
                        style={mystyle}
                        type="twitter"
                        data-param-text={title}
                    />
                    <amp-social-share style={mystyle} type="whatsapp" />
                </div>

                <ComLine />

                <div className="container --right">
                    <amp-social-share
                        style={mystyle}
                        type="email"
                        data-param-subject="Te recomiendo esta nota de LA NACION"
                        data-param-body={`Lee esta nota de LA NACION ${config.host}${requestUri}`}
                    />
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
