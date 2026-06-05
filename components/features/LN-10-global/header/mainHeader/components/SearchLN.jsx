import React, { useRef } from 'react';
import { cx } from '@ln/ds-cva';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import InputSection from '../../../desplegable/searchInput';
import Icon from '../../../../ui/ln/icon/default';
import Button from '../../../../ui/ln/button/default';
import { useHeaderContext } from '../../context';

export default function InputSearch({ isOpen, setIsOpen }) {
    const triggerRef = useRef(null);
    const { negative } = useHeaderContext();

    const handleOpen = () => {
        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'header_logo',
            category: 'home_ln10',
            label: 'search'
        });
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        triggerRef.current?.focus();
    };

    return (
        <div data-tw style={{ display: 'contents' }}>
            <div className="flex items-center relative">
                <div
                    className={cx(
                        'transition-opacity duration-300',
                        isOpen && 'opacity-0 pointer-events-none'
                    )}
                >
                    <Button
                        ref={triggerRef}
                        title="Ir al buscador"
                        variant="ghost"
                        isIconOnly
                        color={negative ? 'white' : 'secondary'}
                        onClick={handleOpen}
                    >
                        <Icon name="search" />
                    </Button>
                </div>
                <InputSection
                    collapsible
                    isOpen={isOpen}
                    autoFocus
                    compact
                    onClose={handleClose}
                />
            </div>
        </div>
    );
}
