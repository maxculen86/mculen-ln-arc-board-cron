const setClassName = props =>
    Object.values(props)
        .filter(Boolean)
        .join(' ');

export default setClassName;
