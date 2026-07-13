/* eslint-disable react/no-danger */
import React from 'react';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';
import config from '../../../../properties/sites/foodit';
import get from '../utils/get';

export const filterEmbeds = contentElements =>
    contentElements.filter(
        contentElement =>
            contentElement.type === 'oembed_response' ||
            contentElement.type === 'raw_html'
    );

export const hasInstagramEmbed = contentElements =>
    contentElements.some(
        contentElement =>
            contentElement.subtype === 'instagram' ||
            (contentElement.content &&
                contentElement.content.includes('instagram-media'))
    );

export const hasFacebookEmbed = contentElements =>
    contentElements.some(
        contentElement =>
            contentElement.subtype === 'facebook' ||
            contentElement.subtype === 'facebook-video' ||
            contentElement.subtype === 'facebook-post'
    );

export const hasTwitterEmbed = contentElements =>
    contentElements.some(
        contentElement =>
            contentElement.subtype === 'twitter' ||
            contentElement.oembed?.html?.includes('twitter-tweet')
    );

function SocialEmbeds(props) {
    const { globalContent } = props;
    const { type, content_elements: contentElements } = globalContent || {};
    const { deployment, contextPath } = useAppContext();

    if (!contentElements) return null;

    const content = filterEmbeds(contentElements);

    const instagramEmbed = hasInstagramEmbed(content);
    const facebookEmbed = hasFacebookEmbed(content);
    const twitterEmbed = hasTwitterEmbed(content);

    const appId = get(config, 'shareConfig.facebook.appID', null);

    if (type !== 'story') return null;
    if (!instagramEmbed && !facebookEmbed && !twitterEmbed) return null;
    return (
        <>
            {instagramEmbed && (
                <script
                    id="script-social-embeds-ig"
                    defer
                    src="https://www.instagram.com/embed.js"
                />
            )}
            {facebookEmbed && (
                <script
                    id="script-social-embeds-fb"
                    defer
                    type="text/javascript"
                    data-appId={appId}
                    src={deployment(
                        `${contextPath}/resources/js/LN/socialEmbedsScript.min.js`
                    )}
                />
            )}
            {twitterEmbed && (
                <script
                    id="script-social-embeds-twitter"
                    defer
                    src="https://platform.twitter.com/widgets.js"
                />
            )}
        </>
    );
}

export default Consumer(SocialEmbeds);
