import React from 'react';

export const FocalOnePlusFour = ({ cards = [] }) => {
    const [focalCard] = cards;

    return (
        <section className="flex grid grid-cols-12_md grid-cols-16_lg gap-24_md gap-32">
            <div className="col-span-6_md col-span-8_lg">{focalCard}</div>
            <div className="col-span-6_md col-span-8_lg flex flex-column gap-32">
                <div className="flex flex-column flex-row_md gap-24_md row-gap-32 gap-32_lg">
                    {cards.slice(1, 3)}
                </div>
                <div className="flex flex-column flex-row_md  gap-24_md row-gap-32 gap-32_lg">
                    {cards.slice(3, 5)}
                </div>
            </div>
        </section>
    );
};
