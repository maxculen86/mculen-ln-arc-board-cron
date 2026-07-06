export const transformSocial = (socialName, socialUser) => {
    if (!socialUser) {
        return {};
    }

    const socialsDomains = [
        'pinterest.com',
        'instagram.com',
        'youtube.com',
        'twitter.com'
    ];

    if (socialsDomains.some(string => socialUser.includes(string))) {
        const socialUrlSplited = socialUser.split('.com/');
        return {
            name: `@${socialUrlSplited[socialUrlSplited.length - 1].replace(
                '/',
                ''
            )}`,
            href: socialUser,
            icon: socialName
        };
    }

    return {
        name: socialUser.includes('@') ? socialUser : `@${socialUser}`,
        href: `https://${socialName}.com/${
            socialUser.includes('@') ? socialUser.substring(1) : socialUser
        }/`,
        icon: socialName
    };
};
export default transformSocial;
