jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import React from 'react';
import { mount } from 'enzyme';
import ScriptHtmlLibre from '../../../../../components/private/common/scriptManager/scriptHtmlLibre';
import data from '../../../../../__mocks__/data/scriptManager/scriptHtmlLibre/data.json';

describe('ScriptManager -> ScriptHtmlLibre ->', () => {
    describe('when is a story', () => {
        describe('with raw_html elements', () => {
            const [
                propsCase1,
                propsCase2,
                propsCase3
            ] = data.story.withRawElements.withPym;

            const [propsCase4] = data.story.withRawElements.withoutPym;

            describe('in "content_elements" "promo_items"', () => {
                describe('and the content includes class pym', () => {
                    const expectedResult = {
                        length: 1,
                        src:
                            'https://cdnjs.cloudflare.com/ajax/libs/pym/1.2.0/pym.v1.min.js'
                    };
                    const case1 = mount(<ScriptHtmlLibre {...propsCase1} />);
                    const case2 = mount(<ScriptHtmlLibre {...propsCase2} />);
                    const case3 = mount(<ScriptHtmlLibre {...propsCase3} />);

                    it('Case 1 => should load pym script', () => {
                        // Case 2: content_elements with pym
                        expect(case1.find('script')).toHaveLength(
                            expectedResult.length
                        );
                        expect(case1.find('script').prop('src')).toBe(
                            expectedResult.src
                        );
                    });

                    it('Case 2 => should load pym script ', () => {
                        // Case 2: promo_items with pym
                        expect(case2.find('script')).toHaveLength(
                            expectedResult.length
                        );
                        expect(case2.find('script').prop('src')).toBe(
                            expectedResult.src
                        );
                    });

                    it('Case 3 => should load pym script ', () => {
                        // Case 3: content_elements and promo_items with pym
                        expect(case3.find('script')).toHaveLength(
                            expectedResult.length
                        );
                        expect(case3.find('script').prop('src')).toBe(
                            expectedResult.src
                        );
                    });

                    it('snapshots', () => {
                        expect(case1.html()).toMatchSnapshot();
                        expect(case2.html()).toMatchSnapshot();
                        expect(case3.html()).toMatchSnapshot();
                    });
                });
                describe('and any content includes class pym', () => {
                    const case4 = mount(<ScriptHtmlLibre {...propsCase4} />);

                    // Case 4: content_elements and promo_items without pym
                    it("Case 4 => shouldn't load pym script", () => {
                        expect(case4.find('script')).toHaveLength(0);
                    });
                    it('snapshots', () => {
                        expect(case4.html()).toMatchSnapshot();
                    });
                });
            });
        });

        describe('without raw_html elements', () => {
            const [propsCase5] = data.story.withoutRawElements;
            describe('in "content_elements" "promo_items"', () => {
                const case5 = mount(<ScriptHtmlLibre {...propsCase5} />);
                it("Case 5 => shouldn't load pym script", () => {
                    expect(case5.find('script')).toHaveLength(0);
                });
                it('snapshots', () => {
                    expect(case5.html()).toMatchSnapshot();
                });
            });
        });
    });

    describe("when isn't a story", () => {
        const propsCase6 = data.section;
        const case6 = mount(<ScriptHtmlLibre {...propsCase6} />);
        it("Case 6 => shouldn't load pym script", () => {
            expect(case6.find('script')).toHaveLength(0);
        });
        it('snapshots', () => {
            expect(case6.html()).toMatchSnapshot();
        });
    });

    describe("when hasn't globalContent", () => {
        const case7 = mount(<ScriptHtmlLibre />);
        it("Case 7 => shouldn't load pym script", () => {
            expect(case7.find('script')).toHaveLength(0);
        });
        it('snapshots', () => {
            expect(case7.html()).toMatchSnapshot();
        });
    });
});
