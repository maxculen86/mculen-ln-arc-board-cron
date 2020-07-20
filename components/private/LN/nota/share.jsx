/* eslint-disable jsx-a11y/control-has-associated-label,jsx-a11y/label-has-associated-control,react/jsx-curly-newline */
import React from 'react';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import '../../../../resources/dist/css/ln/components/share.css';
import config from '../../../../properties/sites/la-nacion-ar';
import {
    popUpCompartirNotaTW,
    popUpCompartirNotaFB,
    shareWhatsAppDesktop,
    popUpCompartirMailTo
} from '../common/utils/shareHelper';
import AmpContainer from '../../common/ampContainer';
import get from '../../common/utils/get';

const Share = props => {
    const {
        requestUri,
        globalContent: {
            headlines: { basic: title, mobile: mobileTitle }
        }
    } = props;
    const { arcSite } = useAppContext();
    const siteVars = getProperties(arcSite);
    const twiterTitle =
        mobileTitle !== '' && mobileTitle !== undefined ? mobileTitle : title;

    const facebookId = get(siteVars, 'shareConfig.facebook.appID', undefined);

    // TODO: arreglar el tema de las URL's
    return (
        <div id="v-share" className="com-share">
            <AmpContainer isForAmp={false}>
                <div className="share-left">
                    <button
                        type="button"
                        onClick={() =>
                            popUpCompartirNotaFB(requestUri, config.host, title)
                        }
                        className="icon-facebook"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            popUpCompartirNotaTW(
                                requestUri,
                                config.host,
                                twiterTitle
                            )
                        }
                        className="icon-twitter"
                    />
                    <button
                        type="button"
                        id="whatsAppShareDesktop"
                        onClick={() =>
                            shareWhatsAppDesktop(requestUri, config.host)
                        }
                        className="icon-whatsapp"
                    />
                </div>

                <div className="share-right">
                    <button
                        type="button"
                        className="icon-mail"
                        onClick={() =>
                            popUpCompartirMailTo(requestUri, config.host)
                        }
                    />
                    <button type="button" className="icon-comment" />
                    <label htmlFor="">145</label>
                </div>
            </AmpContainer>

            <AmpContainer isForAmp>
                <div className="share-left">
                    <amp-social-share
                        type="facebook"
                        data-param-app_id={facebookId}
                    />
                    <amp-social-share type="twitter" data-param-text={title} />
                    <amp-social-share type="whatsapp" />
                </div>

                <div className="share-right">
                    <amp-social-share
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
        })
    }).isRequired
};

// Share.defaultProps = {
//     requestUri: ''
// };

export default Share;
