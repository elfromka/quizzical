// import { useState, useEffect } from "react";
import { useState } from "react";
import { OptionInterface } from "./../api/api";

/**
 * Accepts a key as a string to later on add value to it and save it in the
 * sessionStorage for usage throughout the application.
 * Can be used when retrieving data that is not updated frequently, and
 * when there's no need to call the same endpoint on every refresh/page access.
 *
 * @param {string} key to identify the saved value in the sessionStorage.
 *
 * @returns {array} returns a stateful value, and a function to update it. - readonly
 */
const useSessionStorage = (key: string) => {
    const [itemValue, setItemValue] = useState<OptionInterface[] | []>([]);

    const keyInSessionStorage = sessionStorage.getItem(key);
    if (keyInSessionStorage && itemValue.length === 0) {
        setItemValue(JSON.parse(keyInSessionStorage));
    }

    /**
     * Set array with values in the sessionStorage if the array is not empty.
     *
     * @param {OptionInterface[]} value the array with the options
     *
     * @returns {boolean} true/false
     */
    const setValue = (value: OptionInterface[]): boolean => {
        if (value.length === 0) return false;

        setItemValue(value);
        sessionStorage.setItem(key, JSON.stringify(value));

        return true;
    };

    return [itemValue, setValue] as const;
};

export default useSessionStorage;
