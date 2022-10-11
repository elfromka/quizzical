import { ChangeEvent } from "react";
import { OptionInterface } from "./../../api/api";

interface SelectInterface {
    name: string;
    label: string;
    options: Array<OptionInterface>;
    disabled?: boolean;
    handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    isLoading?: boolean;
}

/**
 * Renders a select HTML element with some properties passed as props.
 *
 * @param {SelectInterface} obj - for select: name, handleChange action, options array; for option: text from options array
 * @return {JSX.Element} a select.
 */
const Select: React.FC<SelectInterface> = ({
    name,
    label,
    options,
    disabled = false,
    handleChange,
    isLoading = false,
}: SelectInterface): JSX.Element => (
    <div className="select-wrapper">
        <label htmlFor={name} className="select-wrapper__label">
            {label}
        </label>
        <select
            id={name}
            name={name}
            className="select-wrapper__select select"
            onChange={handleChange}
            disabled={disabled || isLoading}
        >
            {isLoading && options.length === 0 && (
                <option className="select__option">Loading...</option>
            )}
            {!isLoading &&
                options.length > 0 &&
                options.map(({ value, text }) => (
                    <option
                        className="select__option"
                        value={value}
                        key={value}
                    >
                        {text}
                    </option>
                ))}
        </select>
    </div>
);

export default Select;
