/* eslint-disable jsx-a11y/control-has-associated-label,jsx-a11y/label-has-associated-control,react/jsx-curly-newline */
import React from 'react';
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
    scrollToComments
} from '../common/utils/shareHelper';
import ComButton from '../../common/com-button';
import ComLine from '../../common/com-line';
import AmpContainer from '../../common/ampContainer';
import get from '../../common/utils/get';
import Icon from '../../common/icon';

const Share = props => {
    const {
        classCondition,
        classesNames,
        requestUri,
        globalContent: {
            _id: id,
            headlines: { basic: title, mobile: mobileTitle },
            comments: { display_comments: displayComments = true } = {}
        }
    } = props;
    const { comments } = {};
    // useContent({ source: 'viafouraSource', query: { id } }) || {};

    const { total_visible_content: totalVisibleContent } = comments || '';

    const { arcSite = 'la-nacion-ar' } = useAppContext() || {};
    const siteVars = getProperties(arcSite);
    const twiterTitle =
        mobileTitle !== '' && mobileTitle !== undefined ? mobileTitle : title;

    const facebookId = get(siteVars, 'shareConfig.facebook.appID', undefined);

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
                        <>
                            <ComButton
                                onClick={() => scrollToComments()}
                                size="--fourxs"
                                iconName="comment"
                                title="Ir a los comentarios de la nota"
                                classCondition="comment-btn"
                            />
                            <label className="counterComments --fourxs">
                                {totalVisibleContent}
                            </label>
                        </>
                    )}
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
