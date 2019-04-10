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
    return function (component) {
        class element extends component {
            constructor(props) {
                super(props);
                this.props = props;
            }

            addEventListener() { }

            dispatchEvent() { }

            fetchContent(param) { }

            customFetchContent({ sourceName, query, filter }) {
                switch (sourceName) {
                    case 'articleSource':
                        return require(`./data/notas/${query.id}`);
                        break;
                    case 'ottVideoSource':
                        switch (query.query) {
                            case 'taxonomy.sections._id="/terapia-noticias"&sort=publish_date:desc&from=0&size=12':
                                return require(`./data/videos/lastVideosfrom0size12sectionterapia-noticias.json`);

                            case 'taxonomy.sections._id="/sinvideos"&sort=publish_date:desc&from=0&size=12':
                                return require(`./data/videos/sinVideosEncontrados.json`);

                            case 'taxonomy.sections._id="/connext"&sort=publish_date:desc&from=0&size=12':
                                return require(`./data/videos/videosConNext.json`);

                            case 'taxonomy.sections._id="/sinnext"&sort=publish_date:desc&from=0&size=12':
                                return require(`./data/videos/videosSinNext.json`);


                        }
                        break;
                    default:
                        console.error('Mock de Consumer no encontrado! ');
                        break;
                }
            }

            getContent(sourceInfo) {
                const rta = this.customFetchContent(sourceInfo);
                return {
                    cached: rta,
                    fetched: new Promise(resolve => {
                        return resolve(rta);
                    })
                };
            }

            removeEventListener() { }

            setContent() { }
        }

        return element;
    };
});
