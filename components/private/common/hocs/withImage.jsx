import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';

function withImage(WrappedComponent, filter, published) {
    return Consumer(
        class extends PureComponent {
            state = { image: null };
            constructor(props) {
                super(props);
                this.getImage();
            }

            getImage() {
                if (this.props.imageId) {
                    let { cached, fetched } = this.getContent({
                        sourceName: 'imageSource',
                        query: {
                            published: published,
                            id: this.props.imageId.trim()
                        },
                        filter
                    });
                    const cachedImage = cached;

                    if (cachedImage) this.state.image = cachedImage;

                    fetched.then(response => {
                        const fetchedImage = response;
                        if (fetchedImage)
                            this.setState({ image: fetchedImage });
                    });
                } else this.state.image = null;
            }

            render() {
                return (
                    <WrappedComponent
                        image={this.state.image}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withImage;
