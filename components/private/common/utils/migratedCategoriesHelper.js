const isMigratedCategory = (category, migration) => {
    if (!category) {
        throw new Error(`La categoria viene en null o undefined`);
    }
    if (!migration) {
        throw new Error(
            `La categoria '${category}' no posee la propiedad migration`
        );
    }
    const migrada = migration.migrated_mob === 'true' ? true : false;
    return migrada;
};

export { isMigratedCategory };
