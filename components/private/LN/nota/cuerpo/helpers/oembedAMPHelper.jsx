import React from 'react';
import get from '../../../../common/utils/get';
import '../../../../../../resources/dist/css/ln/components/com-embed.css';

export const getValue = (
    valueFromProps,
    rawOembed,
    regex,
    regexGroup,
    defaultValue
) => {
    const { html = '' } = rawOembed || {};
    const valueFromRegex = regex.exec(html);

    return (
        valueFromProps ||
        (valueFromRegex && valueFromRegex[regexGroup]) ||
        defaultValue
    );
};

export const checkIsFalsy = oembed => {
    if (!oembed) return null;
    return true;
};

const embedSubtypes = {
    facebook: ({ url = '', rawEmbed, width, height, subtype }) => {
        const fbUrl = /https?:\/\/(?:www\.)?facebook\.com\/.*/;
        const urlRegex = /data-href\s*=\s*"(https?:\/\/(?:www\.)?facebook\.com\/.+?)"/;
        const widthRegex = /width="([0-9]+)"/;
        const heightRegex = /height="([0-9]+)"/;

        const validFbUrl = url.match(fbUrl) ? url : null;

        const oembedUrl = getValue(validFbUrl, rawEmbed, urlRegex, 1);
        const oembedWidth = getValue(width, rawEmbed, widthRegex, 1, 500);
        const oembedHeight = getValue(height, rawEmbed, heightRegex, 1, 310);

        const embedType = subtype === 'facebook-video' ? 'video' : 'post';

        return (
            checkIsFalsy(oembedUrl) && (
                <div className="com-embed --facebook">
                    <amp-facebook
                        width={oembedWidth}
                        height={oembedHeight}
                        layout="responsive"
                        data-embed-as={embedType}
                        data-href={oembedUrl}
                    />
                </div>
            )
        );
    },
    twitter: ({ rawEmbed, subtype }) => {
        const twitterRegex = /(https?:\/\/(www\.)?)?twitter\.com\/(\w*())\/?status?\/([0-9]*)?\/?/;
        const regexMatch = get(rawEmbed, 'html', '').match(twitterRegex) || [];
        const tweetId = regexMatch[5];

        return (
            checkIsFalsy(tweetId) && (
                <div className={`com-embed --${subtype}`}>
                    <amp-twitter
                        width="375"
                        height="472"
                        data-tweetid={tweetId}
                    />
                </div>
            )
        );
    },
    youtube: ({ rawEmbed, width, height, subtype }) => {
        const urlRegex = /embed\/([\w+\-+]+)["?]/;
        const widthRegex = /width="([0-9]+)"/;
        const heightRegex = /height="([0-9]+)"/;

        const oembedId = getValue(null, rawEmbed, urlRegex, 1);
        const oembedWidth = getValue(width, rawEmbed, widthRegex, 1, 480);
        const oembedHeight = getValue(height, rawEmbed, heightRegex, 1, 270);

        return (
            checkIsFalsy(oembedId) && (
                <div className={`com-embed --${subtype}`}>
                    <amp-youtube
                        data-videoid={oembedId}
                        layout="fixed"
                        width={oembedWidth}
                        height={oembedHeight}
                    />
                </div>
            )
        );
    },
    instagram: ({ rawEmbed, subtype }) => {
        const instaRegex = /(https?:\/\/(www\.)?)?instagram\.com\/(?:p|tv)\/(\w*([-'])?(\w*)?)/;
        const instaId = get(rawEmbed, 'html', '').match(instaRegex);

        return instaId && instaId[3] ? (
            <div className={`com-embed --${subtype}`}>
                <amp-instagram
                    data-shortcode={instaId[3]}
                    data-captioned
                    width="400"
                    height="400"
                    layout="fixed"
                />
            </div>
        ) : null;
    },
    vimeo: ({ rawEmbed, subtype }) => {
        const vimeoRegex = /(https?:\/\/(www\.)?)?player\.vimeo\.com\/video\/([0-9]*)?/;
        const vimeoId = get(rawEmbed, 'html', '').match(vimeoRegex);

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
    },
    dailymotion: ({ rawEmbed, subtype }) => {
        const dailyMotionRegex = /\/embed\/video\/(\w*?[^"]+)/;
        const dailyMotionId = get(rawEmbed, 'html', '').match(dailyMotionRegex);
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
    },
    vine: ({ rawEmbed, subtype }) => {
        const vineRegex = /\/vine\.co\/v\/(\w*)\//;
        const vineId = get(rawEmbed, 'html', '').match(vineRegex);

        if (vineId && vineId[1]) {
            return (
                <div className={`com-embed --${subtype}`}>
                    <amp-vine width="400" height="400" data-vineid={vineId[1]}>
                        {' '}
                    </amp-vine>
                </div>
            );
        }
        return null;
    },
    default: ({ rawEmbed, subtype }) => {
        const defaultUrlRegex = /src\s*=\s*"([^"]+)"/;
        const oembedSrc = getValue(null, rawEmbed, defaultUrlRegex, 1);

        return (
            checkIsFalsy(oembedSrc) && (
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
            )
        );
    }
};

export const oembedAMPTypes = ({ subtype, rawEmbed, width, height, url }) => {
    const subtypeToSearch = subtype.includes('facebook') ? 'facebook' : subtype;
    const getEmbedSubtype = get(
        embedSubtypes,
        subtypeToSearch,
        embedSubtypes.default
    );

    return getEmbedSubtype({ subtype, rawEmbed, width, height, url });
};
