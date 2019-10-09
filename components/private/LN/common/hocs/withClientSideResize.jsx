import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

function WithClientSideResize(WrappedImage, imageConfig) {
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
                            basic: { resized_urls, url }
                        }
                    }
                } = this.props;

                console.log('--------- hoc client side', url);
                if (!resized_urls) {
                    this.fetchContent({
                        resizedUrls: {
                            source: 'imageResizeSource',
                            query: { url }
                        }
                    });
                }
            }

            render() {
                console.log('-----------------', this.props);
                const { resizedUrls } = this.state;
                const {
                    articleData: {
                        promo_items: { basic }
                    }
                } = this.props;
                console.log('--------- image client side render', resizedUrls);

                // basic.resized_urls = resizedUrls;

                return <WrappedImage {...this.props} />;
            }
        }
    );
}

export default WithClientSideResize;
