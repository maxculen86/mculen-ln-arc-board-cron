const getSocialsNetwork = globalContent => {
    const {
        twitter = '',
        facebook = '',
        youtube = '',
        instagram = '',
        linkedin = '',
        rss = '',
        medium = '',
        reddit = '',
        pinterest = '',
        soundcloud = '',
        snapchat = '',
        whatsapp = '',
        tumblr = ''
    } = globalContent || {};

    const socialNetworks = [
        twitter,
        facebook,
        youtube,
        instagram,
        linkedin,
        rss,
        medium,
        reddit,
        pinterest,
        soundcloud,
        snapchat,
        whatsapp,
        tumblr
    ];

    return socialNetworks.filter(social => social !== '');
};

export default getSocialsNetwork;
