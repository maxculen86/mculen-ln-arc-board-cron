import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import get from '../../../common/utils/get';
import getApertura from '../../../common/utils/getApertura';

export default function WithStorytellingData(WrappedComponent) {
    return class extends PureComponent {
        static get propTypes() {
            return {
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
                }),
                screenUtils: PropTypes.shape({
                    device: PropTypes.string
                })
            };
        }

        static get defaultProps() {
            return {
                globalContent: {
                    promo_items: {
                        basic: {},
                        storytelling: {},
                        storytelling_mobile: {}
                    },
                    type: '',
                    subtype: ''
                },
                screenUtils: {
                    device: 'desktop'
                }
            };
        }

        constructor(props) {
            super(props);
            this.getStorytellingData = this.getStorytellingData.bind(this);
            this.state = {
                storytellingData: { apertura: this.getStorytellingData() }
            };
        }

        getStorytellingData = () => {
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
            const outputType = get(this, 'props.outputType', null);
            const type = get(this, 'props.globalContent.type', null);
            const subtype = get(this, 'props.globalContent.subtype', null);
            const device = get(this, 'props.screenUtils.device', 'desktop');
            const isMobile = outputType === 'amp' || device !== 'desktop';

            return type === 'story' &&
                (subtype === '4' || subtype === '8') &&
                (basicImage || videoBackground || storytellingMobile)
                ? getApertura(
                      isMobile,
                      basicImage,
                      videoBackground,
                      storytellingMobile
                  )
                : {};
        };

        render() {
            const { storytellingData } = this.state;
            return (
                <WrappedComponent
                    {...this.props}
                    storytellingData={storytellingData}
                />
            );
        }
    };
}
