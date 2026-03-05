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

export const isMailUri = url =>
    typeof url === 'string' && url.toLowerCase().startsWith('mailto:');

const parseEmailUrl = url => {
    const normalizedUrl = typeof url === 'string' ? url.trim() : '';
    return normalizedUrl ? `mailto:${normalizedUrl}` : '';
};

const resolveSocialUrl = ({ site = '', url, socialHref }) =>
    typeof site === 'string' && site.toLowerCase() === 'email'
        ? parseEmailUrl(url)
        : socialHref;

export const buildSocialItems = socialLinks => {
    const list = Array.isArray(socialLinks) ? socialLinks : [];
    return list.reduce((items, { site = '', url = '' }) => {
        const social = transformSocial(site, url);
        const resolvedUrl = resolveSocialUrl({
            site,
            url,
            socialHref: social?.href
        });
        if (!resolvedUrl || !social?.icon) return items;

        items.push({
            icon: mapIconName(social.icon),
            url: resolvedUrl,
            label: social.name
        });
        return items;
    }, []);
};
