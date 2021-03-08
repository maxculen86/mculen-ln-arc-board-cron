import React, { Component } from 'react';

export default class PostBid extends Component {
    constructor(props) {
        super(props);

        const { config, location = 'head' } = props;

        this.location = location;
        this.config = config;
    }

    render() {
        return (
            <script
                defer
                src="https://ads.rubiconproject.com/prebid/20148_LaNacion_Desktop_test.js"
            />
        );
    }
}
