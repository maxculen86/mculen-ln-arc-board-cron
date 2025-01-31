const isWebview = agent =>
    Boolean(
        agent.includes('wv') ||
            /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(agent)
    );

export default isWebview;
