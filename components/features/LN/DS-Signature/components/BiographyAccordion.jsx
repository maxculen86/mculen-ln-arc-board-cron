import React from 'react';
import { getTypeOfDevicev2 } from '@ln/utils';
import Icon from '../../../ui/ln/icon/default';
import useAccordionToggle from './useAccordionToggle';

const BIO_MAX_LENGTH = 200;

const LABELS = {
    show: 'Mostrar más biografía',
    hide: 'Ocultar biografía'
};

function getPreviewText(text, maxLength) {
    // Avanza hasta el fin de la palabra en curso para no cortar a mitad
    const match = text.match(new RegExp(`^.{${maxLength}}\\S*`));
    return match ? match[0] : text;
}

function BiographyAccordion({
    text,
    shouldShowBiography,
    maxLength = BIO_MAX_LENGTH
}) {
    const deviceType = getTypeOfDevicev2({ breakpoints: { tablet: 1280 } });
    const conditionedMaxLength =
        deviceType === 'desktop' && maxLength < 1000 ? 1000 : maxLength;

    const { isOpen, wrapperRef, pRef, handleToggle } = useAccordionToggle();

    if (!text || !shouldShowBiography) return null;

    if (text.length <= conditionedMaxLength) {
        return <p className="font-tertiary text-16">{text}</p>;
    }

    const preview = getPreviewText(text, conditionedMaxLength);
    const displayText = isOpen ? text : `${preview}...`;
    const iconTransform = isOpen ? 'rotate(180deg)' : 'none';

    return (
        <div className="flex flex-column gap-8">
            <div ref={wrapperRef}>
                <p ref={pRef} className="font-tertiary text-16">
                    {displayText}
                </p>
            </div>
            <button
                type="button"
                onClick={handleToggle}
                className="flex items-center justify-center gap-8 w-full cursor-pointer text-primary-default hover:text-primary-light border-0 bg-transparent mt-4"
            >
                <span className="text-body-sm font-bold">
                    {isOpen ? LABELS.hide : LABELS.show}
                </span>
                <Icon
                    name="arrow-down"
                    size={16}
                    className="transition-transform duration-200"
                    style={{ transform: iconTransform }}
                />
            </button>
        </div>
    );
}

export default BiographyAccordion;
