import React, { useContext } from 'react';
import { Icon } from '@ln/common-ui-icon';
import { SearchContext } from './searchContext';
import FloatingGroupButton from '../../../features/foodit-global/common/floatingGroupButton/foodit';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';

function FloatingButton({ toggleDrawer }) {
    const { appliedFilters = [] } = useContext(SearchContext);
    const filterCount = appliedFilters.length;
    const filterText = filterCount > 0 ? `Filtros (${filterCount})` : 'Filtros';

    return (
        <FloatingGroupButton
            observerSelector=".header-sentinel"
            className="lg-none"
            buttons={[
                {
                    title: 'Filtros',
                    children: (
                        <>
                            <Icon size={16}>
                                <IconSprite fill="#FEFEFE" name="filter" />
                            </Icon>
                            {filterText}
                        </>
                    ),
                    onClick: () => toggleDrawer()
                }
            ]}
        />
    );
}

export default FloatingButton;
