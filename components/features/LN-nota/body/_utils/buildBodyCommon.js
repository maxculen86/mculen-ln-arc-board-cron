import { setExtraProps, setDataComponent } from './helpers';
import { processElement } from '../_children/_processElement';
import get from '../../../../private/common/utils/get';

const createExtraProps = (globalContent, elements, useCapitalIndex) => {
    const { headlines: { basic: tituloNota } = {}, withSponsoredLink } =
        globalContent;

    const baseProps = {
        tituloNota,
        globalContent,
        contentElements: elements,
        withSponsoredLink
    };

    if (useCapitalIndex) {
        baseProps.capitalIndex = elements.findIndex(v => v.type === 'text');
    }

    return setExtraProps(baseProps);
};

const shouldRenderComponent = (Component, supportedTypes, nodeType) =>
    Component && supportedTypes.includes(Component.arcType) && !nodeType.length;

const createCounter = () => {
    let count = 0;
    const increment = () => {
        count += 1;
        increment.counter = count;
    };
    increment.counter = count;
    return increment;
};

const createPropsFactory = ({
    Component,
    ComponentWithProps,
    element,
    currentIndex,
    nodeType,
    supportedTypes,
    globalContent,
    elements,
    outputType,
    incrementCounter
}) => ({
    Component,
    ComponentWithProps,
    element,
    currentIndex,
    supportedTypes,
    globalContent,
    elements,
    outputType,
    nodeType,
    arcType: Component?.arcType || '',
    counter: incrementCounter.counter,
    incrementCounter
});

const renderElementDefault = (
    Component,
    ComponentWithProps,
    supportedTypes,
    nodeType
) =>
    shouldRenderComponent(Component, supportedTypes, nodeType)
        ? ComponentWithProps
        : null;

export const createComponentProps = (
    Component,
    elementPropsOrExtraProps,
    element,
    currentIndex,
    outputType,
    options = {}
) => {
    const { capitalIndex, arcType, processElementProps = false } = options;

    const extraProps = processElementProps
        ? setExtraProps(elementPropsOrExtraProps)
        : elementPropsOrExtraProps;

    const finalArcType = arcType || get(Component, 'arcType', '');

    const baseProps = {
        Component,
        extraProps,
        element,
        currentIndex,
        outputType,
        arcType: finalArcType
    };

    if (capitalIndex !== undefined) {
        baseProps.capitalIndex = capitalIndex;
    }

    return setDataComponent(baseProps);
};

const processElementItem = (element, currentIndex, context) => {
    const {
        extraProps,
        capitalIndex,
        outputType,
        subtype,
        supportedTypes,
        renderElement,
        incrementCounter
    } = context;

    const { nodeType, Component } = processElement(
        element,
        outputType,
        subtype
    );

    const ComponentWithProps = createComponentProps(
        Component,
        extraProps,
        element,
        currentIndex,
        outputType,
        {
            capitalIndex,
            arcType: get(Component, 'arcType', '')
        }
    );

    return renderElement
        ? renderElement(
              createPropsFactory({
                  Component,
                  ComponentWithProps,
                  element,
                  currentIndex,
                  nodeType,
                  supportedTypes,
                  globalContent: context.globalContent,
                  elements: context.elements,
                  outputType,
                  incrementCounter
              })
          )
        : renderElementDefault(
              Component,
              ComponentWithProps,
              supportedTypes,
              nodeType
          );
};

export const buildBodyCommon = ({
    elements = [],
    supportedTypes = [],
    outputType,
    globalContent = {},
    renderElement,
    extraOptions = {}
}) => {
    const { subtype = '' } = globalContent;
    const { useCapitalIndex = false } = extraOptions;

    const incrementCounter = createCounter();

    const context = {
        extraProps: createExtraProps(globalContent, elements, useCapitalIndex),
        capitalIndex: useCapitalIndex
            ? elements.findIndex(v => v.type === 'text')
            : undefined,
        outputType,
        subtype,
        supportedTypes,
        renderElement,
        globalContent,
        elements,
        incrementCounter
    };

    return elements.map((element, currentIndex) =>
        processElementItem(element, currentIndex, context)
    );
};
