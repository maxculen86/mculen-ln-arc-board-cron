import React from 'react';
import SectionButton from './SectionButton';
import InputSearch from '../../../../../../LN-10-global/header/mainHeader/components/SearchLN';

function LeftOptions({ isOpen, setIsOpen }) {
    return (
        <div className="flex items-center xl:h-48">
            <SectionButton />
            <InputSearch isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
}

export default LeftOptions;
