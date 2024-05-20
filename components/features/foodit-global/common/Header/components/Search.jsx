import React, { useState } from 'react';
import { Icon } from '@ln/common-ui-icon';
import { SITE_FOODIT } from 'fusion:environment';
import classNames from 'classnames';
import IconSprite from '../../../../../features/private-global/common/iconSprite/IconSprite';

export const Search = ({ className, ...r }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputValue = e => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            window.location.href = `${SITE_FOODIT}/buscador/?query=${inputValue}`;
        }
    };

    const classnames = classNames('foodit-search w-100 as-center', className);
    return (
        <div className={classnames} {...r}>
            <div className="flex ai-center h-44 border border-all border-thin border-light-100 p-16 rounded-4 gap-8 bg-light-1">
                <Icon size={24}>
                    <IconSprite name="search" critical />
                </Icon>
                <input
                    className="text-light-600 text-16 w-100"
                    type="text"
                    placeholder="¿Qué querés cocinar hoy?"
                    value={inputValue}
                    onChange={handleInputValue}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};
