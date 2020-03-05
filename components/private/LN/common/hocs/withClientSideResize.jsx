import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

function WithClientSideResize(WrappedImage, imagePreset, imagepresetType) {
    class ClientSideResizer extends PureComponent {
        constructor(props) {
            super(props);

            this.state = { resizedUrls: undefined };
        }

        componentDidMount() {
            const {
                articleData: {
                    promo_items: {
                        basic: { resized_urls: resizedUrlsProp, url }
                    }
                }
            } = this.props;

            if (!resizedUrlsProp) {
                this.fetchContent({
                    resizedUrls: {
                        source: 'imageResizeSource',
                        query: {
                            url,
                            preset: imagePreset,
                            presetType: imagepresetType
                        }
                    }
                });
            }
        }

        render() {
            const { resizedUrls } = this.state;
            const {
                articleData: {
                    promo_items: { basic }
                }
            } = this.props;

            if (!resizedUrls) return null;
            basic.resized_urls = resizedUrls;
            return <WrappedImage {...this.props} />;
        }
    }

    ClientSideResizer.propTypes = {
        articleData: PropTypes.shape({
            promo_items: PropTypes.shape({
                basic: PropTypes.shape({
                    type: PropTypes.oneOf(['image']),
                    resized_urls: PropTypes.array,
                    url: PropTypes.string
                })
            })
        }).isRequired
    };

    return Consumer(ClientSideResizer);
}

export default WithClientSideResize;
