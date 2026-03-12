import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setEventsRoof } from '../../../../../../components/private/common/utils/eventsHelper';

const getMockRoof = ({ childrenLeft, childrenRight = [] }) => {
    return (
        <div className="ln-roof --generic" roof-container="roof-container">
            <div className="--ln-roof-full --d-flex --jc-between --pt-md">
                {childrenLeft}
            </div>
            <div
                className="--ln-roof-right --d-flex --ai-center --generico"
                roof-group="right"
            >
                {[...childrenRight]}
            </div>
        </div>
    );
};

const mockAnchorWithImage = group => (
    <a
        href="https://dev.azure.com/lndigital/Gestion%20LANACION-ARC/_boards/board/t/ARC-KANBAN/Stories/?workitem=91750"
        className="link ln-link --d-flex --ai-center --uppercase"
        rel="nofollow"
        title="Ir a Focal 1 + 4 EN Caja Manual"
        target="_blank"
        roof-group={group}
    >
        <img
            alt="Programas"
            className="image --d-flex"
            decoding="async"
            src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/IKAD32FPYZGIHNGZWYYFDNXMCM.png"
        />
    </a>
);

const mockAnchorWithoutImage = (group, classButton = '') => (
    <a
        href="/ultimas-noticias/"
        className={`link ln-link --ml-sm --d-flex --uppercase ${classButton} --ai-center --mobile-none --font-2xs`}
        rel="nofollow"
        title="Últimas noticias"
        target="_blank"
        roof-group={group}
    >
        <span className="text ln-text">Últimas noticias</span>
    </a>
);

describe('should register in dataLayer the click event of the logo with the alt of the image as description', () => {
    beforeEach(() => {
        window.dataLayer = [];
    });

    test('should register in dataLayer the click event of the logo with the alt of the image as description', async () => {
        render(getMockRoof({ childrenLeft: mockAnchorWithImage('left') }));
        setEventsRoof();

        const link = screen.getByRole('link');
        fireEvent.click(link);

        await waitFor(() => {
            expect(
                window.dataLayer[0].dynamic_label.includes('programas')
            ).toBeTruthy();
            expect(window.dataLayer[0].dynamic_action).toStrictEqual(
                'caja_programas'
            );
        });
    });

    test('Should record in datalayer the text of the span as description.', async () => {
        render(getMockRoof({ childrenLeft: mockAnchorWithoutImage('left') }));

        setEventsRoof();

        const link = screen.getByRole('link');
        fireEvent.click(link);

        await waitFor(() => {
            expect(
                window.dataLayer[0].dynamic_label.includes('ultimas_noticias')
            ).toBeTruthy();
            expect(window.dataLayer[0].dynamic_action).toStrictEqual(
                'caja_ultimas_noticias'
            );
            expect(window.dataLayer[0].event).toStrictEqual('e_linkclick');
            expect(window.dataLayer[0].dynamic_category).toStrictEqual(
                'home_ln10'
            );
        });
    });

    test('You should not record anything in datalayer when there are no links', () => {
        const { container } = render(
            getMockRoof({
                childrenLeft: (
                    <div
                        className="--d-flex --ai-center --uppercase"
                        roof-group="left"
                    >
                        <span className="text ln-text --roof-title">
                            Focal 1 + 4 EN Caja Manual
                        </span>
                    </div>
                )
            })
        );

        setEventsRoof();

        const link = container.querySelector('[roof-group="left"]');
        fireEvent.click(link);

        expect(window.dataLayer).toStrictEqual([]);
    });

    test('Of the right group, only the button should register.', async () => {
        render(
            getMockRoof({
                childrenRight: [
                    mockAnchorWithoutImage('right'),
                    mockAnchorWithoutImage('right', '--roof-button')
                ]
            })
        );
        setEventsRoof();

        const links = screen.getAllByRole('link');

        links.forEach(link => fireEvent.click(link));

        await waitFor(() => {
            expect(window.dataLayer).toHaveLength(1);
            expect(
                window.dataLayer[0].dynamic_label.includes('ultimas_noticias')
            ).toBeTruthy();
            expect(window.dataLayer[0].dynamic_action).toStrictEqual(
                'caja_ultimas_noticias'
            );
        });
    });
});
