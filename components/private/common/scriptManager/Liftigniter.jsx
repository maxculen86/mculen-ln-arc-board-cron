/* eslint-disable class-methods-use-this      */
/* eslint-disable react/require-default-props */

import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';

class LiftIgniter extends Component {
    constructor(props) {
        super(props);
        const { location = 'body-top' } = props;
        this.location = location;
    }

    getAuthorsFromContentElements(object) {
        return object
            .filter(
                contentElement =>
                    contentElement.additional_properties.nodeType === 'firma'
            )
            .map(author => author.content)
            .join('');
    }

    getAuthors(object) {
        return object.map(author => author.name).join('');
    }

    render() {
        const {
            globalContent: {
                taxonomy: { primary_section: primarySection, tags },
                label
            }
        } = this.props;
        const { name: tematica } = primarySection || {};
        const {
            globalContent: { content_elements: contentElements }
        } = this.props || [];
        const {
            globalContent: { credits }
        } = this.props || { credits: { by: [] } };
        const { by: authors } = credits;

        const script = {
            noShow: true,
            noIndex: label.recomendar ? Boolean(label.recomendar.text) : true,
            tematica,
            tags: tags.map(tag => tag.text),
            autor:
                authors && authors.length > 0
                    ? this.getAuthors(authors)
                    : this.getAuthorsFromContentElements(contentElements)
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
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                type: PropTypes.string,
                additional_properties: PropTypes.shape({
                    nodeType: PropTypes.string
                }),
                content: PropTypes.string
            })
        ),
        credits: PropTypes.shape({
            by: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string
                })
            )
        }),
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
        label: PropTypes.shape({
            recomendar: PropTypes.shape({
                text: PropTypes.string
            })
        })
    })
};

export default LiftIgniter;
