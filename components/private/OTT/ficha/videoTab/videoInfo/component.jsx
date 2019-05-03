import React from 'react';
import FacebookButton from '../../../../common/facebookButton';
import TwitterButton from '../../../../common/twitterButton';

export default function videoInfo({
    title,
    date,
    facebookHref,
    twitterHref,
    categories
}) {
    return (
        <section className={'info-programa'}>
            <section className={'meta-programa'}>
                <span className={'fecha'}>{date}</span>
                <h3 className={'titulo'}>{title}</h3>
                <div className={'social'}>
                    <TwitterButton href={twitterHref} />
                    <FacebookButton href={facebookHref} />
                </div>
            </section>
            <section className={'categorias'}>
                <h4>Categorías relacionadas</h4>
                <ul>
                    {categories.map(elem => {
                        return <li href={''}>{elem.name}</li>;
                    })}
                </ul>
            </section>
        </section>
    );
}
