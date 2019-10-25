import React from 'react';
import Carousell from '../../../common/carousell';
import Program from '../program';
import Title from '../../../common/title';

export default function ActivePrograms({ items }) {
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
    return (
        <section>
            <Title className="section-title" title="Todos los programas" />
            <Carousell>{currentItem}</Carousell>
        </section>
    );
}
