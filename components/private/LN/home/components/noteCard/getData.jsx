import PropTypes from 'fusion:prop-types';

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

getTitle.propTypes = {
    defaultData: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        })
    }),
    customData: PropTypes.shape({
        title: PropTypes.string
    })
};

export const getSubhead = (customData, defaultData) =>
    (customData && customData.description) ||
    (defaultData && defaultData.subheadlines && defaultData.subheadlines.basic);

getSubhead.propTypes = {
    defaultData: PropTypes.shape({
        subheadlines: PropTypes.shape({
            basic: PropTypes.string
        })
    }),
    customData: PropTypes.shape({
        description: PropTypes.string
    })
};
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

getImageId.propTypes = {
    defaultData: PropTypes.shape({
        promo_items: PropTypes.shape({
            basic: PropTypes.shape({
                resized_urls: PropTypes.array
            })
        })
    }),
    customData: PropTypes.shape({
        idImage: PropTypes.string
    })
};

export const getAuthors = (customData, defaultData) =>
    (customData && customData.authors) ||
    (defaultData &&
        defaultData.credits &&
        defaultData.credits.by &&
        getDefaultAuthors(defaultData.credits.by));

getAuthors.propTypes = {
    defaultData: PropTypes.shape({
        credits: PropTypes.shape({
            by: PropTypes.array
        })
    }),
    customData: PropTypes.shape({
        authors: PropTypes.string
    })
};

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

getUrl.propTypes = {
    defaultData: PropTypes.shape({
        canonical_url: PropTypes.string
    })
};
