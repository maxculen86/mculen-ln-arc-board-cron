/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';

export default class Microdata extends Component {
    render() {
        const script = `{
            "@context": "https://schema.org"
        }`;

        return (
            <script
                defer
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: script }}
            />
        );
    }
}
