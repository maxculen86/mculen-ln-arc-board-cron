import React, { useEffect, useState } from 'react';
import { useDrawerVisibility } from '@ln/ds-common-drawer';
import { DRAWERS_ID } from '../../DrawerSections/helpers';
import { NewsletterActionButton } from './NewsletterActionButtons';

export function NewsletterSelectionButton({ id, title }) {
    const [selected, setSelected] = useState(false);
    const { isOpen } = useDrawerVisibility(DRAWERS_ID.SECTIONS);

    const handleClick = () => {
        const nextSelected = !selected;

        setSelected(nextSelected);

        const evento = new CustomEvent('newsletterSelected', {
            detail: { id, title, selected: nextSelected }
        });
        window?.dispatchEvent(evento);
    };

    useEffect(() => {
        if (!isOpen) {
            setSelected(false);
        }
    }, [isOpen]);

    return (
        <NewsletterActionButton
            selected={selected}
            onClick={handleClick}
            labelOn="Seleccionado"
            labelOff="Seleccionar"
        />
    );
}
