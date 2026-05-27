export const getArticleImageUrl = item => {
    const { promo_image: promoImage, imageresizer, image } = item;

    let imgSrc = promoImage || imageresizer || image;

    if (imgSrc && imgSrc.startsWith('/')) {
        imgSrc = `https://www.lanacion.com.ar${imgSrc.split('|')[0]}`;
    }

    return imgSrc;
};
