import React, { useState } from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { SITE_FOODIT } from 'fusion:environment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export function Search({ className, ...r }) {
    const querySelected =
        typeof window !== 'undefined'
            ? new URLSearchParams(window?.location?.search).get('query')
            : '';

    const [inputValue, setInputValue] = useState(querySelected || '');

    // add a space at the end to the query term to avoid the search engine from suggesting
    const encodedQuery = encodeURIComponent(`${inputValue} `);
    const urlSearch = `${SITE_FOODIT}/buscador/?query=${encodedQuery}`;

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
                {inputValue ? (
                    <Button
                        data-test-id="button-header-search"
                        title="Borrar"
                        iconOnly
                        variant="link"
                        className="px-12 py-8"
                        onClick={() => {
                            setInputValue('');
                        }}
                    >
                        <Icon size={24}>
                            <IconSprite name="close" />
                        </Icon>
                    </Button>
                ) : null}
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
}

Search.propTypes = {
    className: PropTypes.string
};

Search.defaultProps = {
    className: ''
};
