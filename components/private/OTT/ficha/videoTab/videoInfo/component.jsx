import React from 'react';
export default function videoInfo({ title, date }) {
    return (
        <section className={'info-programa'}>
            <section className={'meta-programa'}>
                <span className={'fecha'}>{date}</span>
                <h3 itemprop={'name'} className={'titulo'}>
                    {title}
                </h3>
            </section>
        </section>
    );
}
