import React from 'react';
import Context from 'fusion:context';
import LotteryGrid from '../../../../../components/features/LN-services/lotteryGrid/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import gridLotteries from '../../../../../__mocks__/data/lottery/gridLotteries.json';

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

Context.useAppContext = jest.fn(() => ({
    globalContent: {
        dataService: {
            lotteries: gridLotteries
        }
    }
}));

describe('Features - LN-servicios - LN Loteria Apertura Home', () => {
    const { container } = render(<LotteryGrid id="QWERTYUIOP" />);
    const StaticValidation = container.querySelector('mock-static-validation');

    it('should be wrapped by StaticValidation component', () => {
        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
    });
    it('should return a list of lotteries', () => {
        expect(
            StaticValidation.getElementsByClassName('lottery-header').length
        ).toBe(12);
        expect(StaticValidation.firstChild.children.length).toBe(12);
    });

    it('Should Test Lotteries Cards', () => {
        render(<LotteryGrid id="QWERTYUIOP" />);
        Object.keys(lotteriesHTML).forEach(lottery => {
            expect(
                screen.getByTestId(`${lottery}-test`).outerHTML
            ).toStrictEqual(lotteriesHTML[lottery]);
        });
    });
});

const lotteriesHTML = {
    Brinco:
        '<div class="main-result" data-testid="Brinco-test"><div class="box-result --brinco"><div class="--twoxs --font-bold ball">05</div><div class="--twoxs --font-bold ball">08</div><div class="--twoxs --font-bold ball">10</div><div class="--twoxs --font-bold ball">30</div><div class="--twoxs --font-bold ball">36</div><div class="--twoxs --font-bold ball">39</div></div><span class="label-text  --font-bold --fourxs">Pozo vacante: $56.580.658,00</span></div>',
    Quiniela_Nacional:
        '<div class="main-result" data-testid="Quiniela_Nacional-test"><span class="com-text --font-bold --twoxl">8144</span><span class="label-text  --font-bold --fourxs">La cárcel</span></div>',
    Quiniela_Provincia:
        '<div class="main-result" data-testid="Quiniela_Provincia-test"><span class="com-text --font-bold --twoxl">8874</span><span class="label-text  --font-bold --fourxs">Negros</span></div>',
    Quiniela_de_Cordoba:
        '<div class="main-result" data-testid="Quiniela_de_Cordoba-test"><span class="com-text --font-bold --twoxl">9041</span><span class="label-text  --font-bold --fourxs">Cucho</span></div>',
    Quiniela_de_Santa_Fe:
        '<div class="main-result" data-testid="Quiniela_de_Santa_Fe-test"><span class="com-text --font-bold --twoxl">9534</span><span class="label-text  --font-bold --fourxs">Cabeza</span></div>',
    Quiniela_Uruguaya:
        '<div class="main-result" data-testid="Quiniela_Uruguaya-test"><span class="com-text --font-bold --twoxl">714</span><span class="label-text  --font-bold --fourxs">Borracho</span></div>',
    Quini_6:
        '<div class="main-result" data-testid="Quini_6-test"><span class="label-text  --font-bold --fourxs">Tradicional</span><div class="box-result --quini-6"><div class="--twoxs --font-bold ball --small">00</div><div class="--twoxs --font-bold ball --small">04</div><div class="--twoxs --font-bold ball --small">05</div><div class="--twoxs --font-bold ball --small">14</div><div class="--twoxs --font-bold ball --small">37</div><div class="--twoxs --font-bold ball --small">43</div></div></div>',
    Telekino:
        '<div class="main-result" data-testid="Telekino-test"><span class="label-text  --font-bold --fourxs">Tradicional</span><div class="box-result --grid-5-columns"><div class="--twoxs --font-bold ball">05</div><div class="--twoxs --font-bold ball">06</div><div class="--twoxs --font-bold ball">07</div><div class="--twoxs --font-bold ball">08</div><div class="--twoxs --font-bold ball">09</div><div class="--twoxs --font-bold ball">10</div><div class="--twoxs --font-bold ball">13</div><div class="--twoxs --font-bold ball">14</div><div class="--twoxs --font-bold ball">15</div><div class="--twoxs --font-bold ball">16</div><div class="--twoxs --font-bold ball">17</div><div class="--twoxs --font-bold ball">18</div><div class="--twoxs --font-bold ball">21</div><div class="--twoxs --font-bold ball">22</div><div class="--twoxs --font-bold ball">24</div></div></div>',
    Loto:
        '<div class="main-result" data-testid="Loto-test"><span class="label-text  --font-bold --fourxs">Tradicional</span><div class="traditional"><div class="box-result --loto-plus"><div class="--twoxs --font-bold ball">10</div><div class="--twoxs --font-bold ball">13</div><div class="--twoxs --font-bold ball">17</div><div class="--twoxs --font-bold ball">28</div><div class="--twoxs --font-bold ball">31</div><div class="--twoxs --font-bold ball">32</div></div><div class="jackpot-result"><div class="--twoxs --font-bold ball --blue">7</div><div class="--twoxs --font-bold ball --blue">9</div></div></div></div>',
    Loto_5:
        '<div class="main-result" data-testid="Loto_5-test"><div class="box-result --loto-5"><div class="--twoxs --font-bold ball">05</div><div class="--twoxs --font-bold ball">06</div><div class="--twoxs --font-bold ball">13</div><div class="--twoxs --font-bold ball">16</div><div class="--twoxs --font-bold ball">33</div></div><span class="label-text  --font-bold --fourxs">Pozo vacante: $5.682.700,00</span></div>',
    Quiniela_Poceada:
        '<div class="main-result" data-testid="Quiniela_Poceada-test"><div class="box-result --grid-5-columns"><div class="--twoxs --font-bold ball">04</div><div class="--twoxs --font-bold ball">10</div><div class="--twoxs --font-bold ball">11</div><div class="--twoxs --font-bold ball">14</div><div class="--twoxs --font-bold ball">15</div><div class="--twoxs --font-bold ball">16</div><div class="--twoxs --font-bold ball">19</div><div class="--twoxs --font-bold ball">26</div><div class="--twoxs --font-bold ball">27</div><div class="--twoxs --font-bold ball">28</div><div class="--twoxs --font-bold ball">42</div><div class="--twoxs --font-bold ball">50</div><div class="--twoxs --font-bold ball">54</div><div class="--twoxs --font-bold ball">60</div><div class="--twoxs --font-bold ball">69</div><div class="--twoxs --font-bold ball">78</div><div class="--twoxs --font-bold ball">81</div><div class="--twoxs --font-bold ball">82</div><div class="--twoxs --font-bold ball">89</div><div class="--twoxs --font-bold ball">98</div></div><span class="label-text  --font-bold --fourxs">Letras: OUCQ</span></div>',
    Quiniela_Plus:
        '<div class="main-result" data-testid="Quiniela_Plus-test"><span class="label-text  --font-bold --fourxs">Tradicional</span><div class="box-result --grid-5-columns"><div class="--twoxs --font-bold ball">06</div><div class="--twoxs --font-bold ball">07</div><div class="--twoxs --font-bold ball">10</div><div class="--twoxs --font-bold ball">14</div><div class="--twoxs --font-bold ball">20</div><div class="--twoxs --font-bold ball">24</div><div class="--twoxs --font-bold ball">32</div><div class="--twoxs --font-bold ball">38</div><div class="--twoxs --font-bold ball">44</div><div class="--twoxs --font-bold ball">48</div><div class="--twoxs --font-bold ball">57</div><div class="--twoxs --font-bold ball">62</div><div class="--twoxs --font-bold ball">65</div><div class="--twoxs --font-bold ball">71</div><div class="--twoxs --font-bold ball">73</div><div class="--twoxs --font-bold ball">80</div><div class="--twoxs --font-bold ball">82</div><div class="--twoxs --font-bold ball">83</div><div class="--twoxs --font-bold ball">86</div><div class="--twoxs --font-bold ball">92</div></div></div>'
};
