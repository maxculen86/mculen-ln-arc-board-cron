import React from 'react';
import { mount } from 'enzyme';
import LiftIgniter from '../../../../../components/private/common/scriptManager/Liftigniter';

describe('Liftigniter', () => {
    const props = {
        location: 'body-top',
        globalContent: {
            taxonomy: {
                primary_section: {
                    name: 'Turismo'
                },
                tags: [
                    {
                        text: 'comun',
                        description: 'comun',
                        slug: 'comun'
                    },
                    {
                        text: 'turismo',
                        description: 'turismo',
                        slug: 'turismo'
                    }
                ]
            },
            syndication: { search: false, external_distribution: false }
        }
    };
    it('Builds the json object accordingly', () => {
        const component = mount(<LiftIgniter {...props} />);

        const output = JSON.stringify({
            noShow: true,
            noIndex: true,
            tematica: 'Turismo',
            tags: ['comun', 'turismo']
        });

        expect(component.find('script')).toHaveLength(1);
        expect(
            component
                .find('script')
                .filterWhere(item => item.prop('type') === 'application/json')
        ).toHaveLength(1);
        expect(component.html()).toContain(output);
    });
});
