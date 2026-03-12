export const getLead = (customData, defaultData) =>
    (customData && customData.lead) ||
    (defaultData &&
        defaultData.label &&
        defaultData.label.volanta &&
        defaultData.label.volanta.display &&
        defaultData.label.volanta.text);

export const getTitle = (customData, defaultData) =>
    (customData && customData.title) ||
    (defaultData && defaultData.headlines && defaultData.headlines.basic);

export const getSubhead = (customData, defaultData) =>
    (customData && customData.description) ||
    (defaultData && defaultData.subheadlines && defaultData.subheadlines.basic);

// TODO: aplicar resizer
export const getImageId = (customData, defaultData) => {
    const customImage = customData && customData.imageId;
    const defaultImage =
        defaultData &&
        defaultData.promo_items &&
        defaultData.promo_items.basic &&
        defaultData.promo_items.basic._id;
    return customImage || defaultImage;
};

export const getAuthors = (customData, defaultData) =>
    (customData && customData.authors) ||
    (defaultData &&
        defaultData.credits &&
        defaultData.credits.by &&
        // eslint-disable-next-line no-use-before-define
        getDefaultAuthors(defaultData.credits.by));

export const getDefaultAuthors = authorList => {
    const authorMessage = authorList
        ? authorList
              .map((author, index) => {
                  switch (index) {
                      case 0:
                          return `Por ${author.name}`;
                      case authorList.length - 1:
                          return ` y ${author.name}`;
                      default:
                          return `, ${author.name}`;
                  }
              })
              .join('')
        : authorList;
    return authorMessage ? authorMessage.concat('.') : '';
};

export const getUrl = defaultData => defaultData && defaultData.canonical_url;
