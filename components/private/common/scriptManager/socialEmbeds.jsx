import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

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

const SocialEmbeds = props => {
    const {
        globalContent: { content_elements: contentElements }
    } = props;

    const content = filterEmbeds(contentElements);

    const instagramEmbed = hasInstagramEmbed(content);
    const twitterEmbed = hasTwitterEmbed(content);

    const processInstaEmbeds = `
        window.addEventListener('load',function(event) {
            instgrm.Embeds.process()
            const cuerpo = document.querySelector('.cuerpo__nota')
                const scripts = cuerpo.getElementsByTagName('script')
                HTMLCollection.prototype.filter = Array.prototype.filter
                scripts.filter(script => script.getAttribute('src') === "//www.instagram.com/embed.js")
                    .forEach(script => script.remove())
        })
    `;

    const processTwitterEmbeds = `
        window.addEventListener('load',function(event) {
            const cuerpo = document.querySelector('.cuerpo__nota')
            const scripts = cuerpo.getElementsByTagName('script')
            HTMLCollection.prototype.filter = Array.prototype.filter
            scripts.filter(script => script.getAttribute('src') === "https://platform.twitter.com/widgets.js")
                .forEach(script => script.remove())
        })
    `;

    if (!instagramEmbed && !twitterEmbed) return null;
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
                        defer
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
        </>
    );
};

SocialEmbeds.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.shape.isRequired
    }).isRequired
};

export default Consumer(SocialEmbeds);
