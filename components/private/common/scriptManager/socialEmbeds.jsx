/* eslint-disable react/no-danger */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import config from '../../../../properties/sites/la-nacion-ar';
import get from '../utils/get';

const filterEmbeds = contentElements =>
    contentElements.filter(
        contentElement =>
            contentElement.type === 'oembed_response' ||
            contentElement.type === 'raw_html'
    );

const hasInstagramEmbed = contentElements =>
    contentElements.some(
        contentElement =>
            contentElement.subtype === 'instagram' ||
            (contentElement.content &&
                contentElement.content.includes('instagram-media'))
    );

const hasTwitterEmbed = contentElements =>
    contentElements.some(
        contentElement =>
            contentElement.subtype === 'twitter' ||
            (contentElement.content &&
                contentElement.content.includes('twitter-tweet'))
    );

const hasFacebookEmbed = contentElements => {
    return contentElements.some(
        contentElement =>
            contentElement.subtype === 'facebook' ||
            contentElement.subtype === 'facebook-video' ||
            contentElement.subtype === 'facebook-post'
    );
};

const SocialEmbeds = props => {
    const { globalContent } = props;
    const { type, content_elements: contentElements } = globalContent || {};

    if (!contentElements) return null;

    const content = filterEmbeds(contentElements);

    const instagramEmbed = hasInstagramEmbed(content);
    const twitterEmbed = hasTwitterEmbed(content);
    const facebookEmbed = hasFacebookEmbed(content);

    const processInstaEmbeds = `
        window.addEventListener("load", function(e) {
            instgrm.Embeds.process();
            var t = document.querySelector(".cuerpo__nota").getElementsByTagName("script");
            HTMLCollection.prototype.filter = Array.prototype.filter, t.filter(function(e) {
                return "//www.instagram.com/embed.js" === e.getAttribute("src")
            }).forEach(function(e) {
                return e.remove()
            })
        });
    `;

    const processTwitterEmbeds = `
        window.addEventListener('load', () => {
            const WIDGET_URL = 'https://platform.twitter.com/widgets.js';
            const twttr = window.twttr || {};
            const cuerpoNota = document.querySelector(".cuerpo__nota"); 
            const scripts = cuerpoNota.getElementsByTagName("script");
            
            const isTwitterUrl = e => WIDGET_URL === e.getAttribute('src');
            const removeElements = e => e.remove();
            
            HTMLCollection.prototype.filter = 
                Array.prototype.filter, 
                scripts.filter(isTwitterUrl).forEach(removeElements)

            twttr.widgets && twttr.widgets.load();
        });
    `;

    const facebookScript = `
        window.fbAsyncInit = function () {
            FB.init({
                appId: ${get(config, 'shareConfig.facebook.appID', null)},
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.11'
            });
            FB.AppEvents.logPageView();
        };
    `;

    if (type !== 'story') return null;
    if (!instagramEmbed && !twitterEmbed && !facebookEmbed) return null;
    return (
        <>
            {instagramEmbed && (
                <>
                    <script defer src="//www.instagram.com/embed.js" />
                    <script
                        type="text/javascript"
                        dangerouslySetInnerHTML={{ __html: processInstaEmbeds }}
                    />
                </>
            )}
            {twitterEmbed && (
                <>
                    <script
                        async
                        src="https://platform.twitter.com/widgets.js"
                    />
                    <script
                        type="text/javascript"
                        dangerouslySetInnerHTML={{
                            __html: processTwitterEmbeds
                        }}
                    />
                </>
            )}
            {facebookEmbed && (
                <>
                    <script
                        type="text/javascript"
                        dangerouslySetInnerHTML={{ __html: facebookScript }}
                    />
                </>
            )}
            <noscript>Your browser does not support javascript</noscript>
        </>
    );
};

SocialEmbeds.propTypes = {
    globalContent: PropTypes.shape({
        type: PropTypes.string.isRequired,
        content_elements: PropTypes.shape.isRequired
    }).isRequired
};

export default Consumer(SocialEmbeds);
