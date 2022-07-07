import React from 'react';
import PropTypes from 'prop-types';
import Carousell from '../../../common/carousell';
import Program from '../program';
import Title from '../../../common/title';

export default function ActivePrograms({ items, type }) {
    const currentItem = items.map((item, index) => {
        return (
            <Program
                description={item.description}
                imageId={item.imgId}
                href={item.href}
                key={index}
            />
        );
    });
    return type === 'Carousel' ? (
        <section className="todos-los-programas">
            <Title
                className="section-title"
                title="Todos los programas"
                TitleTag="h3"
            />
            <Carousell>{currentItem}</Carousell>
        </section>
    ) : (
        <section className="programas">
            <section className="slider">
                <Title
                    className="section-title"
                    title="Todos los programas"
                    TitleTag="h3"
                />
                {currentItem}
            </section>
        </section>
    );
}

ActivePrograms.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    type: PropTypes.string
};

ActivePrograms.defaultProps = {
    type: 'Carousel'
};
