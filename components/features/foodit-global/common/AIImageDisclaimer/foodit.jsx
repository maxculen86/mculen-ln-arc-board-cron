import React from 'react';
import { Text } from '@ln/common-ui-text';
import { useLastPreparationImageId } from '../../../private-global/body/image/helpers';

export function AIImageDisclaimer({ globalContent = {} }) {
    const {
        content_elements: contentElements = [],
        label: { leyenda_imagenes_ia: { text = 'Si' } = {} } = {}
    } = globalContent;

    const lastPreparationImageId = useLastPreparationImageId(contentElements);
    const hasPreparationImages = !!lastPreparationImageId;

    const shouldShowDisclaimer =
        hasPreparationImages && (!text || text?.toLowerCase()?.trim() !== 'no');

    if (!shouldShowDisclaimer) return null;

    return (
        <div className="flex flex-column gap-16">
            <Text className="roboto roboto-bold text-16 italic">
                Las imágenes utilizadas en la preparación de esta receta fueron
                generadas con IA para Foodit con fines ilustrativos.
            </Text>
        </div>
    );
}

export default AIImageDisclaimer;
