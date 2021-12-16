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

export default bannerPropTypes;
