/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import config from '../../../../properties/sites/la-nacion-ar';

export default class FacebookSDK extends Component {
    constructor(props) {
        super(props);

        const { config, location = 'head' } = props;

        this.location = location;
        this.config = config;
    }

    render() {
        const script = `
             window.fbAsyncInit = function () {
                FB.init({
                    appId: ${config.shareConfig.facebook.appID},
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v2.11'
                });
                FB.AppEvents.logPageView();
            };
        `;

        return (
            <>
                <script async defer src="//connect.facebook.net/en_US/sdk.js" />
                <script
                    defer
                    type="text/javascript"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
            </>
        );
    }
}
