/* eslint-disable class-methods-use-this      */
/* eslint-disable react/require-default-props */

import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import get from '../utils/get';
import getAuthorByline from '../utils/getAuthorByline';

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
                    contentElement.additional_properties &&
                    contentElement.additional_properties.nodeType === 'firma'
            )
            .map(author => author.content)
            .join(', ');
    }

    getAuthors(object) {
        return object.map(author => getAuthorByline(author)).join(', ');
    }

    render() {
        const { globalContent } = this.props;
        const {
            taxonomy,
            label,
            content_elements: contentElements = [],
            credits,
            _id,
            headlines
        } = globalContent || {};

        const { primary_section: primarySection, tags = [] } = taxonomy || {};
        const { name: tematica } = primarySection || {};
        const { by: authors = [] } = credits || {};
        const recomendar = get(label, 'recomendar.text', 'Si');
        // const title = get(headlines, 'mobile') || get(headlines, 'basic') || '';
        const titleShort = get(headlines, 'mobile', '');
        const titleLong = get(headlines, 'basic', '');
        const leadText = label.volanta.text || '';
        const scriptRum = `
            window.addEventListener('DOMContentLoaded', (event) => {
                if (typeof $igniter_var === 'undefined') {
                    !function n(t,c,o,r,a,i,e,s,f){f=null!=t[o]&&"function"==typeof t[o].now?t[o].now():null,t.$igniter_var=i,t[i]=t[i]||function(){(t[i].q=t[i].q||[]).push(arguments)},e=c.getElementsByTagName(r)[0],(s=c.createElement(r)).async=1,"//cdn"==a?(t[i].s=f,s.onerror=function(e){t[i].e=e,n(t,c,o,r,a+"-fallback",i)}):t[i].r=f,s.src=a+".petametrics.com/8561ps8ov66e7mim.js?ts="+(new Date/36e5|0),e.parentNode.insertBefore(s,e)}(window,document,"performance","script","//cdn","$p");
                    $p('init', "8561ps8ov66e7mim");
                    $p('send', "pageview");
                  }
            });
        `;

        const script = {
            id: _id,
            titleLong,
            titleShort,
            leadText,
            noShow: recomendar !== 'Si',
            noIndex: false,
            tematica,
            tags: tags.map(tag => tag.text),
            autor:
                authors && authors.length > 0
                    ? this.getAuthors(authors)
                    : this.getAuthorsFromContentElements(contentElements)
        };

        return (
            <>
                <script
                    id="liftigniter"
                    type="text/javascript"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: scriptRum }}
                />

                <script
                    defer
                    id="liftigniter-metadata"
                    type="application/json"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(script)
                    }}
                />
            </>
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
