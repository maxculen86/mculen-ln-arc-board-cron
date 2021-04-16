import get from './get';

export const getOrderAndCountTags = articleTags => {
    const tags = articleTags
        .map(articleTag => get(articleTag, 'taxonomy.tags', []))
        .reduce((tagsGrouped, _tags) => {
            const tagsReduced = { ...tagsGrouped };
            _tags.forEach(tag => {
                tagsReduced[tag.slug] = {
                    count:
                        tagsReduced[tag.slug] && tagsReduced[tag.slug].count
                            ? tagsReduced[tag.slug].count + 1
                            : 1,
                    slug: tag.slug,
                    text: tag.text
                };
            });
            return tagsReduced;
        }, []);

    const orderAndCountTags =
        Object.keys(tags)
            .sort((a, b) => (tags[a].count < tags[b].count ? 1 : -1))
            .slice(0, 10)
            .map(key => tags[key]) || [];

    return (orderAndCountTags.length >= 4 && orderAndCountTags) || [];
};

export const transformTagsForAcu = (orderAndCountTags, colorTags) =>
    orderAndCountTags
        ? orderAndCountTags.map(({ slug, text }) => ({
              key: slug,
              link: `/tema/${slug}/`,
              textname: text,
              title: text,
              style: colorTags && { style: { color: colorTags } }
          }))
        : [];
