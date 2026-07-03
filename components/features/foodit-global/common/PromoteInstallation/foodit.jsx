import React, { useEffect } from 'react';
import { useDisclosure } from '@ln/hooks';
import { useAppContext } from 'fusion:context';
import { AnimatePresence } from '@ln/ds-common-animatepresence';
import Button from '../../../ui/foodit/button/foodit';
import Image from '../../../ui/foodit/image/default';
import { variantClassesButton, variantClassesContainer } from './styles';

export function PromoteInstallation({
    variant = 'snackBarDefault',
    onClick,
    as: Tag = 'div'
}) {
    const { isOpen, onClose } = useDisclosure(true);
    const { contextPath, deployment } = useAppContext();

    useEffect(() => {
        let timer;

        if (variant === 'snackBarDefault' && isOpen) {
            timer = setTimeout(() => {
                onClose();
            }, 10000);
        }

        return () => clearTimeout(timer);
    }, [variant, isOpen, onClose]);
    const path = `${contextPath}/resources/foodit/assets/foodit-color.png`;
    const deploymentPath = deployment(path);
    const classContainer = variantClassesContainer({ variant });
    const classButtons = variantClassesButton({ variant });

    const buttonProps = {
        variant: 'ghost',
        color: 'custom',
        size: 'custom',
        className:
            'text-secondary-positive text-12 hover:bg-transparent hover:text-primary-light'
    };

    return (
        <AnimatePresence show={isOpen}>
            <Tag data-tw>
                <div className={classContainer}>
                    <div className="flex gap-8 items-center">
                        {variant === 'snackBarDrawer' ? (
                            <Image
                                hidePlaceholder
                                classnames={{
                                    wrapper: 'max-w-24'
                                }}
                                src={deploymentPath}
                                alt="icono foodit"
                            />
                        ) : null}
                        <span className="font-secondary text-14 text-primary-default">
                            Ahora podés instalar Foodit, accedé a tus recetas
                            fácil y rápido
                        </span>
                    </div>
                    <div className={classButtons}>
                        <Button {...buttonProps} onClick={onClick}>
                            INSTALAR
                        </Button>
                        {variant === 'snackBarDrawer' && (
                            <Button {...buttonProps} onClick={onClose}>
                                CANCELAR
                            </Button>
                        )}
                    </div>
                </div>
            </Tag>
        </AnimatePresence>
    );
}
