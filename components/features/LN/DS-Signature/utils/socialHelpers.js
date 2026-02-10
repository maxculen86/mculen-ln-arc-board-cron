import { transformSocial } from '../../../private-global/common/utils/transformSocial';

export const buildSocialItems = socialLinks => {
    const list = Array.isArray(socialLinks) ? socialLinks : [];
    return list.reduce((items, { site = '', url = '' }) => {
        const social = transformSocial(site, url);
        if (!social?.href || !social?.icon) return items;
        items.push({
            icon: social.icon,
            url: social.href,
            label: social.name
        });
        return items;
    }, []);
};
