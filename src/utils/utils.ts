import { decode } from "js-base64";

/**
 * Arranges strings in a random order from a given array.
 *
 * @param {Array<string>} arr - an array of strings
 * @return {Array<string>} the array with the same values and length, but with random ordering
 */
const randomizeArrayStrings = (arr: string[]): string[] =>
    [...arr].sort(() => Math.random() - 0.5);

/**
 * Decodes base64 encoded string values from an object.
 *
 * @param {object} object - object with base64 encoded string values
 * @return {object} object with decoded string values.
 */
const decodeObjectValues = (object: Record<string, any>): object => {
    let decodedObject = {};
    const entries: [string, Array<string>][] = Object.entries(object);

    for (const [key, value] of entries) {
        decodedObject = {
            ...decodedObject,
            [key]: !Array.isArray(value)
                ? decode(value)
                : value.map((valueItem) => decode(valueItem)),
        };
    }

    return decodedObject;
};

export { randomizeArrayStrings, decodeObjectValues };
