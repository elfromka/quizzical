const randomizeArrayStrings = (array: string[]) =>
    [...array].sort(() => Math.random() - 0.5);

export { randomizeArrayStrings };
