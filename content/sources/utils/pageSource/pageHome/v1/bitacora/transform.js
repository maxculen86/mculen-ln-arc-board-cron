const transform = async (dataPage, query) => {
    const {
        information: { layoutPage },
        content_elements: elementsPage
    } = dataPage;

    try {
        let elementsPageHome = elementsPage;
        elementsPageHome =
            elementsPageHome &&
            elementsPageHome.filter(elem => elem && elem.type === 0);
        // Returns boxes that type equal 0, becacuse have articles
        return elementsPageHome;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - v1/bitacora/transform :  layout: ${layoutPage} - query: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
