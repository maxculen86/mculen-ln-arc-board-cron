import PropTypes from 'fusion:prop-types';
import {
    BANNERS_DESKTOP,
    BANNERS_MOBILE,
    BANNERS_TABLET
} from '../../LN/common/utils/bannerHelper';

const bannerPropTypes = {
    customFields: PropTypes.shape({
        group: PropTypes.oneOf(['nota', 'acumulado', 'home']).tag({
            label: 'Ubicacion'
        }).isRequired,
        desktop: PropTypes.oneOf(BANNERS_DESKTOP),
        mobile: PropTypes.oneOf(BANNERS_MOBILE),
        tablet: PropTypes.oneOf(BANNERS_TABLET),
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool
    }),
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }),
    isAdmin: PropTypes.bool,
    globalContent: PropTypes.shape({
        label: PropTypes.shape({
            mostrar_banners: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        termicas: PropTypes.shape({
            banners: PropTypes.string
        }),
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.node),
            tags: PropTypes.arrayOf(PropTypes.node)
        })
    }),
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
};

const googlePublisherAndLiftIgniterPropTypes = {
    content_elements: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            type: PropTypes.string,
            additional_properties: PropTypes.shape({
                nodeType: PropTypes.string
            }),
            content: PropTypes.string
        })
    ),
    credits: PropTypes.shape({
        by: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        )
    }),
    label: PropTypes.shape({
        recomendar: PropTypes.shape({
            text: PropTypes.string
        })
    })
};

const wikiAuthorPropTypes = {
    byline: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    longBio: PropTypes.string,
    image: PropTypes.shape({
        url: PropTypes.string
    }),
    books: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            publisher: PropTypes.string,
            url: PropTypes.string
        })
    ),
    podcasts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string
        })
    ),
    education: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string
        })
    ),
    awards: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string
        })
    ),
    personal_website: PropTypes.string,
    languages: PropTypes.string,
    affiliations: PropTypes.string
};

const notaAl100andStorytellingLayoutsPropTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.shape({
                _id: PropTypes.string
            })
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired,
    layout: PropTypes.string.isRequired
};

const homeLayoutsPropTypes = {
    children: PropTypes.node,
    globalContent: PropTypes.shape({
        style: PropTypes.shape({
            section_style_name: PropTypes.string,
            headerdark: PropTypes.string
        }),
        name: PropTypes.string,
        acumuladoGeneral: PropTypes.shape({
            tipo_acumulado: PropTypes.string,
            hierarchy_navigation: PropTypes.string,
            hide_banner: PropTypes.string,
            cantidad_notas: PropTypes.string,
            id_collection_promo_items: PropTypes.string
        }),
        acumuladoColor: PropTypes.shape({
            header_class_name: PropTypes.string,
            background_color: PropTypes.string,
            navigation_color: PropTypes.string,
            navigation_color_tags: PropTypes.string,
            id_logo_image: PropTypes.string
        })
    })
};

const groupCustomFields = 'Custom Fields';
const adjustByURL = 'Ajuste por URL';

export {
    googlePublisherAndLiftIgniterPropTypes,
    bannerPropTypes,
    wikiAuthorPropTypes,
    notaAl100andStorytellingLayoutsPropTypes,
    homeLayoutsPropTypes,
    groupCustomFields,
    adjustByURL
};
