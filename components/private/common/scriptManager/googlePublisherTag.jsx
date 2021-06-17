import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import getAuthorByline from '../utils/getAuthorByline';

class GooglePublisherTag extends Component {
    static decorate(prefix, regex, replace, string) {
        this.decorate(prefix, regex, replace, string);
    }

    constructor(props) {
        super(props);
        const { location = 'head' } = props;
        this.location = location;
        this.decorate = (prefix, regex, replace, string) => {
            return regex && replace && string
                ? `'${prefix}${string
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/[!¡]/g, '')
                      .replace(regex, replace)}'`
                : '';
        };
    }

    getCategories(sections) {
        return sections && sections.length
            ? sections
                  .map(section =>
                      this.decorate('ca_', /\W/g, '_', section.name)
                  )
                  .join(',')
                  .concat(',')
            : '';
    }

    getTopics(tags) {
        return tags && tags.length
            ? tags
                  .map(tag => this.decorate('te_', /\W/g, '_', tag.text))
                  .join(',')
                  .concat(',')
            : '';
    }

    getAuthors(object) {
        return object && object.length
            ? object
                  .map(author => {
                      const name = getAuthorByline(author);
                      return this.decorate('au_', /\W/g, '_', name);
                  })
                  .join(',')
                  .concat(',')
            : '';
    }

    getAuthorsFromContentElements(object) {
        const authors =
            object &&
            object.length &&
            object.filter(
                contentElement =>
                    contentElement.additional_properties &&
                    contentElement.additional_properties.nodeType === 'firma'
            );
        return authors && authors.length
            ? authors
                  .map(author =>
                      this.decorate('au_', /\W/g, '_', author.content)
                  )
                  .join(',')
                  .concat(',')
            : '';
    }

    getUrl(url) {
        if (!url) return '';
        return this.decorate('url', /\//g, '_', url.replace(/\/$/g, ''));
    }

    render() {
        const { globalContent } = this.props;
        const { type } = globalContent;

        if (!type || type !== 'story') return <></>;

        const {
            taxonomy,
            canonical_url: canonicalUrl,
            credits = { by: [] },
            content_elements: contentElements = []
        } = globalContent;

        const { tags, sections } = taxonomy || [];
        const { by: authors } = credits || {};

        if (
            !sections.length &&
            !tags.length &&
            !canonicalUrl &&
            (!authors.length || contentElements.length)
        )
            return <></>;

        const categories = this.getCategories(sections);
        const topics = this.getTopics(tags);
        const url = this.getUrl(canonicalUrl);
        const authorList =
            authors && authors.length
                ? this.getAuthors(authors)
                : this.getAuthorsFromContentElements(contentElements);

        const script = `
            var pbjs = pbjs || {};
            pbjs.que = pbjs.que || [];
            
            window.googletag = window.googletag || { cmd: [] };
            googletag.cmd.push(() => {
                // initialize
                googletag.pubads().enableSingleRequest();
                googletag.pubads().enableAsyncRendering();
                googletag.pubads().disableInitialLoad();
                googletag.enableServices();
 
                
                console.log('🚀 ::: setTargeting ON ::: 🚀');
                googletag.pubads().setTargeting('tags_nuevos', [${categories} ${topics} ${authorList} ${url}]);
            });
        `;

        /* (() => {
            window.googletag = window.googletag || { cmd: [] };
            googletag.cmd.push(function() {
                console.log('🚀 ::: setTargeting ON ::: 🚀');
                googletag.pubads().setTargeting('tags_nuevos', [${categories} ${topics} ${authorList} ${url}]);
            });
        })(); */

        return (
            <>
                <script
                    async
                    src="https://www.googletagservices.com/tag/js/gpt.js"
                />
                <script
                    defer
                    id="googlePublisherTag-metadata"
                    type="text/javascript"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: script }}
                />
            </>
        );
    }
}

GooglePublisherTag.propTypes = {
    location: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        type: PropTypes.string,
        canonical_url: PropTypes.string,
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
            ),
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    path: PropTypes.string
                })
            )
        }),
        label: PropTypes.shape({
            recomendar: PropTypes.shape({
                text: PropTypes.string
            })
        })
    }).isRequired
};

export default GooglePublisherTag;
