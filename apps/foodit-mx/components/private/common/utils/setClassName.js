const setClassName = (classNames = {}) =>
    Object.values(classNames).filter(Boolean).join(' ');

export default setClassName;
