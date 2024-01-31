export function validateStyle(layout = '', chainStyle = '') {
    const backgroundOptions = ['yellow', 'white', 'red', 'green', 'lightblue'];
    const backgroundLayout = 'bnFondo';

    return (
        !(
            layout === backgroundLayout &&
            backgroundOptions.includes(chainStyle)
        ) &&
        !(
            layout !== backgroundLayout &&
            !backgroundOptions.includes(chainStyle)
        )
    );
}
