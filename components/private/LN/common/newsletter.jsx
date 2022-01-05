import React, { useState } from 'react';
import { API_INGRESAR } from 'fusion:environment';
import ModNewsletter from '../../common/mod-newsletter';

const NewsLetter = () => {
    const [suggestion, setSuggestion] = useState({});
    const { show, title } = suggestion;

    if (!show)
        fetch(`${API_INGRESAR}/Suscripcion/ObtenerSuscripcionesSugeridas`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                const { titulo = '' } =
                    (data &&
                        data.filter(
                            subscription => subscription.suscripto === 0
                        )[Math.floor(Math.random() * data.length)]) || // NOSONAR
                    {};
                setSuggestion({ title: titulo, show: true });
            })
            .catch(error => {
                console.error(
                    `Error: { location: Newsletter , error: ${error} }`
                );
            });

    return (show && <ModNewsletter titulo={title} />) || <></>;
};

export default NewsLetter;
