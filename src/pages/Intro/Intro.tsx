import { useState, useEffect, ChangeEvent, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import { Input, Select } from "../../components";
import {
    Difficulty,
    Type,
    fetchCategories,
    OptionInterface,
} from "../../api/api";
import { useLocalStorage } from "../../hooks";

/**
 * First (intro) page of the application from where the quiz questions loads.
 *
 * @return {JSX.Element} with a title and subtitle, start link.
 */
const Intro: React.FC = (): JSX.Element => {
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [categoryOptions, setCategoryOptions] = useLocalStorage("categories");

    useEffect(() => {
        // to clean-up the useEffect hook after fetching data from API
        const abortController = new AbortController();

        const fetchDataCategories = async () => {
            try {
                const fetchedCategories: OptionInterface[] =
                    await fetchCategories(abortController);

                setCategoryOptions(fetchedCategories);

                if (fetchedCategories.length > 0) {
                    setLoadingCategories(false);
                }
            } catch (error: any) {
                if (error instanceof Error) {
                    throw new Error(
                        `Failed on fetching categories. Message: ${error.message}`
                    );
                }
            }
        };

        if (categoryOptions.length === 0) {
            fetchDataCategories();
        } else {
            setLoadingCategories(false);
        }

        // this will cancel the fetch request when the effect is unmounted
        return () => abortController.abort();
    }, []);

    const {
        settings: { gameOptions, handleSettings },
    } = useContext(AppContext);

    const { amount }: { amount: string } = gameOptions;

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
                        isLoading={loadingCategories}
                    />
                    <Select
                        name="difficulty"
                        label="Difficulty"
                        options={difficultyOptions}
                        handleChange={setSelectValue}
                    />
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
