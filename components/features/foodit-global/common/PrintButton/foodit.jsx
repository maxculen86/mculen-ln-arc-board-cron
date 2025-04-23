import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Text } from '@ln/common-ui-text';
import usePrint from '../utils/PrintFoodit/usePrint';
import { FooditPrint } from '../LayoutImpression/foodit';

export function PrintButton({ type, description, IconButton, article }) {
    const [includePhotos, setIncludePhotos] = useState(false);
    const [shouldRenderPrint, setShouldRenderPrint] = useState(false);
    const handleInputChange = () => {
        setIncludePhotos(!includePhotos);
    };
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
        <Dropdown hideArrow className="print-hide">
            <Dropdown.Toggle className="text-light-800 text-accent-lechuga__hover">
                <Button key={type} title={description} variant="link">
                    <Icon size={24}>{IconButton}</Icon>
                </Button>
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-light-1 p-24 flex flex-column gap-24 w-191 rounded-4 shadow-center">
                <div className="flex flex-column gap-8">
                    <Text className="roboto roboto-regular text-12" as="p">
                        Opciones de impresión
                    </Text>
                    <div className="flex ai-center gap-8">
                        <input
                            onChange={handleInputChange}
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
                <Button key={type} onClick={handlePrintClick}>
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
        </Dropdown>
    );
}

PrintButton.propTypes = {
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    IconButton: PropTypes.node.isRequired,
    article: PropTypes.shape({
        content_elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    }).isRequired
};
