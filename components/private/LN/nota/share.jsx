/* eslint-disable jsx-a11y/control-has-associated-label,jsx-a11y/label-has-associated-control,react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../resources/dist/css/ln/components/share.css';
import config from '../../../../properties/sites/la-nacion-ar';
import {
    popUpCompartirNotaTW,
    popUpCompartirNotaFB,
    shareWhatsAppDesktop,
    popUpCompartirMailTo
} from '../common/utils/shareHelper';

const Share = props => {
    const {
        requestUri,
        globalContent: {
            headlines: { basic: title }
        }
    } = props;

    // TODO: arreglar el tema de las URL's

    return (
        <div id="v-share" className="com-share">
            <div className="share-left">
                <button
                    type="button"
                    onClick={() =>
                        popUpCompartirNotaFB(
                            requestUri,
                            config.shareConfig.host,
                            title
                        )
                    }
                    className="icon-facebook"
                />
                <button
                    type="button"
                    onClick={() =>
                        popUpCompartirNotaTW(
                            requestUri,
                            config.shareConfig.host,
                            title
                        )
                    }
                    className="icon-twitter"
                />
                <button
                    type="button"
                    id="whatsAppShareDesktop"
                    onClick={() =>
                        shareWhatsAppDesktop(
                            requestUri,
                            config.shareConfig.host
                        )
                    }
                    className="icon-whatsapp"
                />
            </div>

            <div className="share-right">
                <button
                    type="button"
                    className="icon-mail"
                    onClick={() =>
                        popUpCompartirMailTo(
                            requestUri,
                            config.shareConfig.host
                        )
                    }
                />
                <button type="button" className="icon-comment" />
                <label htmlFor="">145</label>
            </div>
        </div>
    );
};

Share.propTypes = {
    requestUri: PropTypes.string,
    globalContent: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        })
    }).isRequired
};

Share.defaultProps = {
    requestUri: ''
};

export default Share;
