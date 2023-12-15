import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';

function withLastVideosBySection(WrappedComponent) {
    return Consumer(
        class extends PureComponent {
            state = {
                from: 1,
                videos: [],
                hasNext: false
            };

            constructor(props) {
                super(props);
                this.getVideos();
            }

            getVideos() {
                const { fetched } = this.getContent({
                    sourceName: 'ottProgramVideosJwSource',
                    query: {
                        sectionId: this.props.sectionId,
                        page: this.state.from
                    }
                });

                fetched.then(response => {
                    if (!response) return;
                    const { jwVideosformatted = [], total, page } = response;

                    this.setState(prevState => ({
                        hasNext: page * 12 < total,
                        videos: [...prevState.videos, ...jwVideosformatted]
                    }));
                });
            }

            nextPage = () => {
                this.state.from = this.state.from + 1;
                this.getVideos();
            };

            render() {
                return (
                    <WrappedComponent
                        nextPage={this.nextPage}
                        hasNextPage={this.state.hasNext}
                        videos={this.state.videos}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withLastVideosBySection;
