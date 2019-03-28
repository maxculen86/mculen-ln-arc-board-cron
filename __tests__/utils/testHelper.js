
 function expectProp(component, propName, expectedValue) {
    expect(component.prop(propName)).toEqual(expectedValue)
}

function expectSameValue(value1, value2) {
    expect(value1).toEqual(value2)
}

export default {
    expectProp: expectProp,
    expectSameValue: expectSameValue
}