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
            <script src="//swh.lanacion.com.ar/programmatic_ln/postbid_ln.js" />
        );
    }
}
