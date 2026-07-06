import React from 'react';
import { cx } from '@ln/cva';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Link } from '@ln/foodit-ui-link';
import MenuCategories from '../../MenuCategories/foodit';

function Categories({ title, href = '', data = null, className = '' }) {
    const linkClassName = cx('text-12 roboto-bold uppercase', className);

    if (data) {
        return (
            <Dropdown toggleOn="hover" key={title} className="flex ai-center">
                <>
                    <Dropdown.Toggle
                        iconProps={{ color: 'inherit' }}
                        onClick={() => {}}
                        className="ai-center roboto-bold text-12 uppercase text-light-800 text-accent-lechuga__hover"
                        gap={8}
                        data-test-id={`header-button-dropdown-${title}`}
                    >
                        {title}
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        alignment="left"
                        className="bg-light-1 p-24 rounded-4 shadow-center"
                    >
                        <MenuCategories data={data} />
                    </Dropdown.Menu>
                </>
            </Dropdown>
        );
    }
    return (
        <Link
            href={href}
            className={linkClassName}
            text={`${title}`}
            target={title === 'Conocenos' ? '_blank' : '_self'}
            title={`Ir a ${title}`}
            data-test-id={`header-link-${title}`}
            data-interaction="dataLayerInteraction"
            data-event="e_linkclick"
            data-category="header"
            data-label={title}
            data-action="N/A"
        />
    );
}

export default Categories;
