import React from 'react';
import { Accordion } from '@ln/common-ui-accordion';
import { cx } from '@ln/cva';
import { useDisclosure } from '@ln/hooks';
import CheckBoxHeader from './checkboxHeader';

function CheckBoxAccordion({ checkboxes, handleCheckBox, subtypes }) {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Accordion
            visible={isOpen}
            className={cx(isOpen && 'flex flex-column-reverse')}
        >
            <Accordion.Header
                iconProps={{ color: 'inherit', size: 20 }}
                className="text-secondary-positive text-accent-batata__hover pt-16 gap-8"
                onClick={onToggle}
                style={{ justifyContent: 'start' }}
            >
                <span className="roboto roboto-bold text-14">
                    {isOpen ? 'Ver menos' : 'Ver Más'}
                </span>
            </Accordion.Header>
            <Accordion.Body>
                <CheckBoxHeader
                    checkboxes={checkboxes}
                    handleCheckBox={handleCheckBox}
                    subtypes={subtypes}
                />
            </Accordion.Body>
        </Accordion>
    );
}

export default CheckBoxAccordion;
