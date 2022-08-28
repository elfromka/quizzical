import AppContext from "../../contexts/AppContext";
import { ChangeEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { Select } from "../../components";
import { Difficulty, Type, categories } from "../../api/api";
import { OptionInterface } from "../../components/General/Select";

/**
 * First (intro) page of the application from where the quiz questions loads.
 *
 * @return {JSX.Element} with a title and subtitle, start link.
 */
const Intro: React.FC = (): JSX.Element => {
    const {
        settings: { gameOptions, handleSettings },
    } = useContext(AppContext);

    const { amount } = gameOptions;

    // contains choices for total number of questions when the game is started
    const amountOptions: Array<OptionInterface> = [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 25, text: "25" },
        { value: 50, text: "50" },
    ];

    // difficulty levels for retrieved questions
    const difficultyOptions: Array<OptionInterface> = Object.values(
        Difficulty
    ).map((item) =>
        Object.assign({
            value: item,
            text: `${item.toUpperCase()[0]}${item.substring(1)}`,
        })
    );

    // answer types/choice numbers to set for questions
    const typeOptions: Array<OptionInterface> = Object.values(Type).map(
        (item) => {
            if ([Type.BOOLEAN, Type.MULTIPLE].includes(item)) {
                if (item === Type.BOOLEAN) {
                    return Object.assign({
                        value: item,
                        text: "True / False",
                    });
                }

                if (item === Type.MULTIPLE) {
                    return Object.assign({
                        value: item,
                        text: "Multiple choice",
                    });
                }
            }

            return Object.assign({
                value: item,
                text: `${item.toUpperCase()[0]}${item.substring(1)}`,
            });
        }
    );

    // set value for category value which has to be set in the API call
    const categoryStartId: number = 9;
    // categories of questions
    const categoryOptions: Array<OptionInterface> = categories.map(
        (item, index) => ({
            value: categoryStartId + index,
            text: item,
        })
    );

    // handle changes in select elements
    const setSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        handleSettings?.(name, value);
    };

    return (
        <section className="intro container">
            <div>
                <h1 className="intro__title intro__title--dark-grey">
                    Quizzical
                </h1>
                <h2 className="intro__subtitle intro__subtitle--primary">
                    {`Test your knowledge with ${amount} questions.`}
                </h2>
                <div className="settings-container">
                    {/* TODO: change select to an input to select a custom nr of questions */}
                    <Select
                        name="amount"
                        text="Quantity"
                        options={amountOptions}
                        handleChange={setSelectValue}
                    />
                    <Select
                        name="category"
                        text="Category"
                        options={categoryOptions}
                        handleChange={setSelectValue}
                    />
                    <Select
                        name="difficulty"
                        text="Difficulty"
                        options={difficultyOptions}
                        handleChange={setSelectValue}
                    />
                    {/* TODO: add true/false type of answers as well */}
                    <Select
                        name="type"
                        text="Type"
                        options={typeOptions}
                        handleChange={setSelectValue}
                        disabled={true}
                    />
                </div>
            </div>
            <Link className="btn btn--primary btn--xl" to="/questions">
                Start quiz
            </Link>
        </section>
    );
};

export default Intro;
