import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import { Tooltip } from '@ln/common-ui-tooltip';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

const textTooltip = bookmarkId =>
    bookmarkId
        ? 'Debes eliminar la receta de la lista de compras para modificar las porciones'
        : 'El cambio de porciones solo modificará la cantidad de ingredientes';

export function IngredientsPortionsText({
    showButtonsConversor = true,
    bookmarkId
}) {
    return (
        <div className="flex jc-center ai-center gap-8">
            <Icon size={24}>
                <IconSprite name="portion" />
            </Icon>
            <Text className="roboto-bold text-12 text-14_md">PORCIONES</Text>
            {showButtonsConversor && (
                <Tooltip
                    position="top-center"
                    toggleOn="click"
                    style={{ maxWidth: '200px' }}
                    content={
                        <span className="text-12">
                            {textTooltip(bookmarkId)}
                        </span>
                    }
                    className="flex rounded-4 shadow-center px-8 py-4 bg-secondary-positive text-light-1 border border-all border-thin border-light-100 z-5"
                >
                    <Button title="Mostrar tooltip" variant="link">
                        <Icon size={16}>
                            <IconSprite name="info" fill="#B3B3B3" />
                        </Icon>
                    </Button>
                </Tooltip>
            )}
        </div>
    );
}
