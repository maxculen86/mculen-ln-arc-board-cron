import React, { useContext } from 'react';
import { Icon } from '@ln/common-ui-icon';
import PropTypes from 'prop-types';
import { SearchContext } from './searchContext';
import FloatingGroupButton from '../../../features/foodit-global/common/floatingGroupButton/foodit';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';

function FloatingButton({ toggleDrawer }) {
    const { appliedFilters = [] } = useContext(SearchContext);

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
                            {`Filtros ${appliedFilters.length > 0 ? `(${appliedFilters.length})` : ''}`}
                        </>
                    ),
                    onClick: () => toggleDrawer()
                }
            ]}
        />
    );
}
FloatingButton.propTypes = {
    toggleDrawer: PropTypes.func.isRequired
};
export default FloatingButton;
