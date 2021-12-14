import React from 'react';
import { useFusionContext } from 'fusion:context';
import ComLogo from '../../common/com-logo';
import ComButton from '../../common/com-button';
import Text from '../../common/text';
import '../../../../resources/dist/css/ln/modules/modal.css';

const PwaModals = () => {
    const { outputType } = useFusionContext();

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
                <Text tag="p" font="sueca" size="3xs">
                    Descargá la aplicación de LA NACION. Es rápida y liviana.
                </Text>
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
                <Text tag="p" font="sueca" size="3xs">
                    ¿Querés recibir notificaciones de alertas?
                </Text>
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
                <Text tag="p" font="sueca" size="3xs">
                    Ha ocurrido un error de conexión
                </Text>
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
