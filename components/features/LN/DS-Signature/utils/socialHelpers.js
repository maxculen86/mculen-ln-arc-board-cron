import { transformSocial } from '../../../private-global/common/utils/transformSocial';

const ICON_NAME_MAP = {
    email: 'mail',
    twitter: 'x',
    personal_website: 'website'
};

const mapIconName = iconName => {
    const normalized = iconName?.toLowerCase() || '';
    return ICON_NAME_MAP[normalized] ?? normalized;
};

export const buildSocialItems = socialLinks => {
    const list = Array.isArray(socialLinks) ? socialLinks : [];
    return list.reduce((items, { site = '', url = '' }) => {
        const social = transformSocial(site, url);
        if (!social?.href || !social?.icon) return items;
        items.push({
            icon: mapIconName(social.icon),
            url: social.href,
            label: social.name
        });
        return items;
    }, []);
};
