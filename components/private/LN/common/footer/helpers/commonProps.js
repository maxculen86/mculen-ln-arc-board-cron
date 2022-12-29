const commonProps = (text, alt, href, target) => {
    return {
        text,
        ...(alt && { alt }),
        ...(href && { href }),
        ...(target && { target })
    };
};

export default commonProps;
