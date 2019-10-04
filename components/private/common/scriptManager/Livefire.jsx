import React, { Component } from 'react';

export default class Livefyre extends Component {
    constructor(props) {
        super(props);

        const { config, location = 'head' } = props;

        this.location = location;
        this.config = config;
    }

    render() {
        return (
            <script async defer src="https://cdn.livefyre.com/Livefyre.js" />
        );
    }
}
