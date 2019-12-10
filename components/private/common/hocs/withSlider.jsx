import React, { PureComponent } from 'react';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';

function withSlider(WrappedComponent, pageSize) {
    return class extends PureComponent {
        constructor(props) {
            super(props);
            console.log(
                'props ******** withSlider ********* ',
                this.props.children
            );
            const siteVars = getProperties(props.arcSite);
            this.sliderConfig = siteVars.sliderConfig;
            this.state = {
                pageSize,
                currentStartIndex: 0,
                totalCount: this.props.children.length,
                hasNextPage: this.props.children.length > pageSize,
                /* (this.props.children.length > 1
                        ? this.props.children.length
                        : this.props.children[0].length) > pageSize, */
                hasPrevPage: false
            };
            this.DEFAULT_SLIDE_COUNT = 1; // pageSize - 1
            this.slider = {
                nextButtonHandler: this.nextButtonHandler,
                prevButtonHandler: this.prevButtonHandler,
                hasNextPage: () => this.state.hasNextPage,
                hasPrevPage: () => this.state.hasPrevPage
            };
        }

        windowBetweenRanges(lowerRange, topRange) {
            const { innerWidth } = window;
            if (!lowerRange && !topRange) return true;
            if (!lowerRange) return innerWidth <= topRange;
            if (!topRange) return innerWidth >= lowerRange;
            return innerWidth >= lowerRange && innerWidth <= topRange;
        }

        updatePageSize() {
            if (this.sliderConfig)
                for (let index = 0; index < this.sliderConfig.length; index++) {
                    const elem = this.sliderConfig.find(elem => {
                        return this.windowBetweenRanges(
                            elem.lowerRange,
                            elem.topRange
                        );
                    });
                    if (elem) {
                        console.log('updatePageSize ************************');
                        if (elem.pageSize !== this.state.pageSize) {
                            this.setState({
                                // pageSize: elem.pageSize,
                                hasNextPage:
                                    this.state.currentStartIndex +
                                        elem.pageSize <
                                    this.state.totalCount
                            });
                        }
                        break;
                    }
                }
        }

        componentDidMount() {
            this.updatePageSize();
            window.addEventListener('resize', this.updatePageSize.bind(this));
        }

        componentWillUnmount() {
            window.removeEventListener(
                'resize',
                this.updatePageSize.bind(this)
            );
        }

        hasNextPage = nextCurrentIndex => {
            return (
                this.state.totalCount > nextCurrentIndex + this.state.pageSize
            );
        };

        hasPrevPage = nextCurrentIndex => {
            return nextCurrentIndex > 0;
        };

        nextButtonHandler = () => {
            this.setState({
                currentStartIndex:
                    this.state.currentStartIndex + this.DEFAULT_SLIDE_COUNT,
                hasNextPage: this.hasNextPage(
                    this.state.currentStartIndex + this.DEFAULT_SLIDE_COUNT
                ),
                hasPrevPage: true
            });
        };

        prevButtonHandler = () => {
            this.setState({
                currentStartIndex:
                    this.state.currentStartIndex - this.DEFAULT_SLIDE_COUNT,
                hasPrevPage: this.hasPrevPage(
                    this.state.currentStartIndex - this.DEFAULT_SLIDE_COUNT
                ),
                hasNextPage:
                    this.state.currentStartIndex -
                        this.DEFAULT_SLIDE_COUNT +
                        this.state.pageSize <
                    this.state.totalCount
            });
        };

        render() {
            console.log('this.state ++++++++++', this.state);
            return (
                <WrappedComponent
                    slider={this.slider}
                    {...this.props}
                    totalCount={this.state.totalCount}
                >
                    {this.props.children.slice(
                        this.state.currentStartIndex,
                        this.state.currentStartIndex + this.state.pageSize
                    )}
                </WrappedComponent>
            );
        }
    };
}

export default withSlider;
