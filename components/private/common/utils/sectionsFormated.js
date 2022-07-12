const sectionsFormated = sections =>
    sections
        ? JSON.stringify(sections)
              .replace('/,/g', '+OR+')
              .replace('[', '(')
              .replace(']', ')')
        : '';

export default sectionsFormated;
