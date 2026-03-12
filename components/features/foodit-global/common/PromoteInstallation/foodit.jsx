import React, { useEffect } from 'react';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Motion } from '@ln/common-ui-motion';
import { useDisclosure } from '@ln/hooks';
import { cx } from '@ln/cva';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { useAppContext } from 'fusion:context';

// TODO: ver la posibilidad de crear lib para snackBar

export function PromoteInstallation({ variant = 'snackBarDefault', onClick }) {
    const { isOpen, onClose } = useDisclosure(true);

    useEffect(() => {
        let timer;

        if (variant === 'snackBarDefault' && isOpen) {
            timer = setTimeout(() => {
                onClose();
            }, 10000);
        }

        return () => clearTimeout(timer);
    }, [variant, isOpen, onClose]);

    if (!isOpen) return null;

    const { contextPath, deployment } = useAppContext();
    const path = `${contextPath}/resources/foodit/assets/foodit-color.png`;
    const deploymentPath = deployment(path);
    const variantClassesContainer = {
        snackBarDefault:
            'w-100 max-w-328 max-w-508_md rounded-4 inline-flex fixed bottom-0 left-50 -translate-x-50 mb-16 z-7 shadow-snack-bar jc-center ai-center p-16 gap-8',
        snackBarDrawer: 'flex flex-column pt-24 pb-12 px-16 gap-12 mt-24'
    };

    const variantClassesButton = {
        snackBarDefault: '',
        snackBarDrawer: 'flex gap-24 w-100 jc-end'
    };

    return (
        <Motion
            show={isOpen}
            animation={{
                transitionIn: ['fade-in'],
                transitionOut: ['fade-out']
            }}
        >
            <li className={cx('bg-positive', variantClassesContainer[variant])}>
                <div className="flex gap-8 ai-center">
                    {variant === 'snackBarDrawer' ? (
                        <Adaptableimage
                            width={24}
                            height={24}
                            src={deploymentPath}
                            alt="icono foodit"
                        />
                    ) : null}
                    <Text className="roboto roboto-regular text-14 text-light-800">
                        Ahora podés instalar Foodit, accedé a tus recetas fácil
                        y rápido
                    </Text>
                </div>
                <div className={cx(variantClassesButton[variant])}>
                    <Button
                        variant="link"
                        className="text-secondary-positive"
                        onClick={onClick}
                    >
                        INSTALAR
                    </Button>
                    {variant === 'snackBarDrawer' ? (
                        <Button
                            onClick={onClose}
                            variant="link"
                            className="text-secondary-positive"
                        >
                            CANCELAR
                        </Button>
                    ) : null}
                </div>
            </li>
        </Motion>
    );
}
