import React, { useEffect, useState } from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Text } from '@ln/common-ui-text';
import { useDisclosure } from '@ln/hooks';
import usePrint from '../utils/PrintFoodit/usePrint';
import { FooditPrint } from '../LayoutImpression/foodit';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import { DialogBarrier } from '../DialogBarrier/foodit';

export function PrintButton({ printType, description, IconButton, article }) {
    const [includePhotos, setIncludePhotos] = useState(false);
    const [shouldRenderPrint, setShouldRenderPrint] = useState(false);
    const toggleIncludePhotos = () => {
        setIncludePhotos(!includePhotos);
    };
    const { isSubscribed, userType } = useGetUserConfig();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { printRef, handlePrint } = usePrint();

    useEffect(() => {
        if (shouldRenderPrint) {
            setTimeout(() => {
                handlePrint();
                setShouldRenderPrint(false);
            }, 0);
        }
    }, [shouldRenderPrint, handlePrint]);

    const handlePrintClick = () => {
        setShouldRenderPrint(true);
    };
    return (
        <Dropdown hideArrow className="print-hide --no-app">
            <Dropdown.Toggle className="text-light-800 text-accent-lechuga__hover">
                <Button
                    key={printType}
                    onClick={onOpen}
                    title={description}
                    variant="link"
                >
                    <Icon size={24}>{IconButton}</Icon>
                </Button>
            </Dropdown.Toggle>
            {isSubscribed ? (
                <Dropdown.Menu
                    alignment="left"
                    className="bg-light-1 p-24 flex flex-column gap-24 w-191 rounded-4 shadow-center"
                >
                    <div className="flex flex-column gap-8">
                        <Text className="roboto roboto-regular text-12" as="p">
                            Opciones de impresión
                        </Text>
                        <div className="flex ai-center gap-8">
                            <input
                                onChange={toggleIncludePhotos}
                                type="checkbox"
                                id="include-photos"
                            />
                            <Text
                                className="roboto roboto-regular text-16"
                                as="label"
                                htmlFor="include-photos"
                            >
                                Incluir fotos
                            </Text>
                        </div>
                    </div>
                    <Button
                        size={32}
                        key={printType}
                        onClick={handlePrintClick}
                    >
                        IMPRIMIR
                    </Button>
                    {shouldRenderPrint && (
                        <div className="none">
                            <FooditPrint
                                includePhotos={includePhotos}
                                ref={printRef}
                                article={article}
                            />
                        </div>
                    )}
                </Dropdown.Menu>
            ) : (
                <DialogBarrier
                    isOpen={isOpen}
                    onClose={onClose}
                    userType={userType}
                />
            )}
        </Dropdown>
    );
}
