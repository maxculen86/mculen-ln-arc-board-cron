export const setEventsFooter = () => {
    const linksFooter = window.document.querySelectorAll(
        '.ln-footer-home .secciones a, .ln-footer-home .revistas a, .ln-footer-home .productos a'
    );
    linksFooter.forEach(link => {
        link.addEventListener('click', () => {
            window.dataLayer &&
                window.dataLayer.push({
                    event: 'e_linkclick',
                    dynamic_action: 'footer',
                    dynamic_category: 'home_ln10',
                    dynamic_label: `${link.text}`
                });
        });
    });
};

export default setEventsFooter;
