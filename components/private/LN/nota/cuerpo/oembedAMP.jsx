import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/com-embed.css';

const getValue = (
    valueFromProps,
    rawOembed,
    regex,
    regexGroup,
    defaultValue
) => {
    const { html } = rawOembed || '';
    const valueFromRegex = regex.exec(html);
    return (
        valueFromProps ||
        (valueFromRegex && valueFromRegex[regexGroup]) ||
        defaultValue
    );
};

const OembedAMP = ({ data }) => {
    const { subtype, raw_oembed: rawOembed = {} } = data;
    const { width, height, url } = rawOembed;

    switch (subtype) {
        case 'facebook':
        case 'facebook-video':
        case 'facebook-post': {
            const urlRegex = /src\s*=\s*"([^"]+)"/;
            const widthRegex = /width="([0-9]+)"/;
            const heightRegex = /height="([0-9]+)"/;

            const oembedUrl = getValue(url, rawOembed, urlRegex, 1);
            const oembedWidth = getValue(width, rawOembed, widthRegex, 1, 500);
            const oembedHeight = getValue(
                height,
                rawOembed,
                heightRegex,
                1,
                310
            );

            const embedType = subtype === 'facebook-video' ? 'video' : 'post';

            if (!oembedUrl) return null;

            return (
                <div className="com-embed --facebook">
                    <amp-facebook
                        width={oembedWidth}
                        height={oembedHeight}
                        layout="responsive"
                        data-embed-as={embedType}
                        data-href={oembedUrl}
                    />
                </div>
            );
        }
        case 'twitter': {
            const twitterRegex = /(https?:\/\/(www\.)?)?twitter\.com\/(\w*())\/?status?\/([0-9]*)?\/?/;
            const tweetId = rawOembed.html.match(twitterRegex)[5];

            if (!tweetId) return null;

            return (
                <div className={`com-embed --${subtype}`}>
                    <amp-twitter
                        width="375"
                        height="472"
                        data-tweetid={tweetId}
                    />
                </div>
            );
        }
        case 'youtube': {
            const urlRegex = /embed\/([\w+\-+]+)["?]/;
            const widthRegex = /width="([0-9]+)"/;
            const heightRegex = /height="([0-9]+)"/;

            const oembedId = getValue(null, rawOembed, urlRegex, 1);
            const oembedWidth = getValue(width, rawOembed, widthRegex, 1, 480);
            const oembedHeight = getValue(
                height,
                rawOembed,
                heightRegex,
                1,
                270
            );

            if (!oembedId) return null;

            return (
                <div className={`com-embed --${subtype}`}>
                    <amp-youtube
                        data-videoid={oembedId}
                        layout="fixed"
                        width={oembedWidth}
                        height={oembedHeight}
                    />
                </div>
            );
        }
        case 'instagram': {
            const instaRegex = /(https?:\/\/(www\.)?)?instagram\.com\/p\/(\w*([-'])?(\w*)?)/;
            const instaId =
                rawOembed && rawOembed.html && rawOembed.html.match(instaRegex);
            if (instaId && instaId[3]) {
                return (
                    <div className={`com-embed --${subtype}`}>
                        <amp-instagram
                            data-shortcode={instaId[3]}
                            data-captioned
                            width="400"
                            height="400"
                            layout="fixed"
                        />
                    </div>
                );
            }
            return null;
        }
        case 'vimeo': {
            const vimeoRegex = /(https?:\/\/(www\.)?)?player\.vimeo\.com\/video\/([0-9]*)?/;
            const vimeoId =
                rawOembed && rawOembed.html && rawOembed.html.match(vimeoRegex);
            if (vimeoId && vimeoId[3]) {
                return (
                    <div className={`com-embed --${subtype}`}>
                        <amp-vimeo
                            data-videoid={vimeoId[3]}
                            layout="fixed"
                            width="500"
                            height="281"
                        />
                    </div>
                );
            }
            return null;
        }
        case 'dailymotion': {
            const dailyMotionRegex = /\/embed\/video\/(\w*?[^"]+)/;
            const dailyMotionId =
                rawOembed &&
                rawOembed.html &&
                rawOembed.html.match(dailyMotionRegex);
            if (dailyMotionId && dailyMotionId[1]) {
                return (
                    <div className={`com-embed --${subtype}`}>
                        <amp-dailymotion
                            data-videoid={dailyMotionId[1]}
                            layout="responsive"
                            width="480"
                            height="270"
                        />
                    </div>
                );
            }
            return null;
        }

        case 'vine': {
            const vineRegex = /\/vine\.co\/v\/(\w*)\//;
            const vineId =
                rawOembed && rawOembed.html && rawOembed.html.match(vineRegex);
            if (vineId && vineId[1]) {
                return (
                    <div className={`com-embed --${subtype}`}>
                        <amp-vine
                            width="400"
                            height="400"
                            data-vineid={vineId[1]}
                        >
                            {' '}
                        </amp-vine>
                    </div>
                );
            }
            return null;
        }
        default: {
            const defaultUrlRegex = /src\s*=\s*"([^"]+)"/;
            const oembedSrc = getValue(null, rawOembed, defaultUrlRegex, 1);

            if (!oembedSrc) return null;
            return (
                <div className={`com-embed --${subtype}`}>
                    <amp-iframe
                        width="300"
                        height="380"
                        frameborder="0"
                        allow="encrypted-media"
                        sandbox="allow-scripts allow-same-origin"
                        layout="responsive"
                        src={oembedSrc}
                    />
                </div>
            );
        }
    }
};

OembedAMP.arcType = 'oembed_response';
OembedAMP.outputType = 'amp';
OembedAMP.isStatic = true;
OembedAMP.propTypes = {
    data: PropTypes.shape({
        raw_oembed: PropTypes.any,
        subtype: PropTypes.string
    }).isRequired
};

export default OembedAMP;
