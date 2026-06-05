import React, { useState } from 'react';
import { cx } from '@ln/cva';
import CheckboxHeader from './CheckboxHeader';
import Accordion from '../../../features/ui/ln/accordion/default';

export default function CheckboxAccordion({ checkboxes, handleCheckBox }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Accordion
            onOpenChange={openItems => {
                setIsOpen(openItems.includes('more'));
            }}
        >
            <Accordion.Item
                value="more"
                className={cx(isOpen && 'flex flex-column-reverse')}
            >
                <Accordion.Header className="justify-start gap-4 text-primary-default hover:text-primary-light text-label-sm font-bold uppercase pt-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-default focus-visible:ring-offset-1 rounded-sm">
                    {isOpen ? 'Ver menos' : 'Ver más'}
                    <Accordion.Icon
                        rotateOnOpen={false}
                        style={{
                            transform: isOpen
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)'
                        }}
                        size={12}
                        name="arrow-down"
                    />
                </Accordion.Header>
                <Accordion.Content>
                    <CheckboxHeader
                        checkboxes={checkboxes}
                        handleCheckBox={handleCheckBox}
                    />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
}
