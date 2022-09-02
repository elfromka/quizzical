import AppContext from "../../contexts/AppContext";
import { ChangeEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { Input, Select } from "../../components";
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

    // adding "Any Category" to options as well to get questions from any category
    categoryOptions.unshift({
        value: "",
        text: "Any Category",
    });

    // handle changes on select element values
    const setSelectValue = (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        handleSettings?.(name, value);
    };

    // handle changes on input element values
    const setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        let verifiedValue = value;

        // prevent empty value of input and/or values out of min max boundary
        // check for number type inputs
        if (type === "number") {
            const { min, max } = e.target;

            // if the value is empty then a default value should be set (0)
            if (value === "") {
                verifiedValue = "0";
            }

            if (min && max) {
                // set min and/or max values based on the value filled in the input
                if (parseInt(value) < parseInt(min)) verifiedValue = min;
                if (parseInt(value) > parseInt(max)) verifiedValue = max;

                // if the input is empty, set the min value by default
                if (value === "") {
                    verifiedValue = min;
                }
            }
        }

        handleSettings?.(name, verifiedValue);
    };

    // TODO: get max number of questions of a certain category to prevent problems while fetching questions from the API
    // from this endpoint: https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE
    return (
        <section className="intro container">
            <div>
                <h1 className="intro__title intro__title--dark-grey">
                    Quizzical
                </h1>
                <h2 className="intro__subtitle intro__subtitle--primary">
                    {`Test your knowledge with ${amount} ${
                        parseInt(amount) > 1 ? "questions" : "question"
                    }.`}
                </h2>
                <div className="settings-container">
                    <Input
                        name="amount"
                        label="Quantity"
                        type="number"
                        value={amount}
                        handleChange={setInputValue}
                        min="1"
                        max="50"
                    />
                    <Select
                        name="category"
                        label="Category"
                        options={categoryOptions}
                        handleChange={setSelectValue}
                    />
                    <Select
                        name="difficulty"
                        label="Difficulty"
                        options={difficultyOptions}
                        handleChange={setSelectValue}
                    />
                    {/* TODO: add true/false type of answers as well */}
                    <Select
                        name="type"
                        label="Type"
                        options={typeOptions}
                        handleChange={setSelectValue}
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
