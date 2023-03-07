export const createDynamicLabel = (text = '') => {
    return text
        .replace(/ /g, '_')
        .replace(/ó/g, 'o')
        .toLowerCase();
};
export const setEventsDollar = () => {
    const dollars = window.document.querySelectorAll('.dollar a');

    dollars.forEach(dollar => {
        dollar.addEventListener('click', () => {
            window.dataLayer &&
                window.dataLayer.push({
                    event: 'e_linkclick',
                    dynamic_action: 'home_ln10',
                    dynamic_category: 'header_dolar',
                    dynamic_label: createDynamicLabel(dollar.title)
                });
        });
    });
};

export const setEventsAccess = () => {
    const accesses = window.document.querySelectorAll('.access a');

    accesses.forEach(access => {
        access.addEventListener('click', () => {
            window.dataLayer &&
                window.dataLayer.push({
                    event: 'e_linkclick',
                    dynamic_action: 'home_ln10',
                    dynamic_category: 'header_accesos',
                    dynamic_label: createDynamicLabel(access.text)
                });
        });
    });
};
