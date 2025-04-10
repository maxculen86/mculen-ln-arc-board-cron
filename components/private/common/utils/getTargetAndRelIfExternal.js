const getTargetAndRelIfExternal = isExternal => ({
    target: isExternal ? '_blank' : '_self',
    rel: isExternal ? 'noopener' : undefined
});

export default getTargetAndRelIfExternal;
