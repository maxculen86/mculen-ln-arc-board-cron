import PropTypes from 'fusion:prop-types';

const SOCIAL_MEDIA = {
    instagram: {
        label: 'Instagram',
        icon: 'instagram'
    },
    tiktok: {
        label: 'TikTok',
        icon: 'tiktok'
    },
    whatsapp: {
        label: 'WhatsApp',
        icon: 'whatsapp'
    }
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
                    labels: SOCIAL_MEDIA.label,
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
        name: customFields[`socialMedia${i + 1}`],
        href: customFields[`link${i + 1}`],
        icon: SOCIAL_MEDIA[customFields[`socialMedia${i + 1}`]]?.icon
    })).filter(({ name, href, icon }) => name && href && icon);
