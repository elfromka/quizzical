import { ChangeEvent } from "react";

/**
 * @typedef InputInterface
 * @prop {string} name - input name
 * @prop {string} type - type of input (text, password, email, number, etc.)
 * @prop {string} value - value of input
 * @prop {string} min - (OPTIONAL) - minimum value of input permitted
 * @prop {string} max - (OPTIONAL) - maximum value of input permitted
 * @prop {string} label - (OPTIONAL) - description of input
 * @prop {} handleChange - function to invoke when a change is made in the input
 */
interface InputInterface {
    name: string;
    type: string;
    value: string;
    min?: string;
    max?: string;
    label?: string;
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders an input element with the some settings.
 * @param {InputInterface} obj - having the name, type, value, etc. of the input
 * @return {JSX.Element} input
 */
const Input: React.FC<InputInterface> = ({
    name,
    type,
    value,
    min,
    max,
    label,
    handleChange,
}: InputInterface): JSX.Element => (
    <div className="input-wrapper">
        <label htmlFor={name} className="input-wrapper__label">
            {label}
        </label>
        <input
            id={name}
            name={name}
            className="input-wrapper__input input"
            type={type}
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
        />
    </div>
);

export default Input;
