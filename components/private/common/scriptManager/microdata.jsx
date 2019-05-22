/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';

export default class Microdata extends Component {
    constructor(props) {
        super(props);

        const { config, location = 'head' } = props;

        this.location = location;
        this.config = config;
    }

    render() {
        const script = `{
            "@context": "https://schema.org"
        }`;

        return (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: script }}
            />
        );
    }
}

Microdata.static = true;
