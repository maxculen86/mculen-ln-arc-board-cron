import React from 'react';
import Context from 'fusion:context';
import LotteryDetailOpening from '../../../../../components/features/LN-services/lotteryDetailOpening/default';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import brincoExample from '../../../../../__mocks__/data/lottery/lotteryDetail/brincoExample.json';
import telekinoExample from '../../../../../__mocks__/data/lottery/lotteryDetail/telekinoExample.json';
import quinielaNacionalExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaNacionalExample.json';
import quinielaProvinciaExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaProvinciaExample.json';
import quinielaCordobaExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaCordobaExample.json';
import quinielaSantaFeExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaSantaFeExample.json';
import quinielaUruguayaExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quinielaUruguayaExample.json';
import quini6Example from '../../../../../__mocks__/data/lottery/lotteryDetail/quini6Example.json';
import lotoExample from '../../../../../__mocks__/data/lottery/lotteryDetail/lotoExample.json';
import loto5Example from '../../../../../__mocks__/data/lottery/lotteryDetail/loto5Example.json';
import quiniPoceadaExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quiniPoceadaExample.json';
import quiniPlusExample from '../../../../../__mocks__/data/lottery/lotteryDetail/quiniPlusExample.json';

import quinielaNacionalHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaNacionalHtml.json';
import quinielaProvinciaHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaProvinciaHtml.json';
import quinielaCordobaHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaCordobaHtml.json';
import quinielaSantaFeHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaSantaFeHtml.json';
import quinielaUruguayaHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quinielaUruguayaHtml.json';
import quiniPoceadaHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quiniPoceadaHtml.json';
import quiniPlusHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quiniPlusHtml.json';
import brincoHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/brincoHtml.json';
import quini6Html from '../../../../../__mocks__/data/lottery/lotteryDetail/html/quini6Html.json';
import telekinoHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/telekinoHtml.json';
import lotoHtml from '../../../../../__mocks__/data/lottery/lotteryDetail/html/lotoHtml.json';
import loto5Html from '../../../../../__mocks__/data/lottery/lotteryDetail/html/loto5Html.json';

jest.mock(
    '../../../../../components/private/common/staticValidation.jsx',
    () => 'mock-static-validation'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

describe('Features - LN-servicios - LN Loteria Detalle =>', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: {
            dataService: {
                lotteryDetail: brincoExample
            }
        }
    }));
    it('should be wrapped by StaticValidation component', () => {
        render(<LotteryDetailOpening id="QWERTYUIOP" />);
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
    });
    it('should return a lottery detail', () => {
        const { container } = render(<LotteryDetailOpening id="QWERTYUIOP" />);
        const StaticValidation = container.querySelector(
            'mock-static-validation'
        );
        expect(
            StaticValidation.getElementsByClassName('lottery-detail-box').length
        ).toBe(1);
        expect(StaticValidation.firstChild.textContent).toContain(
            'Últimos resultados'
        );
    });
    it.skip('should test lottery cards', () => {
        Object.keys(lotteriesDetailsHTML).forEach(lottery => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: {
                    dataService: {
                        lotteryDetail: lotteriesDetailsHTML[lottery].data
                    }
                }
            }));
            render(<LotteryDetailOpening id="QWERTYUIOP" />);
            expect(
                screen
                    .getAllByTestId(`${lottery}-test`)
                    .map(html => html.outerHTML)
            ).toStrictEqual(lotteriesDetailsHTML[lottery].html);
        });
    });
});

const lotteriesDetailsHTML = {
    Brinco: {
        html: brincoHtml,
        data: brincoExample
    },
    Telekino: {
        html: telekinoHtml,
        data: telekinoExample
    },
    Quiniela_Nacional: {
        html: quinielaNacionalHtml,
        data: quinielaNacionalExample
    },
    Quiniela_Provincia: {
        html: quinielaProvinciaHtml,
        data: quinielaProvinciaExample
    },
    Quiniela_de_Cordoba: {
        html: quinielaCordobaHtml,
        data: quinielaCordobaExample
    },
    Quiniela_de_Santa_Fe: {
        html: quinielaSantaFeHtml,
        data: quinielaSantaFeExample
    },
    Quiniela_Uruguaya: {
        html: quinielaUruguayaHtml,
        data: quinielaUruguayaExample
    },
    Quini_6: {
        html: quini6Html,
        data: quini6Example
    },
    Loto: {
        html: lotoHtml,
        data: lotoExample
    },
    Loto_5: {
        html: loto5Html,
        data: loto5Example
    },
    Quiniela_Poceada: {
        html: quiniPoceadaHtml,
        data: quiniPoceadaExample
    },
    Quiniela_Plus: {
        html: quiniPlusHtml,
        data: quiniPlusExample
    }
};
