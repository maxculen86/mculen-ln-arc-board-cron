export function validarEstilo(layout = '', chainStyle = '') {
    const fondoOptions = ['yellow', 'white', 'red', 'green', 'lightblue'];
    const fondoLayout = 'bnFondo';

    return (
        !(layout === fondoLayout && fondoOptions.includes(chainStyle)) &&
        !(layout !== fondoLayout && !fondoOptions.includes(chainStyle))
    );
}
