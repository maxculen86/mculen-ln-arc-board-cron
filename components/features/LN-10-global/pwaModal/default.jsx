import classNames from 'classnames';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import { Button } from '@ln/contenidos-ui-button';

export function PwaModal({ className, contextPath, deployment }) {
    // TODO: el componente se deja de importar para ver efectos en INP, borrar codigo si no se vuelve a utilizar
    // se remueve el import del iniciador components/private/LN/common/utils/register.js en el globalContext

    const path = `${contextPath}/resources/images/la-nacion.webp`;
    const deploymentPath = deployment(path);
    const classes = classNames(
        'ln-pwa-modal fixed none p-16 w-100 z-1600 max-w-365 bg-white bottom-60 left-50',
        'border border-left border-5 border-black -transform-50 transform-none_l',
        'left-90_l shadow-pwamodal bottom-auto_l top-0_l',
        className
    );
    return (
        <div className={classes} id="notificacion-modal">
            <Link
                className="block mb-16"
                href="https://www.lanacion.com.ar/"
                title="LA NACION"
            >
                <Adaptableimage
                    src={deploymentPath}
                    width={164}
                    alt="LA NACION"
                />
            </Link>
            <Text
                text="¿Querés recibir notificaciones de alertas?"
                font="prumo"
                size="m"
                className="text-black"
                weight="medium"
                as="p"
            />

            <div className="flex jc-end">
                <Button
                    className="mr-12"
                    title="No, gracias"
                    label="No, gracias"
                    variant="secondary"
                    id="notificacion-no"
                />
                <Button
                    title="Aceptar"
                    label="Aceptar"
                    variant="primary"
                    id="notificacion-si"
                />
            </div>
        </div>
    );
}

export default PwaModal;
