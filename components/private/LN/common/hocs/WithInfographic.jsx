import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

export default function WithInfographic(WrappedComponent) {
    return Consumer(
        class extends PureComponent {
            static get propTypes() {
                return {
                    outputType: PropTypes.string.isRequired,
                    globalContent: PropTypes.shape({
                        promo_items: PropTypes.shape({
                            type: PropTypes.string,
                            content: PropTypes.string
                        })
                    }).isRequired
                };
            }

            constructor(props) {
                super(props);
                this.state = {
                    content: {}
                };
                this.getContent = this.getContent.bind(this);
            }

            componentDidMount() {
                this.getContent();
            }

            getContent = () => {
                const { globalContent, outputType } = this.props || {};
                const { promo_items: promoItems, type, subtype } =
                    globalContent || {};
                const { basic } = promoItems || {};
                const { type: contentType, content } = basic || '';
                if (
                    type === 'story' &&
                    subtype === '2' &&
                    content &&
                    contentType === 'raw_html'
                ) {
                    const result =
                        outputType === 'amp'
                            ? content
                                  .replace(/<iframe/gim, '<amp-iframe')
                                  .replace(/<\/iframe/gim, '</amp-iframe')
                            : content;

                    this.setState({
                        content: result
                    });
                }
            };

            render() {
                const { content } = this.state;
                if (!content) return <></>;
                return <WrappedComponent {...this.props} content={content} />;
            }
        }
    );
}
