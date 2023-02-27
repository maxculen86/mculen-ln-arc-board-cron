export const setEventsWeather = () => {
    const linkWeather = window.document.querySelector(
        '.link.ln-link.--weather'
    );
    linkWeather.addEventListener('click', () => {
        window.dataLayer &&
            window.dataLayer.push({
                event: 'e_linkclick',
                dynamic_action: 'home_ln10',
                dynamic_category: 'header_clima',
                dynamic_label: `clima`
            });
    });
};

export const setEventsTopics = () => {
    const topics = window.document.querySelectorAll('.tag-list a');
    topics.forEach(topicElement => {
        topicElement.addEventListener('click', () => {
            window.dataLayer &&
                window.dataLayer.push({
                    event: 'e_linkclick',
                    dynamic_action: 'home_ln10',
                    dynamic_category: 'header_temas_hoy',
                    dynamic_label: `${topicElement.title}`
                });
        });
    });
};
