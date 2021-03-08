import React, { Component } from 'react';
import { IS_DEV, IS_SANDBOX } from 'fusion:environment';

export default class PostBid extends Component {
    constructor(props) {
        super(props);

        const { config, location = 'head' } = props;

        this.location = location;
        this.config = config;
    }

    render() {
        const isTest =
            IS_DEV === 'true' && IS_SANDBOX === 'true' ? '_test' : '';

        return (
            <script
                defer
                src={`https://ads.rubiconproject.com/prebid/20148_LaNacion_Desktop${isTest}.js`}
            />
        );
    }
}
