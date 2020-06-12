import React from 'react';
import { render } from 'enzyme';

import Html from '../../../../../../components/private/LN/nota/cuerpo/html';

describe('Html', () => {
    const data = {
        content: `
            <div 
                class="empty" 
                style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;"
            >
                sample html block 
            </div>
        `
    };

    it('Matches Snapshot', () => {
        const html = render(<Html data={data} />);
        expect(html).toMatchSnapshot();
    });
});
