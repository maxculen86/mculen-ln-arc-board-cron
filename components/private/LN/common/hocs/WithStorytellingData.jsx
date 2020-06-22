import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import get from '../../../common/utils/get';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';

export default function WithStorytellingData(WrappedComponent) {
    return class extends PureComponent {
        static get propTypes() {
            return {
                globalContent: PropTypes.shape({
                    promo_items: PropTypes.shape({
                        basic: PropTypes.arrayOf(PropTypes.node),
                        storytelling: PropTypes.arrayOf(PropTypes.node),
                        storytelling_mobile: PropTypes.arrayOf(PropTypes.node),
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
            this.getApertura = this.getApertura.bind(this);
            this.state = {
                storytellingData: { apertura: this.getStorytellingData() }
            };
        }

        getApertura = (
            isMobile,
            basicImageDsk,
            videoBackground,
            basicImageMobile
        ) => {
            const promoItemsVideo = get(videoBackground, 'promo_items', null);
            const streams = get(videoBackground, 'streams', null);
            const video = streams
                ? streams.reduce((currentItem, previustem) =>
                      currentItem.height > previustem.height
                          ? currentItem
                          : previustem
                  ).y
                : {};

            const { basic: basicVideoDsk } = promoItemsVideo || {};

            const data = isMobile
                ? basicImageMobile || {}
                : basicVideoDsk || basicImageDsk || {};

            return {
                video: isMobile ? '' : video || '',
                altText: data.alt_text || '',
                src: data.url || '',
                srcset: data.url || '',
                caption: data.caption || '',
                credit: EpigrafeAndCreditsData(data)
            };
        };

        getStorytellingData = () => {
            const { globalContent, screenUtils } = this.props || {};
            const { promo_items: promoItems, type, subtype } =
                globalContent || {};
            const {
                basic: basicImage,
                storytelling: videoBackground,
                storytelling_mobile: storytellingMobile
            } = promoItems;
            const { device } = screenUtils || undefined;
            const isMobile = device !== 'desktop';
            return type === 'story' &&
                subtype === '4' &&
                (basicImage || videoBackground || storytellingMobile)
                ? this.getApertura(
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
