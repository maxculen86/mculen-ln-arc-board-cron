/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';

class LiftIgniter extends Component {
    constructor(props) {
        super(props);
        const { location = 'body-top' } = props;
        this.location = location;
    }

    render() {
        const {
            globalContent: {
                credits: { by: authors },
                taxonomy: { primary_section: primarySection, tags },
                label
            }
        } = this.props;
        const { name: tematica } = primarySection || {};

        let script = {
            noShow: true,
            noIndex: label.recomendar ? Boolean(label.recomendar.text) : true,
            tematica,
            tags: tags.map(tag => tag.text)
        };

        if (authors.length >= 1)
            script = {
                ...script,
                autor: authors.map(author => author.name).join('')
            };

        return (
            <script
                defer
                id="liftigniter-metadata"
                type="application/json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(script)
                }}
            />
        );
    }
}

LiftIgniter.propTypes = {
    location: PropTypes.string,
    name: PropTypes.string,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                name: PropTypes.string
            }),
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    description: PropTypes.string,
                    slug: PropTypes.string
                })
            )
        }),
        /* syndication: PropTypes.shape({
            external_distribution: PropTypes.bool,
            search: PropTypes.bool
        }), */
        label: PropTypes.shape({
            recomendar: PropTypes.shape({
                text: PropTypes.string
            })
        })
    })
};

export default LiftIgniter;
