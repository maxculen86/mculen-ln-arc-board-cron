import React from 'react';
import '../../../../assets/bundles/css/ln/components/share.css';
import config from '../../../../properties/sites/la-nacion-ar';
import {
    popUpCompartirNotaTW,
    popUpCompartirNotaFB,
    shareWhatsAppDesktop,
    popUpCompartirMailTo
} from '../common/utils/shareHelper';

const Share = props => {
    const {
        globalContent: {
            headlines: { basic: title },
            taxonomy: {
                primary_section: { _id }
            }
        }
    } = props;

    //TODO: arreglar el tema de las URL's

    return (
        <div className="com-share">
            <div className="share-left">
                <button
                    onClick={() =>
                        popUpCompartirNotaFB(
                            _id,
                            config.shareConfig.host,
                            title
                        )
                    }
                    className="icon-facebook"
                />
                <button
                    onClick={() =>
                        popUpCompartirNotaTW(
                            _id,
                            config.shareConfig.host,
                            title
                        )
                    }
                    className="icon-twitter"
                />
                <button
                    id="whatsAppShareDesktop"
                    onClick={() =>
                        shareWhatsAppDesktop(_id, config.shareConfig.host)
                    }
                    className="icon-whatsapp"
                />
            </div>

            <div className="share-right">
                <button
                    className="icon-mail"
                    onClick={() =>
                        popUpCompartirMailTo(_id, config.shareConfig.host)
                    }
                />
                <button className="icon-comment" />
                <label htmlFor="">145</label>
            </div>
        </div>
    );
};

export default Share;
