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
            const epigrafe = get(videoBackground, 'headlines.basic', null);
            const streams = get(videoBackground, 'streams', null);
            const video =
                streams && streams.length > 1
                    ? streams.reduce((currentItem, previustem) =>
                          currentItem.width > previustem.width
                              ? currentItem
                              : previustem
                      ).url
                    : '';

            const { basic: basicVideoDsk } = promoItemsVideo || {};

            const data = isMobile
                ? basicImageMobile || {}
                : basicVideoDsk || basicImageDsk || {};

            const {
                alt_text: altText,
                url,
                caption,
                resized_urls: resizedUrls
            } = data;

            return {
                video: isMobile ? '' : video || '',
                altText: altText || '',
                src: url || '',
                srcset: url || '',
                caption: epigrafe || caption || '',
                credit: data && EpigrafeAndCreditsData(data),
                resizedUrls
            };
        };

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
