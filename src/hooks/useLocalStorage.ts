// import { useState, useEffect } from "react";
import { useState } from "react";
import { OptionInterface } from "./../api/api";

type ExpiryDate = string | null | number;

/**
 * Accepts a key as a string to later on add value to it and save it in the localStorage for
 * usage throughout the application. An expiration date is saved in the localStorage with the key,
 * therefore it behaves like a cookie, but can store more data. The expiration date currently
 * is hardcoded: current date + 7 days.
 *
 * Can be used when retrieving data that is not updated frequently, and
 * when there's no need to call the same endpoint on every refresh/page access.
 *
 * @param {string} key to identify the saved value in the localStorage and it's expiration date.
 *
 * @returns {array} returns a stateful value, and a function to update it. - readonly
 */
const useLocalStorage = (
    key: string
): readonly [[] | OptionInterface[], (value: OptionInterface[]) => boolean] => {
    const [itemValue, setItemValue] = useState<OptionInterface[] | []>([]);

    const currentTime = Date.now();

    let expiryDate: ExpiryDate =
        localStorage.getItem(`qz-${key}ExpiryDate`) ?? "0";
    if (expiryDate) expiryDate = +JSON.parse(expiryDate);

    const keyInLocalStorage = localStorage.getItem(`qz-${key}`);

    if (currentTime >= expiryDate) {
        localStorage.removeItem(`qz-${key}`);
        localStorage.removeItem(`qz-${key}ExpiryDate`);
    }

    if (keyInLocalStorage && itemValue.length === 0) {
        setItemValue(JSON.parse(keyInLocalStorage));
    }

    /**
     * Set array with values and it's expiration date in localStorage if the array is not empty.
     *
     * @param {OptionInterface[]} value the array with the options
     *
     * @returns {boolean} true/false
     */
    const setValue = (value: OptionInterface[]): boolean => {
        if (value.length === 0) return false;

        const validDays = 7;
        const keyInLocalStorageExpiryDate = new Date().setDate(
            new Date().getDate() + validDays
        );

        setItemValue(value);
        localStorage.setItem(`qz-${key}`, JSON.stringify(value));

        localStorage.setItem(
            `qz-${key}ExpiryDate`,
            JSON.stringify(keyInLocalStorageExpiryDate)
        );

        return true;
    };

    return [itemValue, setValue] as const;
};

export default useLocalStorage;
