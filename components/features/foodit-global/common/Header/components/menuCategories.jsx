import React from 'react';
import { Dropdown } from '@ln/common-ui-dropdown';
import { MenuCategories } from '../../MenuCategories/foodit';
import { Link } from '@ln/foodit-ui-link';

const Categories = ({ title, href, data }) => {
    if (data) {
        return (
            <Dropdown toggleOn="hover" key={title} className="flex ai-center">
                <>
                    <Dropdown.Toggle
                        iconProps={{ color: 'inherit' }}
                        onClick={() => console.log(title)}
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
            className="text-12 roboto-bold uppercase"
            text={title}
            title={`Ir a ${title}`}
            data-test-id={`header-link-${title}`}
            data-interaction="dataLayerInteraction"
            data-event="e_linkclick"
            data-category="header"
            data-label={title}
            data-action="N/A"
        />
    );
};

export default Categories;
