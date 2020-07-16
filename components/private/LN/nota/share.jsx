/* eslint-disable jsx-a11y/control-has-associated-label,jsx-a11y/label-has-associated-control,react/jsx-curly-newline */
import React from 'react';
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
    popUpCompartirMailTo
} from '../common/utils/shareHelper';
import ComButton from '../../common/com-button';
import ComLine from '../common/footer/com-line';

const Share = props => {
    const {
        classCondition,
        classesNames,
        requestUri,
        globalContent: {
            headlines: { basic: title, mobile: mobileTitle }
        }
    } = props;
    const twiterTitle =
        mobileTitle !== '' && mobileTitle !== undefined ? mobileTitle : title;

    // TODO: arreglar el tema de las URL's

    return (
        <div
            id="v-share"
            className={`mod-share ${classesNames ? classesNames : ``} ${
                classCondition ? classCondition : ``
            }`}
        >
            <div className="container --left">
                <ComButton
                    size="l"
                    iconName="facebook"
                    onClick={() =>
                        popUpCompartirNotaFB(requestUri, config.host, title)
                    }
                />
                <ComButton
                    size="l"
                    iconName="twitter"
                    onClick={() =>
                        popUpCompartirNotaTW(
                            requestUri,
                            config.host,
                            twiterTitle
                        )
                    }
                />
                <ComButton
                    iconName="whatsapp"
                    id="whatsAppShareDesktop"
                    size="l"
                    onClick={() =>
                        popUpCompartirNotaTW(
                            requestUri,
                            config.host,
                            twiterTitle
                        )
                    }
                />
            </div>

            <ComLine />

            <div className="container --right">
                <ComButton
                    size="l"
                    iconName="mail"
                    onClick={() =>
                        popUpCompartirMailTo(requestUri, config.host)
                    }
                />
                <ComButton size="l" iconName="comment">
                    <label htmlFor="">145</label>
                </ComButton>
            </div>

            {/* <div className="share-left">
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
            </div> */}
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
