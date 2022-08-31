import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline from '../../../../../components/private/LN/common/timeline';
import '@testing-library/jest-dom';

describe('private - LN - common - timeline', () => {
    const { getAllByText, getAllByAltText } = screen;

    const articleContentProps = {
        title:
            'Cese de actividades en los bancos por la marcha: ¿cuánto durará?',
        time: '13:59'
    };

    const articleContentMocked = (
        <article class="mod-article toitl01 nidWJ3GDGJZRVBQ3AQQ2VOPKTB474 --no-media">
            <time class="com-hour --fivexs">{articleContentProps.time}</time>
            <section class="mod-description">
                <h3 class="com-title --twoxs">
                    <a
                        href="/economia/cese-de-actividades-en-los-bancos-por-la-marcha-cuanto-durara-nid17082022/"
                        title="Cese de actividades en los bancos por la marcha: ¿cuánto durará?"
                        class="com-link"
                    >
                        {articleContentProps.title}
                    </a>
                </h3>
            </section>
        </article>
    );

    const articleGridProps = {
        title:
            'Definición. Se sortearon los octavos de final de la Libertadores y la Sudamericana: duelos entre argentinos y ¿superclásico en semifinales?',
        alt:
            'Se sortearon los octavos de final de la Libertadores y la Sudamericana'
    };

    const articleGridMocked = (
        <article class="mod-article toi0102 nid7W2QLMB3PBF73EDFRXXEJAIRVQ">
            <div class="content-media">
                <section role="button" class="mod-media">
                    <figure role="button" class="mod-figure --horizontal">
                        <a href="/deportes/futbol/el-sorteo-de-la-copa-libertadores-en-vivo-nid27052022/">
                            <div class="placeholder ">
                                <img
                                    src="https://resizer.glanacion.com/resizer/YhNKZx48_f7C9xG2Ah7TOvtnXgU=/233x155/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6PP6FM4DVFBR7LQNFRPKSAVD4Y.JPG"
                                    alt={articleGridProps.alt}
                                    width="768"
                                    height="513"
                                    class="com-image"
                                />
                            </div>
                        </a>
                    </figure>
                </section>
            </div>
            <section class="mod-description">
                <h2 class="com-title --xs">
                    <a
                        href="/deportes/futbol/el-sorteo-de-la-copa-libertadores-en-vivo-nid27052022/"
                        title={articleGridProps.title}
                        class="com-link"
                    >
                        {articleGridProps.title}
                    </a>
                </h2>
            </section>
        </article>
    );

    const range = [...Array(5).keys()];

    const content = range.map(() => articleContentMocked);
    const articles = range.map(() => articleGridMocked);

    it('render component correctly with props', () => {
        const { title, time } = articleContentProps;
        const { alt, title: titleGrid } = articleGridProps;

        render(
            <Timeline
                articles={articles}
                content={content}
                orderClass="--left-top"
            />
        );

        expect(getAllByText(title)).toHaveLength(content.length);
        expect(getAllByText(time)).toHaveLength(content.length);

        expect(getAllByAltText(alt)).toHaveLength(articles.length);
        expect(getAllByText(titleGrid)).toHaveLength(articles.length);
    });

    it('render component correctly with props', () => {
        const { container } = render(<Timeline />);
        expect(container).toBeEmptyDOMElement();
    });
});
