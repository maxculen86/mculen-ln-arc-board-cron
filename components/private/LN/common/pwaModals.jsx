import React from 'react';
import { useFusionContext } from 'fusion:context';
import ComLogo from '../../common/com-logo';
import ComButton from '../../common/com-button';
import ComTitle from '../../common/com-title';
import '../../../../resources/dist/css/ln/modules/modal.css';

const PwaModals = () => {
    const { outputType } = useFusionContext();

    // TODO: el componente se deja de importar para ver efectos en INP, borrar codigo si no se vuelve a utilizar
    // se remueve el import del iniciador components/private/LN/common/utils/register.js en el globalContext

    return outputType === 'default' ? (
        <>
            <div
                id="notificacion-modal-pwa"
                className="modal --notification --apps"
            >
                <ComLogo
                    logoName="la-nacion"
                    href="https://www.lanacion.com.ar/"
                    title="LA NACION"
                />
                {/* <LogoLN /> */}
                <ComTitle
                    tag="p"
                    size="--m"
                    content="Descargá la aplicación de LA NACION. Es rápida y liviana."
                />
                <div className="--bottom">
                    <ComButton
                        textname="No, gracias"
                        classCondition="--secondary --compact"
                        id="notificacion-pwa-no"
                    />
                    <ComButton
                        textname="Aceptar"
                        classCondition="--primary --compact"
                        id="notificacion-pwa-si"
                    />
                </div>
            </div>
            <div id="notificacion-modal" className="modal --notification">
                <ComLogo
                    logoName="la-nacion"
                    href="https://www.lanacion.com.ar/"
                    title="LA NACION"
                />
                <ComTitle
                    tag="p"
                    size="--m"
                    content="¿Querés recibir notificaciones de alertas?"
                />

                <div className="--bottom">
                    <ComButton
                        textname="No, gracias"
                        classCondition="--secondary --compact"
                        id="notificacion-no"
                    />
                    <ComButton
                        textname="Aceptar"
                        classCondition="--primary --compact"
                        id="notificacion-si"
                    />
                </div>
            </div>

            <div id="notificacion-modal-error" className="modal --notification">
                <ComLogo
                    logoName="la-nacion"
                    href="https://www.lanacion.com.ar/"
                    title="LA NACION"
                />
                <ComTitle
                    tag="p"
                    size="--s"
                    content="Ha ocurrido un error de conexión"
                />
                <div className="--bottom">
                    <ComButton
                        textname="Cerrar"
                        classCondition="--primary --compact"
                        id="notificacion-error-btn"
                    />
                </div>
            </div>
        </>
    ) : null;
};

export default PwaModals;
