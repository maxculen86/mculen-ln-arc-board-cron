const resolve = key => {
    const { id, website } = key;
    if (!id)
        throw new Error(
            'Debe definir un id para realizar la consulta - Section Source'
        );
    if (!website) throw new Error('Debe indicar el website - Section Source');
    if (!id.startsWith('/'))
        throw new Error(
            'El id de sección debe comenzar con / - Section Source'
        );
    return `/site/v3/navigation/${website}/?_id=${id}`;
};
export default {
    resolve,
    schemaName: 'section-schema',
    params: {
        id: 'text',
        website: 'text'
    }
};
