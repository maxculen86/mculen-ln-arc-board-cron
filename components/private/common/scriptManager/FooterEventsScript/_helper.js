export const setEventsSecciones = () => {
    const secciones = window.document.querySelectorAll(
        '.ln-footer-home .secciones a'
    );
    secciones.forEach(seccion => {
        seccion.addEventListener('click', () => {
            window.dataLayer &&
                window.dataLayer.push({
                    event: 'e_linkclick',
                    dynamic_action: 'footer',
                    dynamic_category: 'home_ln10',
                    dynamic_label: `${seccion.text}`
                });
        });
    });
};

export const setEventsRevistas = () => {
    const revistas = window.document.querySelectorAll(
        '.ln-footer-home .revistas a'
    );
    revistas.forEach(revista => {
        revista.addEventListener('click', () => {
            window.dataLayer &&
                window.dataLayer.push({
                    event: 'e_linkclick',
                    dynamic_action: 'footer',
                    dynamic_category: 'home_ln10',
                    dynamic_label: `${revista.text}`
                });
        });
    });
};

export const setEventsProductos = () => {
    const productos = window.document.querySelectorAll(
        '.ln-footer-home .productos a'
    );
    productos.forEach(producto => {
        producto.addEventListener('click', () => {
            window.dataLayer &&
                window.dataLayer.push({
                    event: 'e_linkclick',
                    dynamic_action: 'footer',
                    dynamic_category: 'home_ln10',
                    dynamic_label: `${producto.text}`
                });
        });
    });
};
