import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import sectionsFormated from '../../../private/common/utils/sectionsFormated';
import resultArticle from '../../../private/LN/api/v1/global/home/article/index';
import respChain from '../../../private/LN/api/v1/global/home/chains/respCajaCollection';

class Timeline {
    constructor(props) {
        this.props = props;
        const { customFields, arcSite } = props;
        this.state = {};

        const { sections, size } = customFields;

        const query = this.getQueryElement(sections, size + 3, arcSite);

        this.fetch(query);
    }

    fetch(query) {
        this.fetchContent({
            acuArticlesSourceTime: {
                source: 'acuArticlesSource',
                query
            }
        });
    }

    getQueryElement = (sections, size, arcSite) => {
        let sectionsValidate = sections || [];
        const resp = {
            page: 1,
            imageConfig: 'm',
            api: true,
            size,
            website: arcSite
        };
        if (!sections) {
            sectionsValidate = ['/ultimas-noticias3'];
        }
        const sectionsIds = sectionsFormated(sectionsValidate);

        return {
            ...resp,
            sectionsIds,
            sourceOrigin: 'composer'
        };
    };

    render() {
        try {
            const { acuArticlesSourceTime } = this.state || {};
            const {
                customFields: { size = 5 }
            } = this.props;
            if (!acuArticlesSourceTime) {
                return null;
            }
            const results = acuArticlesSourceTime;

            const { content_elements: contentElements } =
                acuArticlesSourceTime || {};
            results.content_elements =
                contentElements &&
                contentElements
                    .filter(
                        article =>
                            article.content_restrictions &&
                            article.content_restrictions.content_code !==
                                'cerrada'
                    )
                    .slice(0, size)
                    .map(elem => {
                        const propsElem = {
                            ...this.props,
                            customFields: {
                                ...get(this.props, 'customFields', null),
                                noteId: get(elem, '_id', null),
                                title: null
                            }
                        };
                        const element = resultArticle(
                            elem,
                            null,
                            null,
                            propsElem
                        );
                        return element;
                    });
            const resultArticles = results.content_elements?.filter(
                x => x != null
            );
            const props = {
                ...this.props,
                customFields: {
                    ...this.props.customFields,
                    layout: 'timeline'
                },
                children: resultArticles || []
            };

            return respChain(null, props);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Timeline);
