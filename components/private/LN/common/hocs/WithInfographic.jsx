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
                this.state = this.getContent();
                //this.getContent = this.getContent.bind(this);
            }

            componentDidMount() {
                //Si es AMP no pasa por aca (por eso ahora lo pase al constructor)
                //this.getContent();
            }

            getContent = () => {
                const { globalContent, outputType } = this.props || {};
                const { promo_items: promoItems, type, subtype } =
                    globalContent || {};
                const { basic } = promoItems || {};
                const { type: contentType, content, _id } = basic || '';

                let result = {};
                if (
                    type === 'story' &&
                    subtype === '2' &&
                    content &&
                    contentType === 'raw_html'
                ) {
                    result =
                        outputType === 'amp'
                            ? content
                                  .match(/src="(.*?)"/g)
                                  .map(val => {
                                      return val
                                          .replace(/src=/g, '')
                                          .replace(/\"/g, '');
                                  })
                                  .join()
                            : //.replace(/<iframe/gim, '<amp-iframe')
                              //.replace(/<\/iframe/gim, '</amp-iframe')
                              content;
                    /*this.setState({
                        content: result,
                        outputType,
                        _id
                    });*/
                }
                return {
                    content: result,
                    outputType,
                    _id
                };
            };

            render() {
                const { content, outputType, _id } = this.state;
                if (!content) return <></>;
                return (
                    <WrappedComponent
                        {...this.props}
                        content={content}
                        outputType={outputType}
                        _id={_id}
                    />
                );
            }
        }
    );
}
