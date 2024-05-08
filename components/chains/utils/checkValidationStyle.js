export function validateStyle(layout = '', chainStyle = '') {
    const typeStylesChainBackground = [
        'yellow',
        'white',
        'red',
        'green',
        'lightblue'
    ];
    const layoutsBackground = 'bnFondo';

    const typeStylesChainFoodit = 'foodit';
    const layoutsFoodit = ['foodit_3_grid', 'foodit_1_grid'];

    const isValidStyleForLayout1 =
        !(
            layout === layoutsBackground &&
            typeStylesChainBackground.includes(chainStyle)
        ) &&
        !(
            layout !== layoutsBackground &&
            !typeStylesChainBackground.includes(chainStyle)
        );

    const isStyleValidForFooditLayout =
        !(
            layoutsFoodit.includes(layout) &&
            chainStyle === typeStylesChainFoodit
        ) &&
        !(
            layoutsFoodit.indexOf(layout) === -1 &&
            chainStyle !== typeStylesChainFoodit
        );

    return isValidStyleForLayout1 || isStyleValidForFooditLayout;
}
