import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import { getTypeOfDevice } from '@ln/hooks';
import get from '../../../common/utils/get';
import getApertura from '../../../common/utils/getApertura';
import {
    STORYTELLING,
    FOTOAL100
} from '../../../common/utils/subtypes/subtypeHelper';

export default function WithStorytellingData(WrappedComponent) {
    class WithStorytellingDataClass extends PureComponent {
        constructor(props) {
            super(props);
            this.getStorytellingData = this.getStorytellingData.bind(this);
            this.state = {
                storytellingData: { apertura: this.getStorytellingData() }
            };
        }

        getStorytellingData() {
            const promoItems = get(
                this,
                'props.globalContent.promo_items',
                null
            );
            const storytellingMobile = get(
                promoItems,
                'storytelling_mobile',
                null
            );

            const basicImage = get(promoItems, 'basic', null);
            const videoBackground = get(promoItems, 'storytelling', null);
            const videoJw = get(promoItems, 'video_jw', null);
            const type = get(this, 'props.globalContent.type', null);
            const subtype = get(this, 'props.globalContent.subtype', null);
            const device = getTypeOfDevice({
                breakpoints: {
                    mobile: 768,
                    tablet: 1024
                }
            });

            const isMobile = device !== 'desktop';

            return type === 'story' &&
                (subtype === STORYTELLING || subtype === FOTOAL100) &&
                (basicImage || videoBackground || storytellingMobile || videoJw)
                ? getApertura(
                      isMobile,
                      basicImage,
                      videoBackground,
                      storytellingMobile,
                      device,
                      videoJw
                  )
                : {};
        }

        render() {
            const { storytellingData } = this.state;
            return (
                <WrappedComponent
                    {...this.props}
                    storytellingData={storytellingData}
                />
            );
        }
    }

    WithStorytellingDataClass.propTypes = {
        globalContent: PropTypes.shape({
            promo_items: PropTypes.shape({
                basic: PropTypes.object,
                storytelling: PropTypes.oneOfType([
                    PropTypes.arrayOf(PropTypes.node),
                    PropTypes.object
                ]),
                storytelling_mobile: PropTypes.oneOfType([
                    PropTypes.arrayOf(PropTypes.node),
                    PropTypes.object
                ]),
                type: PropTypes.string,
                subtype: PropTypes.string
            })
        })
    };

    WithStorytellingDataClass.defaultProps = {
        globalContent: {
            promo_items: {
                basic: {},
                storytelling: {},
                storytelling_mobile: {}
            },
            type: '',
            subtype: ''
        }
    };

    return WithStorytellingDataClass;
}
