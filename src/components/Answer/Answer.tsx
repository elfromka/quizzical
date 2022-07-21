import { useState } from "react";

type Props = {
    text: string;
    selectAnswer: () => void;
    selectedCount: number;
};

const Answer = ({ text, selectAnswer, selectedCount }: Props) => {
    const [applySelected, setApplySelected] = useState(false);

    const applySelectedClass = () => {
        if (selectedCount === 0 || applySelected) {
            setApplySelected((prev) => !prev);
            selectAnswer();
        }
    };

    return (
        <button
            // disabled
            className={`btn btn--outline btn--sm ${
                applySelected && "btn--selected"
            }`}
            onClick={applySelectedClass}
            value="Cabbage Patch Kids"
        >
            {text}
        </button>
    );
};

export default Answer;
