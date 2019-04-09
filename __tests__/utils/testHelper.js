function expectProp(component, propName, expectedValue) {
    expect(component.prop(propName)).toEqual(expectedValue);
}

function expectSameValue(value1, value2) {
    expect(value1).toEqual(value2);
}

function testDoNotRenderChildren(component, childrenName) {
    const children = component.find(childrenName);
    it('TestHelper - Testeo que no renderee los children', () => {
        expectSameValue(children.length, 0);
    });
}

function expectProps(component, expectedProps) {
    const keys = Object.keys(expectedProps);
    keys.map(key => expectProp(component, key, expectedProps[key]));
}

function testToRenderChildrenAsText(component, expectedText) {
    it('TestHelper - Testeo que renderee el texto como children', () => {
        expectSameValue(component.text(), expectedText);
    });
}

function expectHTML(component, expectedHTML) {
    expect(component.html()).toContain(expectedHTML);
}

export default {
    expectProp: expectProp,
    expectSameValue: expectSameValue,
    testDoNotRenderChildren: testDoNotRenderChildren,
    testToRenderChildrenAsText: testToRenderChildrenAsText,
    expectProps: expectProps,
    expectHTML: expectHTML
};
