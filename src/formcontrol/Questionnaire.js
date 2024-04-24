import React, { useState, useEffect } from "react";
import questions from "./questions.json";

function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Initialize answers object with default values
    const initAnswers = {};
    questions.questions.forEach((question, index) => {
      initAnswers[index] = { answer: null, trait: question.trait };
    });
    setAnswers(initAnswers);
  }, []);

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleAnswer = (index, answer) => {
    setAnswers({
      ...answers,
      [index]: { answer: answer, trait: questions.questions[index].trait },
    });
  };

  const handleSubmit = () => {
    // Send answers to backend API
    fetch("/api/submit-answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleCancel = () => {
    // Reset answers and current question
    setAnswers({});
    setCurrentQuestion(0);
  };

  return (
    <div>
      {currentQuestion < questions.questions.length && (
        <div>
          <h2>{questions.questions[currentQuestion].text}</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Strongly Disagree</label>
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value="-2"
              onChange={() => handleAnswer(currentQuestion, -2)}
              style={{ width: "20px", height: "20px" }}
            />
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value="-1"
              onChange={() => handleAnswer(currentQuestion, -1)}
              style={{ width: "20px", height: "20px" }}
            />
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value="0"
              onChange={() => handleAnswer(currentQuestion, 0)}
              style={{ width: "20px", height: "20px" }}
            />
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value="1"
              onChange={() => handleAnswer(currentQuestion, 1)}
              style={{ width: "20px", height: "20px" }}
            />
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value="2"
              onChange={() => handleAnswer(currentQuestion, 2)}
              style={{ width: "20px", height: "20px" }}
            />
            <label>Strongly Agree</label>
          </div>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
      {currentQuestion === questions.questions.length && (
        <div>
          <h2>You've completed the questionnaire!</h2>
          <button onClick={handleSubmit}>Submit Answers</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Questionnaire;
