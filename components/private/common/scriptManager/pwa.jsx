/* eslint-disable react/no-danger */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'prop-types';

class Pwa extends React.Component {
    constructor(props) {
        super(props);

        const { config, location = 'body-bottom' } = props;
        this.location = location;
        this.config = config;
    }

    render() {
        const { deployment } = this.props;

        /*
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
        */
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
    location: PropTypes.string
};

Pwa.defaultProps = {
    location: 'body-bottom'
};

export default Consumer(Pwa);
