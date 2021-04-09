/* eslint-disable jsx-a11y/control-has-associated-label,jsx-a11y/label-has-associated-control,react/jsx-curly-newline */
import React from 'react';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
//import '../../../../resources/dist/css/ln/components/share.css';
import ComIcon from '../../common/com-icon';
import ComLink from '../../common/com-link';
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
import ComLine from '../common/footer/com-line';
import AmpContainer from '../../common/ampContainer';
import get from '../../common/utils/get';
import useComments from '../../common/hooks/useComments';

const Share = props => {
    const {
        classCondition,
        classesNames,
        requestUri,
        globalContent: {
            headlines: { basic: title, mobile: mobileTitle },
            comments: { display_comments: displayComments } = {}
        }
    } = props;
    const { arcSite } = useAppContext();
    const siteVars = getProperties(arcSite);
    const twiterTitle =
        mobileTitle !== '' && mobileTitle !== undefined ? mobileTitle : title;

    const facebookId = get(siteVars, 'shareConfig.facebook.appID', undefined);

    const { commentsCount } = useComments();

    // TODO: arreglar el tema de las URL's
    const mystyle = {
        maxWidth: '32px',
        maxHeight: '32px'
    };
    return (
        <div
            id="v-share"
            className={`mod-share ${classesNames ? classesNames : ``} ${
                classCondition ? classCondition : ``
            }`}
        >
            <AmpContainer isForAmp={false}>
                <div className="container --left">
                    <ComButton
                        iconName="facebook-filled"
                        onClick={() =>
                            popUpCompartirNotaFB(requestUri, config.host, title)
                        }
                    />
                    <ComButton
                        iconName="twitter-filled"
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
                        onClick={() =>
                            popUpCompartirMailTo(requestUri, config.host)
                        }
                    />
                    {/* Se oculta temporalmente para luego refactorizar/*}
                    {/* {displayComments && (
                        <ComButton
                            onClick={() => scrollToComments()}
                            size="--fourxs"
                            iconName="comment"
                        >
                            <label htmlFor="">{commentsCount}</label>
                        </ComButton>
                    )} */}
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
    globalContent: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string,
            mobile: PropTypes.string
        }),
        comments: PropTypes.shape({
            display_comments: PropTypes.bool
        })
    }).isRequired
};

// Share.defaultProps = {
//     requestUri: ''
// };

export default Share;
