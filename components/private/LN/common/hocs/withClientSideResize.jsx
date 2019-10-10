import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

function WithClientSideResize(WrappedImage, imagePreset) {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super(props);

                this.state = { resizedUrls: undefined };
            }

            componentDidMount() {
                const {
                    articleData: {
                        promo_items: {
                            basic: { resized_urls: resizedUrls, url }
                        }
                    }
                } = this.props;

                if (!resizedUrls) {
                    this.fetchContent({
                        resizedUrls: {
                            source: 'imageResizeSource',
                            query: { url, preset: imagePreset }
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
    );
}

export default WithClientSideResize;
