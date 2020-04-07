const walkerBuilder = () => {
    const conditions = [];
    const next = data => {
        const condition = conditions.find(c => c.condition(data));
        if (condition) return condition.action(data, next);
        return null;
    };

    return {
        addCondition: (condition, action) => {
            conditions.push({ condition, action });
        },
        parse: next
    };
};

export default walkerBuilder;
