import PropTypes from 'fusion:prop-types';

const SOCIAL_MEDIA = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    whatsapp: 'WhatsApp'
};
const SOCIAL_SLOTS = 3;

export const buildSocialCustomFields = () =>
    Array.from({ length: SOCIAL_SLOTS }).reduce((acc, _, i) => {
        const n = i + 1;
        const group = `Red Social ${n}`;
        return {
            ...acc,
            [`socialMedia${n}`]: PropTypes.oneOf(Object.keys(SOCIAL_MEDIA)).tag(
                {
                    labels: SOCIAL_MEDIA,
                    label: 'Red Social',
                    group
                }
            ),
            [`link${n}`]: PropTypes.string.tag({
                label: 'Enlace',
                group
            })
        };
    }, {});

export const getSocialsFromCustomFields = (customFields = {}) =>
    Array.from({ length: SOCIAL_SLOTS }, (_, i) => ({
        socialMedia: customFields[`socialMedia${i + 1}`],
        link: customFields[`link${i + 1}`]
    })).filter(({ socialMedia, link }) => socialMedia && link);
