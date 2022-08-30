import { ChangeEvent } from "react";

interface InputInterface {
    name: string;
    type: string;
    value: string;
    min?: string;
    max?: string;
    label?: string;
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputInterface> = ({
    name,
    type,
    value,
    min,
    max,
    label,
    handleChange,
}): JSX.Element => {
    return (
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
};

export default Input;
