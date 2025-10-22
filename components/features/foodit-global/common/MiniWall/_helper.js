import { SITIO_SEGURO_REGISTRACION, CHECKOUT_URL, API_ENV } from 'fusion:environment';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import isSSR from '../../../../private/LN/common/utils/isSSR';

const currentUrl = isSSR() ? '' : window?.btoa(window.location?.href);

export const paywallViewEvent = ({ pageName, formaContacto, canalVenta }) => {
    addEventToDataLayerV2({
        rest: {
            event: 'trackViewPaywall',
            pageName,
            formaContacto,
            canalVenta,
            url_nota_PW: window.location.href,
            page_location: `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4?cv=${canalVenta}&fc=${formaContacto}`
        }
    });
};

export const trackPageEvent = ({ pageName, formaContacto, canalVenta }) => {
    addEventToDataLayerV2({
        rest: {
            event: 'trackPage',
            pageName,
            formaContacto,
            canalVenta,
            url_nota_PW: window.location.href,
            page_location: `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4?cv=${canalVenta}&fc=${formaContacto}`
        }
    });
};

export const addToCartEvent = ({
    value,
    canalVenta,
    formaContacto,
    tieneClub,
    items: { id, name, category, category2, category3, price }
}) => {
    const redirect = {
        sandbox: `${CHECKOUT_URL}/C/${id}/?skn=&productoWall=mini_wall_foodit&cv=${canalVenta}&fc=${formaContacto}&productCategory=Cerrado&ref=${currentUrl}`,
        prod: `${CHECKOUT_URL}/C/${id}/?skn=F&productoWall=mini_wall_foodit&cv=${canalVenta}&fc=${formaContacto}&productCategory=Cerrado&ref=${currentUrl}`
    };

    addEventToDataLayerV2({
        rest: {
            event: 'trackClickProd',
            ecommerce: {
                currency: 'ARS',
                value,
                flujo_suscripcion: 'seleccionar_plan',
                canal_venta: canalVenta,
                forma_contacto: formaContacto,
                tieneClub,
                card_comprimida: false,
                items: [
                    {
                        item_id: id,
                        item_name: name,
                        item_category: category,
                        item_category2: category2,
                        item_category3: category3,
                        price
                    }
                ]
            },
            page_location: `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4?cv=${canalVenta}&fc=${formaContacto}`
        }
    });

    if (redirect[API_ENV]) {
        window?.location?.replace(redirect[API_ENV]);
    }
};

export const errorProps = {
    title: 'Foodit',
    description: 'Se produjo un error al procesar tu solicitud.',
    button: {
        children: 'SUSCRIBITE',
        variant: 'primary',
        href: `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4?cv=800&fc=50000046&callback=${currentUrl}`
    }
};
