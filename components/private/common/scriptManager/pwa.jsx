/* eslint-disable react/no-danger */
import React from 'react';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';
import config from '../../../../properties/sites/la-nacion-ar';

class Pwa extends React.Component {
    constructor(props) {
        super(props);

        const { config, location = 'head' } = props;
        this.location = location;
        this.config = config;
    }

    render() {
        const { deployment, layout } = this.props;
        const { layoutsName } = getProperties('la-nacion-ar');

        if (layout !== layoutsName.Home) return <></>;

        const { firebase } = config;

        const script = `
            firebase.initializeApp({
                apiKey: "${firebase.apiKey}",
                authDomain: "${firebase.authDomain}",
                databaseURL: "${firebase.databaseURL}",
                projectId: "${firebase.projectId}",
                storageBucket: "${firebase.storageBucket}",
                messagingSenderId: "${firebase.messagingSenderId}"
              });
        `;

        return (
            <>
                <script
                    defer
                    src="https://www.gstatic.com/firebasejs/5.11.1/firebase-app.js"
                />
                <script
                    defer
                    src="https://www.gstatic.com/firebasejs/5.11.1/firebase-messaging.js"
                />
                {/* <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{ __html: script }}
                /> */}
                <script
                    defer
                    id="pwaScript"
                    deployment={deployment.value}
                    src={deployment(`/pf/resources/register.js`)}
                />
            </>
        );
    }
}

Pwa.propTypes = {
    deployment: PropTypes.func.isRequired,
    location: PropTypes.string,
    layout: PropTypes.string.isRequired
};

Pwa.defaultProps = {
    location: 'head'
};

export default Consumer(Pwa);
