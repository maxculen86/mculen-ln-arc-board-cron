jest.mock('fusion:consumer', component => {
    return function (component) {
        class element extends component {
            constructor(props) {
                super(props);
                this.props = props;
            }

            addEventListener() {}

            dispatchEvent() {}

            fetchContent(param) {}

            customFetchContent({ sourceName, query, filter }) {
                switch (sourceName) {
                    case 'rankingArticlesSource':
                    case 'acuArticlesSource':
                        return require(
                            `./data/articleCollections/${query.sectionId}`
                        );
                    case 'articleSource':
                        return require(`./data/articles/${query.id}`);
                        break;
                    case 'imageSource':
                        return require(`./data/images/${query.id}`);
                        break;
                    case 'navigationTreeSource':
                        let website = query.website
                            ? query.website
                            : 'la-nacion-ar';
                        return require(`./data/navigationTree/${website}`);
                    default:
                        console.error('Mock de Consumer no encontrado! ');
                        break;
                }
            }

            doFetch(resolve, rta) {
                return resolve(rta);
            }

            getContent(sourceInfo) {
                const rta = this.customFetchContent(sourceInfo);
                let cached = rta;
                let fetched = rta;
                if (this.props.cachedNull != null && this.props.cachedNull)
                    cached = null;
                if (this.props.fetchedNull != null && this.props.fetchedNull)
                    fetched = null;
                if (this.props.doFetch) this.doFetch = this.props.doFetch;
                return {
                    cached: cached,
                    fetched: new Promise(resolve => {
                        return this.doFetch(resolve, fetched);
                    })
                };
            }

            removeEventListener() {}

            setContent() {}
        }

        return element;
    };
});
