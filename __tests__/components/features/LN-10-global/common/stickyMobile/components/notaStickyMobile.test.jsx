import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotaStickyMobile } from '../../../../../../../components/features/LN-10-global/common/stickyMobile/components/notaStickyMobile';
import { addEventToDataLayerV2 } from '../../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock('@ln/contenidos-ui-link', () => ({
    Link: ({ children, className, href, title, onClick, ...props }) => (
        <a
            href={href}
            title={title}
            className={className}
            onClick={onClick}
            {...props}
        >
            {children}
        </a>
    )
}));

jest.mock('@ln/common-ui-adaptableimage', () => ({
    Adaptableimage: ({ src, alt, width, height }) => (
        <img src={src} alt={alt} width={width} height={height} />
    )
}));

jest.mock('@ln/contenidos-ui-text', () => ({
    Text: ({ children, className, tag = 'div', ...props }) => {
        const Comp = tag || 'div';
        return (
            <Comp className={className} {...props}>
                {children}
            </Comp>
        );
    }
}));

jest.mock(
    '../../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

const mkArticle = (overrides = {}) => ({
    _id: 123,
    website_url: 'https://www.lanacion.com.ar/nota/slug',
    headlines: { mobile: 'Título móvil', basic: 'Título básico' },
    promo_items: {
        basic: {
            url: 'https://img/nota.jpg',
            resized_urls: [
                {
                    resizedUrl: 'https://img/nota_90.jpg',
                    option: { width: 90, height: 90 }
                }
            ]
        }
    },
    ...overrides
});

describe('NotaStickyMobile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders null when website_url is missing', () => {
        const article = mkArticle({ website_url: '' });
        const { container } = render(
            <NotaStickyMobile
                article={article}
                index={0}
                articles={[article]}
            />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders null when headline is missing (no mobile/basic)', () => {
        const article = mkArticle({ headlines: {} });
        const { container } = render(
            <NotaStickyMobile
                article={article}
                index={0}
                articles={[article]}
            />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders null when resized_urls is empty', () => {
        const article = mkArticle({
            promo_items: { basic: { url: 'x.jpg', resized_urls: [] } }
        });
        const { container } = render(
            <NotaStickyMobile
                article={article}
                index={0}
                articles={[article]}
            />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders image and title; uses custom alt when provided', () => {
        const article = mkArticle();
        render(
            <NotaStickyMobile
                alt="Alt personalizado"
                article={article}
                index={0}
                articles={[article]}
            />
        );
        expect(
            screen.getByRole('img', { name: /Alt personalizado/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Título móvil|Título básico/i })
        ).toBeInTheDocument();
    });

    it('fires ClickStickyMobile with correct payload on click (index => number_note)', () => {
        const a1 = mkArticle({ _id: 111, headlines: { mobile: 'T1' } });
        const a2 = mkArticle({ _id: 222, headlines: { mobile: 'T2' } });
        const a3 = mkArticle({ _id: 333, headlines: { mobile: 'T3' } });
        const articles = [a1, a2, a3];

        render(<NotaStickyMobile article={a2} index={1} articles={articles} />);

        const link = screen.getByRole('link', { name: /T2/ });
        fireEvent.click(link);

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({
                event: 'ClickStickyMobile',
                articleId: 222,
                title: 'T2',
                rest: {
                    combo_notas: '111 | 222 | 333',
                    number_note: 2
                }
            })
        );
    });

    it('does NOT fire ClickStickyMobile if article._id is missing', () => {
        const aBad = mkArticle({ _id: undefined });
        const articles = [aBad];

        render(
            <NotaStickyMobile article={aBad} index={0} articles={articles} />
        );

        const link = screen.getByRole('link');
        fireEvent.click(link);

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });
});
