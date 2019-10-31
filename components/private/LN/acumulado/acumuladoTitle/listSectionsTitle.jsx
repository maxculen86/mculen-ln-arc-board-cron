import React from 'react';
import PropTypes from 'fusion:prop-types';

const ItemSubSection = ({ id, navTitle, website }) => (
    <li key={id}>
        <a href={`${id}?_website=${website}`} title={navTitle}>
            {navTitle}
        </a>
    </li>
);

ItemSubSection.propTypes = {
    id: PropTypes.string.isRequired,
    navTitle: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
};

const ListSectionsTitle = ({ _children, isPrimarySection }) => {
    return (
        _children &&
        isPrimarySection && (
            <ol className="com-category">
                {_children.map(({ _id, navigation, _website, name }) => (
                    <ItemSubSection
                        key={_id}
                        id={_id}
                        navTitle={
                            navigation && navigation.nav_title
                                ? navigation.nav_title
                                : name
                        }
                        website={_website}
                    />
                ))}
            </ol>
        )
    );
};

ListSectionsTitle.propTypes = {
    _children: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            _website: PropTypes.string
        })
    ),
    isPrimarySection: PropTypes.bool
};

export default ListSectionsTitle;
