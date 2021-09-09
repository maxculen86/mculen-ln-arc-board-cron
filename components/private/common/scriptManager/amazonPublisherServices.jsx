/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

function AmazonPublisherServices({ location = 'head' }) {
    const script = `
    //load the apstag.js library
    !(function(a9, a, p, s, t, A, g) {
        if (a[a9]) return;
        function q(c, r) {
            a[a9]._Q.push([c, r]);
        }
        a[a9] = {
            init: function() {
                q('i', arguments);
            },
            fetchBids: function() {
                q('f', arguments);
            },
            setDisplayBids: function() {},
            targetingKeys: function() {
                return [];
            },
            _Q: []
        };
        A = p.createElement(s);
        A.async = !0;
        A.src = t;
        g = p.getElementsByTagName(s)[0];
        g.parentNode.insertBefore(A, g);
    })(
        'apstag',
        window,
        document,
        'script',
        '//c.amazon-adsystem.com/aax2/apstag.js'
    );

    // initialize the apstag.js library on the page to allow bidding
    console.log('🚀 ::: start Amazon Pubisher Services ::: 🚀');
    apstag.init({
        pubID: '8670178e-76cd-476d-9c5f-0ed20920dd2a', // enter your pub ID here as shown above, it must within quotes
        adServer: 'googletag'
    });`;

    return (
        location === 'head' && (
            <>
                <script
                    async
                    type="text/javascript"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
            </>
        )
    );
}

AmazonPublisherServices.propTypes = { location: PropTypes.string.isRequired };

export default AmazonPublisherServices;
