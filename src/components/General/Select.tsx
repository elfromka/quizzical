import { ChangeEvent } from "react";

export interface OptionInterface {
    value: string | number;
    text: string;
}

interface SelectInterface {
    name: string;
    text: string;
    options: Array<OptionInterface>;
    handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Renders a select HTML element with some properties passed as props.
 *
 * @param {SelectInterface} obj - for select: name, handleChange action, options array; for option: text from options array
 * @return {JSX.Element} a select.
 */
const Select: React.FC<SelectInterface> = ({
    name,
    text,
    options,
    handleChange,
}: SelectInterface): JSX.Element => (
    <div className="select-wrapper">
        <label htmlFor={name} className="select-wrapper__label">
            {text}
        </label>
        <select
            id={name}
            name={name}
            className="select-wrapper__select select"
            onChange={handleChange}
        >
            {options.map(({ value, text }) => (
                <option className="select__option" value={value} key={value}>
                    {text}
                </option>
            ))}
        </select>
    </div>
);

export default Select;
