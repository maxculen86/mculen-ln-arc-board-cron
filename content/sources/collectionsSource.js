const resolve = key => {
    const { id, website, size } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Collections Source'
        );
    if (!website)
        throw new Error('Debe indicar el website - Collections Source');

    /* const query = `&body={
        "query":{
            "bool": {
                "must": [
                    {
                        "term":
                        {
                            "type":"story"
                        }
                    }
                ]
            }
        }
    }`; */

    return `/content/v4/collections/?_id=${id}&website=${website}&size=${size ||
        4}&q=content_elements.type:story`;
};
export default {
    resolve,
    params: {
        id: 'text',
        website: 'text'
    }
};
