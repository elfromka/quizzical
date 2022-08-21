/**
 * @typedef ButtonInterface
 * @prop {string} classes - class names that has to be applied
 * @prop {string} children - the text/string which has to be displayed on the button
 * @prop {} onClick - method that has to be invoked when the button is clicked
 * @prop {boolean} disabled [OPTIONAL] - disabled state of button
 */
interface ButtonInterface {
    classes: string;
    children: string;
    onClick: () => void;
    disabled?: boolean;
}

/**
 * Renders a button HTML element with some properties passed as props.
 *
 * @param {ButtonInterface} obj - classes, children(text of the button), onClick function, disabled attributes' state
 * @return {JSX.Element} a button.
 */
const Button: React.FC<ButtonInterface> = ({
    classes,
    children,
    onClick,
    disabled = false,
}: ButtonInterface): JSX.Element => (
    <button disabled={disabled} className={classes} onClick={onClick}>
        {children}
    </button>
);

export default Button;
