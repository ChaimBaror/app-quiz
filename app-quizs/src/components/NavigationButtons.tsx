import React from 'react';

type Porps = {
    indexQuestion: number
    totalQuestions: number
    handlePrev: () => void
    handleNext: () => void
}

const NavigationButtons = ({ indexQuestion, totalQuestions, handlePrev, handleNext }: Porps) => (
    <div className="towButton">
        <button disabled={indexQuestion === 0} className="buttonNext" onClick={handlePrev}>
            Prev
        </button>
        <button
            disabled={indexQuestion === totalQuestions - 1}
            className="buttonNext"
            onClick={handleNext}
        >
            Next
        </button>
    </div>
);

export default NavigationButtons;
