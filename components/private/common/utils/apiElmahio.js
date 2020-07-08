import { ELMAH_API_KEY, ELMAH_LOG_ID, SITE_LANACION } from 'fusion:environment';
import request from 'request-promise-native';
// import { useAppContext, useComponentContext } from 'fusion:context';

const apiElmahio = ( ) => {
    const urlApi = `https://api.elmah.io/v3/messages/${ELMAH_LOG_ID}`;
    // const { requestUri, outputType } = useAppContext();
    // const { type, name } = useComponentContext();

    const SEVERITY = Object.freeze({
        'Verbose': 'Verbose',
        'Debug': 'Debug',
        'Information': 'Information',
        'Warning': 'Warning',
        'Error': 'Error',
        'Fatal': 'Fatal'
    });

    const createMessage = error => {
        const options = {
            method: 'POST',
            uri: urlApi,
            headers: {
                'api_key': ELMAH_API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                application: 'La Nacion',
                hostname: SITE_LANACION,
                title: `${error.name}: ${error.message}`,
                detail: `Stack: ${error.stack}.`,
                type: error.name,
                // url: requestUri,
                severity: SEVERITY.Error
                // source: name
            },
            json: true
        };

        request(options)
            .then(response => {
                console.log('Se creo el log en Elmah: ' + response.location);
            })
            .catch(err => {
                console.error('Error en Crear Log Elmah: ' + err);
            });
    };

    return {
        createMessage
    };
};

export default apiElmahio();
