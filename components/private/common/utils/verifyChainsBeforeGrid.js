const verifyChainsBeforeGrid = (renderables = []) => {
    const sectionChildrens = [];

    renderables.forEach(({ collection, children, type }) => {
        if (collection === 'sections') {
            const cleanElements = children.map(child => ({
                type: child.type,
                collection: child.collection
            }));

            sectionChildrens.push(...cleanElements);
        }
    });

    const firstChainIndex = sectionChildrens.findIndex(
        item => item.collection === 'chains'
    );

    const gridIndex = sectionChildrens.findIndex(
        item => item.type === 'LN-acumulado/grillaNotas'
    );

    return (
        (firstChainIndex !== -1 && firstChainIndex < gridIndex) ||
        gridIndex === -1
    );
};

export default verifyChainsBeforeGrid;
