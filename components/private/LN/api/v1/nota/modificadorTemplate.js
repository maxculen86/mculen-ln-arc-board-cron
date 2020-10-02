const modificadorTemplate = distributor => {
    if (!distributor) return null;

    const { name: descripcion = null, reference_id: id } = distributor;

    return descripcion &&
        descripcion.replace(/\s/g, '').toLowerCase() !== 'lanacion'
        ? {
              descripcion,
              id
          }
        : null;
};

export default modificadorTemplate;
