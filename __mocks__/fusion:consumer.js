/**
 * Global mock for a fusion:consumer when running
 * unit tests of anything using a consumer HOC.
 *
 * In order to use this mock you must do
 * `import Consumer from 'fusion:consumer';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Consumer import below
 * */

jest.mock('fusion:consumer', component => {
    return function(component) {
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
                    case 'articleSource':
                        return require(`./data/articles/${query.id}`);
                        break;
                    case 'imageSource':
                        return require(`./data/images/${query.id}`);
                        break;
                    case 'ottVideosSource':
                        return require(`./data/ottVideos/${query.ids[0]}`);
                        break;
                    case 'videosSearchSource':
                        console.log('QUERYYYYYYYY', query.query);
                        switch (query.query) {
                            case 'body={"query":{"bool":{"must":[{"term":{"type":"video"}},{"term":{"revision.published":true}},{"nested":{"path":"taxonomy.sections","query":{"bool":{"must":[{"term":{"taxonomy.sections._id":"terapia-noticias"}}]}}}}]}}}&sort=publish_date:desc&from=0&size=12':
                                return require(`./data/videos/lastVideosfrom0size12sectionterapia-noticias.json`);

                            case 'body={"query":{"bool":{"must":[{"term":{"type":"video"}},{"term":{"revision.published":true}},{"nested":{"path":"taxonomy.sections","query":{"bool":{"must":[{"term":{"taxonomy.sections._id":"sinvideos"}}]}}}}]}}}&sort=publish_date:desc&from=0&size=12':
                                return require(`./data/videos/sinVideosEncontrados.json`);

                            case 'body={"query":{"bool":{"must":[{"term":{"type":"video"}},{"term":{"revision.published":true}},{"nested":{"path":"taxonomy.sections","query":{"bool":{"must":[{"term":{"taxonomy.sections._id":"connext"}}]}}}}]}}}&sort=publish_date:desc&from=0&size=12':
                                return require(`./data/videos/videosConNext.json`);

                            case 'body={"query":{"bool":{"must":[{"term":{"type":"video"}},{"term":{"revision.published":true}},{"nested":{"path":"taxonomy.sections","query":{"bool":{"must":[{"term":{"taxonomy.sections._id":"sinnext"}}]}}}}]}}}&sort=publish_date:desc&from=0&size=12':
                                return require(`./data/videos/videosSinNext.json`);

                            case 'sort=publish_date:desc&from=0&size=8&q=type:video':
                                return require(`./data/videos/ultimosVideos.json`);
                        }
                        break;
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
