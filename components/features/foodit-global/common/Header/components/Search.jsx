import React, { useState } from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { SITE_FOODIT } from 'fusion:environment';
import classNames from 'classnames';
import IconSprite from '../../../../../features/private-global/common/iconSprite/IconSprite';

export const Search = ({ className, ...r }) => {
    const [inputValue, setInputValue] = useState('');

    const urlSearch = `${SITE_FOODIT}/buscador/?query=${inputValue}`;

    const handleInputValue = e => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            window.location.href = urlSearch;
        }
    };

    const classnames = classNames('foodit-search w-100 as-center', className);
    return (
        <div className={classnames} {...r}>
            <div className="flex ai-center jc-between h-44 border border-all border-thin border-light-100 bg-light-1 rounded-4 pl-16">
                <div className="m-auto w-100">
                    <input
                        className="text-light-600 text-16 w-100 bg-light-1 pr-16 --search-cancel-button-hide"
                        type="search"
                        enterKeyHint="search"
                        placeholder="¿Qué querés cocinar hoy?"
                        value={inputValue}
                        onChange={handleInputValue}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex border border-left border-thin border-light-100 h-100">
                    <Button
                        data-test-id="button-header-search"
                        title="Buscar"
                        iconOnly
                        variant="link"
                        className="px-12 py-8"
                        href={urlSearch}
                    >
                        <Icon size={24}>
                            <IconSprite name="search" critical />
                        </Icon>
                    </Button>
                </div>
            </div>
        </div>
    );
};
