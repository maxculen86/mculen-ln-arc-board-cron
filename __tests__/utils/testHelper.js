
 function expectProp(component, propName, expectedValue) {
    expect(component.prop(propName)).toEqual(expectedValue)
}

function expectSameValue(value1, value2) {
    expect(value1).toEqual(value2)
}
function testNoRenderChildren(component, childrenName){
    const children = component.find(childrenName)
    it('TestHelper - Testeo que no renderee los children', () => {
        expectSameValue(children.length,0)
    });
}
export default {
    expectProp: expectProp,
    expectSameValue: expectSameValue,
    testNoRenderChildren: testNoRenderChildren
}