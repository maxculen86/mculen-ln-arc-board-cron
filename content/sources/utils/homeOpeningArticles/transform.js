const BOX_ARTICLES_SIZES = [
    {
        width: 375,
        height: 250,
        minScreenWidth: 375,
        useFullSize: true,
        proportion: '3:2'
    },
    {
        width: 300,
        height: 200,
        useFullSize: true,
        proportion: '3:2'
    }
];

const MAX_ARTICLES = 10;

const isOpeningBox = box => box?.tipoSeccion === 'apertura';

const rewriteResizedUrl = (sourceUrl, { width, height }) => {
    const [base, query] = sourceUrl.split('?');
    const params = new URLSearchParams(query);
    params.set('width', String(width));
    params.set('height', String(height));
    return `${base}?${params.toString()}`;
};

const buildResizedUrls = sourceUrl =>
    BOX_ARTICLES_SIZES.map(size => ({
        option: { ...size },
        resizedUrl: rewriteResizedUrl(sourceUrl, size)
    }));

const mapCategoriaToPrimarySection = categoria => {
    if (!categoria) return {};
    const { slug = '', valor = '' } = categoria;
    return { _id: slug, path: slug, name: valor };
};

export const transformArticle = article => {
    if (!article?.id || !article.imagen?.absoluteUrl) return null;

    const sourceUrl = article.imagen.absoluteUrl;

    return {
        _id: article.id,
        headlines: { basic: article.titulo, mobile: article.titulo },
        display_date: article.fechaPublicacion,
        website_url: article.url,
        label: { volanta: { text: article.volanta || '' } },
        promo_items: {
            basic: {
                _id: article.imagen.id,
                type: 'image',
                url: sourceUrl,
                resized_urls: buildResizedUrls(sourceUrl)
            }
        },
        taxonomy: {
            primary_section: mapCategoriaToPrimarySection(article.categoria)
        }
    };
};

export const extractAperturaHomeArticles = homePage => {
    const seenIds = new Set();
    const articles = [];

    homePage.items.filter(isOpeningBox).forEach(box => {
        box.notas.forEach(nota => {
            if (!nota?.id || seenIds.has(nota.id)) return;
            const article = transformArticle(nota);
            if (!article) return;
            seenIds.add(nota.id);
            articles.push(article);
        });
    });

    return articles
        .sort((a, b) => new Date(b.display_date) - new Date(a.display_date))
        .slice(0, MAX_ARTICLES);
};

export { BOX_ARTICLES_SIZES };
