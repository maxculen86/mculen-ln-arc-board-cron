/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { getClassCondition } from '../../../private/LN/common/utils/shareHelper';
import Icon from '../../../private/common/icon';
import config from '../../../../properties/sites/la-nacion-ar';
import get from '../../../private/common/utils/get';

const Share = () => {
    const {
        arcSite = 'la-nacion-ar',
        globalContent: { headlines: { basic: title }, subtype } = {},
        requestUri
    } = useAppContext() || {};
    const siteVars = getProperties(arcSite);
    const facebookId = get(siteVars, 'shareConfig.facebook.appID', undefined);
    const classCondition = getClassCondition(subtype);

    const mystyle = {
        maxWidth: '32px',
        maxHeight: '32px'
    };

    return (
        <div className={`mod-share${classCondition}`}>
            <div id="v-share" className="share">
                <div className="container">
                    <amp-social-share
                        style={mystyle}
                        type="facebook"
                        data-param-app_id={facebookId}
                    >
                        <Icon name="facebook" />
                    </amp-social-share>

                    <amp-social-share
                        style={mystyle}
                        type="twitter"
                        data-param-text={title}
                    >
                        <Icon name="twitter" />
                    </amp-social-share>

                    <amp-social-share style={mystyle} type="whatsapp">
                        <Icon name="whatsapp" />
                    </amp-social-share>

                    <amp-social-share
                        style={mystyle}
                        type="email"
                        data-param-subject="Te recomiendo esta nota de LA NACION"
                        data-param-body={`Lee esta nota de LA NACION ${config.host}${requestUri}`}
                    >
                        <Icon name="email" />
                    </amp-social-share>
                </div>
            </div>
        </div>
    );
};

Share.label = 'LN-Nota-Share';

Share.propTypes = {
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
    })
};

export default Share;
