export const compose =
    (...fns) =>
    x =>
        fns.reduceRight((y, f) => f(y), x);

export const pipe =
    (...fns) =>
    x =>
        fns.reduce((v, f) => f(v), x);

export const curry =
    f =>
    (...args) =>
        args.length >= f.length
            ? f(...args)
            : curry(f.bind(undefined, ...args));
