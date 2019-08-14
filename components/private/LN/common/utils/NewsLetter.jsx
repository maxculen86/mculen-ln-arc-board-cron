import { sample, chain, filter, value } from 'lodash';
import Httpclient from './HttpClient';

const relativeUrl = `/Suscripcion/ObtenerSuscripcionesSugeridas`;
const login = false; // Saber si esta logeado o no

class NewsLetter {
    constructor() {
        this.client = new Httpclient();
    }

    getSubscriptions() {
        // TODO: crear Opcion
        /* let myHeaders = new Headers();
        myHeaders.append('X-Token', 'text/xml'); 
        
        let options = { 
            method: 'POST',
            body: {},
            headers: myHeaders(),
            mode: 'cors',
            cache: 'default' 
        }
        */

        const options = {
            method: 'POST'
        };

        return new Promise((resolve, reject) => {
            this.client
                .exec(relativeUrl, options)
                .then(response => response.json())
                .then(data => {
                    // TODO: Mockup de contenido de la API
                    const response = [
                        {
                            servicioId: 2,
                            titulo: 'Política',
                            suscripto: 0
                        },
                        {
                            servicioId: 3,
                            titulo: 'Economía',
                            suscripto: 0
                        }
                    ];

                    resolve(
                        data.filter(
                            subscription => subscription.suscripto === 0
                        )[Math.floor(Math.random() * data.length)]
                    );
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default NewsLetter;
