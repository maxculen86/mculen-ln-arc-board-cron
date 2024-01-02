import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import { initializeAnticipoScript } from '../../../../../src/statics/LN/js/scriptAnticipoLN10';

document.body.innerHTML = `
  <button id="closeAdvance">Close</button>
  <div class="ln-advance">Advance Content</div>
`;

initializeAnticipoScript();

describe('src - statics - LN - js - anticipoLN10', () => {
    test('Adds "none" class on button click', () => {
        const buttonCloseAdvance = document.getElementById('closeAdvance');
        const advance = document.querySelector('.ln-advance');

        fireEvent.click(buttonCloseAdvance);

        expect(advance).toHaveClass('none');
    });
});
