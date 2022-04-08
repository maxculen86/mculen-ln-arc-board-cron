import React from 'react';
import Program from '../program';
import Title from '../../../common/title';

export default function AllPrograms({ items }) {
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
        <section className="programas">
            <section className="slider">
                <Title
                    TitleTag="h2"
                    className="section-title"
                    title="Todos los programas"
                />
                {currentItem}
            </section>
        </section>
    );
}
