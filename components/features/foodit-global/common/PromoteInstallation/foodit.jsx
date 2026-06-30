import React, { useEffect } from 'react';
import { Text } from '@ln/common-ui-text';
import { useDisclosure } from '@ln/hooks';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/ds-cva';
import { AnimatePresence } from '@ln/ds-common-animatepresence';
import Button from '../../../ui/foodit/button/foodit';

export function PromoteInstallation({ variant = 'snackBarDefault', onClick }) {
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
    const variantClassesContainer = {
        snackBarDefault:
            'w-full max-w-328 md:max-w-508 rounded-4 inline-flex fixed bottom-0 left-1/2 -translate-x-1/2 mb-16 z-7 shadow-lg justify-center items-center p-16 gap-8',
        snackBarDrawer: 'flex flex-col pt-24 pb-12 px-16 gap-12 mt-24'
    };

    const variantClassesButton = {
        snackBarDefault: '',
        snackBarDrawer: 'flex gap-24 w-full justify-end'
    };

    const buttonProps = {
        variant: 'ghost',
        color: 'custom',
        size: 'custom',
        className:
            'text-secondary-positive text-12 hover:bg-transparent hover:text-primary-light'
    };

    return (
        <AnimatePresence show={isOpen}>
            <li
                className={cx('bg-brand-sal', variantClassesContainer[variant])}
            >
                <div className="flex gap-8 items-center">
                    {variant === 'snackBarDrawer' ? (
                        <Adaptableimage
                            width={24}
                            height={24}
                            src={deploymentPath}
                            alt="icono foodit"
                        />
                    ) : null}
                    <Text className="font-secondary text-14 text-primary-default">
                        Ahora podés instalar Foodit, accedé a tus recetas fácil
                        y rápido
                    </Text>
                </div>
                <div className={variantClassesButton[variant]}>
                    <Button {...buttonProps} onClick={onClick}>
                        INSTALAR
                    </Button>
                    {variant === 'snackBarDrawer' && (
                        <Button {...buttonProps} onClick={onClose}>
                            CANCELAR
                        </Button>
                    )}
                </div>
            </li>
        </AnimatePresence>
    );
}
