/* eslint-disable jsx-a11y/control-has-associated-label,jsx-a11y/label-has-associated-control,react/jsx-curly-newline */
import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
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

const Share = props => {
    const {
        requestUri,
        globalContent: {
            headlines: { basic: title, mobile: mobileTitle }
        }
    } = props;
    const { arcSite } = useFusionContext();
    const siteVars = getProperties(arcSite);
    const twiterTitle =
        mobileTitle !== '' && mobileTitle !== undefined ? mobileTitle : title;

    const facebookId = siteVars.shareConfig.facebook.appID;
    // TODO: arreglar el tema de las URL's

    return (
        <div id="v-share" className="com-share">
            <div className="share-left">
                <AmpContainer>
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
                </AmpContainer>
                <AmpContainer isForAmp>
                    <amp-social-share
                        type="facebook"
                        data-param-app_id={facebookId}
                    />
                    <amp-social-share type="twitter" />
                    <amp-social-share type="whatsapp" />
                </AmpContainer>
            </div>

            <div className="share-right">
                <AmpContainer>
                    <button
                        type="button"
                        className="icon-mail"
                        onClick={() =>
                            popUpCompartirMailTo(requestUri, config.host)
                        }
                    />
                </AmpContainer>
                <AmpContainer isForAmp>
                    <amp-social-share type="email" />
                </AmpContainer>
                <button type="button" className="icon-comment" />
                <label htmlFor="">145</label>
            </div>
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
