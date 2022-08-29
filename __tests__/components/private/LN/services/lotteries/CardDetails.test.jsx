import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardDetails from '../../../../../../components/private/LN/services/lotteries/CardDetails';

describe('Components - private - CardDetails =>', () => {
    it('Test when isQuiniela is false and detail is false', () => {
        const isQuiniela = false;
        const detail = undefined;
        const result = { name: 'loteria', date: 'hoy', result: ['0'] };
        const hasExtraResult = true;
        const expectedClass = 'extra-results';
        const extraResultsModificator = 'extra-results-modificator';

        const { container } = render(
            <CardDetails
                isDetail={detail}
                hasExtraResults={hasExtraResult}
                reorderedResults={[, result]}
                isQuiniela={isQuiniela}
                extraResultsModificator={extraResultsModificator}
                hasJackpot={false}
                jackpot={''}
            />
        );

        expect(container).toMatchSnapshot();
        expect(container.innerHTML.includes(extraResultsModificator)).toBe(
            true
        );
        expect(container.innerHTML.includes(result.date)).toBe(false);
        expect(container.innerHTML.includes(result.name)).toBe(true);
        expect(container.innerHTML.includes(result.result)).toBe(true);
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
    });

    it('Test when isQuiniela is true and detail is false', () => {
        const isQuiniela = true;
        const detail = undefined;
        const result = { name: 'loteria', date: 'hoy', result: ['0'] };
        const hasExtraResult = true;
        const expectedClass = 'extra-results';

        const { container } = render(
            <CardDetails
                isDetail={detail}
                hasExtraResults={hasExtraResult}
                reorderedResults={[, result]}
                isQuiniela={isQuiniela}
                extraResultsModificator={''}
                hasJackpot={false}
                jackpot={''}
            />
        );

        expect(container).toMatchSnapshot();
        expect(container.innerHTML.includes(result.date)).toBe(true);
        expect(container.innerHTML.includes(result.name)).toBe(true);
        expect(container.innerHTML.includes(result.result)).toBe(true);
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
    });

    it('Test when detail is true and have jackpot', () => {
        const detail = true;
        const jackpot = [88123, 1234, 333];
        const hasExtraResult = true;
        const expectedClass = 'extra-results --jackpot-details';

        const { container } = render(
            <CardDetails
                isDetail={detail}
                hasExtraResults={hasExtraResult}
                jackpot={jackpot}
                extraResultsModificator={''}
                reorderedResults={[]}
                isQuiniela={false}
                hasJackpot={false}
            />
        );

        expect(container).toMatchSnapshot();
        expect(container.innerHTML.includes('Jackpot')).toBe(true);
        expect(container.innerHTML.includes(jackpot[0])).toBe(true);
        expect(container.innerHTML.includes(jackpot[1])).toBe(true);
        expect(container.innerHTML.includes(jackpot[2])).toBe(true);
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
    });

    it('Test when detail is false and hasJackpot is true', () => {
        const detail = false;
        const result = {
            name: 'subLottery',
            result: ['1', '3', '88'],
            jackpot: [88123, 1234, 333]
        };
        const hasJackpot = true;
        const expectedClass = 'extra-results --loto-plus';

        const { container } = render(
            <CardDetails
                isDetail={detail}
                reorderedResults={[, result, result]}
                hasJackpot={hasJackpot}
                hasExtraResults={false}
                isQuiniela={false}
                extraResultsModificator={''}
                jackpot={false}
            />
        );

        expect(container).toMatchSnapshot();
        expect(container.innerHTML.includes(result.result[0])).toBe(true);
        expect(container.innerHTML.includes(result.result[1])).toBe(true);
        expect(container.innerHTML.includes(result.result[2])).toBe(true);
        expect(container.innerHTML.includes(result.jackpot[0])).toBe(true);
        expect(container.innerHTML.includes(result.jackpot[1])).toBe(true);
        expect(container.innerHTML.includes(result.jackpot[2])).toBe(true);
        expect(container.getElementsByClassName(expectedClass).length).toBe(1);
    });

    it('Test when detail is true and hasJackpot is true', () => {
        const detail = true;
        const hasJackpot = true;

        const { container } = render(
            <CardDetails
                isDetail={detail}
                hasJackpot={hasJackpot}
                reorderedResults={[]}
                hasExtraResults={false}
                isQuiniela={false}
                extraResultsModificator={''}
                jackpot={false}
            />
        );

        expect(container).toMatchSnapshot();
        expect(container.innerHTML).toBe('');
    });

    it('Test when detail is true and hasExtraResults is true', () => {
        const detail = true;
        const hasExtraResults = true;

        const { container } = render(
            <CardDetails
                isDetail={detail}
                hasExtraResults={hasExtraResults}
                reorderedResults={[]}
                hasJackpot={false}
                isQuiniela={false}
                extraResultsModificator={''}
                jackpot={false}
            />
        );

        expect(container).toMatchSnapshot();
        expect(container.innerHTML).toBe('');
    });

    it('Test when detail is false and have jackpot', () => {
        const detail = false;
        const jackpot = [1, 3, 2];

        const { container } = render(
            <CardDetails
                isDetail={detail}
                jackpot={jackpot}
                hasExtraResults={false}
                reorderedResults={[]}
                hasJackpot={false}
                isQuiniela={false}
                extraResultsModificator={''}
            />
        );

        expect(container).toMatchSnapshot();
        expect(container.innerHTML).toBe('');
    });
});
