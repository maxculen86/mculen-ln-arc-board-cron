import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/cva';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import { Button } from '@ln/contenidos-ui-button';
import usePwaModal from '../../../private/common/hooks/usePwaModal';
import startPWASetup from './register';

function PwaModal({ className }) {
    const { isShowModal, handleNoClick, handleYesClick } = usePwaModal();
    const { deployment, contextPath, isAdmin, arcSite } = useAppContext();
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    const path = `${contextPath}/resources/images/la-nacion.webp`;
    const deploymentPath = deployment(path);
    const classes = cx(
        'ln-pwa-modal fixed p-16 w-100 z-1600 max-w-365 bg-white bottom-60 left-50',
        'border border-left border-5 border-black -transform-50 transform-none_l',
        'left-90_l shadow-pwamodal bottom-auto_l top-0_l',
        className
    );

    useEffect(() => {
        startPWASetup({ deployment, arcSite });
    }, [deployment]);

    useEffect(() => {
        const onLoad = () => setIsPageLoaded(true);

        if (document.readyState === 'complete') {
            onLoad();
        } else {
            window.addEventListener('load', onLoad, { once: true });
        }

        return () => {
            window.removeEventListener('load', onLoad);
        };
    }, []);

    if (!isShowModal || isAdmin || !isPageLoaded) return null;

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
                    onClick={handleNoClick}
                />
                <Button
                    title="Aceptar"
                    label="Aceptar"
                    variant="primary"
                    id="notificacion-si"
                    onClick={handleYesClick}
                />
            </div>
        </div>
    );
}
PwaModal.propTypes = {
    className: PropTypes.string
};

PwaModal.defaultProps = {
    className: ''
};

export default PwaModal;
