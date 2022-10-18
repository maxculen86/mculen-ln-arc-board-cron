import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import getAuthorByline from '../utils/getAuthorByline';
import { googlePublisherAndLiftIgniterPropTypes } from '../utils/propTypesHelper';

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
        return `${this.decorate('url', /\//g, '_', url.replace(/\/$/g, ''))},`;
    }

    getArticleId() {
        const {
            globalContent: { _id }
        } = this.props;

        return `'te_${_id}'`;
    }

    render() {
        const { globalContent = {} } = this.props;
        const { type } = globalContent;

        if (!type || type !== 'story') return <></>;

        const {
            taxonomy,
            canonical_url: canonicalUrl,
            credits = { by: [] },
            content_elements: contentElements = []
        } = globalContent;

        const { tags = [], sections = [] } = taxonomy || {};
        const { by: authors = [] } = credits || {};

        const articleId = this.getArticleId();

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
        const authorList = authors.length
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
                googletag.pubads().setTargeting('tags_nuevos', [${categories} ${topics} ${authorList} ${url} ${articleId}]);
            });
        `;

        return (
            <>
                <script
                    async
                    src=" https://securepubads.g.doubleclick.net/tag/js/gpt.js?network-code=133919216"
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
        _id: PropTypes.string,
        type: PropTypes.string,
        canonical_url: PropTypes.string,
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
        content_elements:
            googlePublisherAndLiftIgniterPropTypes.content_elements,
        credits: googlePublisherAndLiftIgniterPropTypes.credits,
        googlePublisherAndLiftIgniterPropTypes:
            googlePublisherAndLiftIgniterPropTypes.label
    }).isRequired
};

export default GooglePublisherTag;
