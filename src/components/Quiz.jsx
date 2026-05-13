import { useState } from "react";

export default function Quiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // select an option
  function selectAnswer(questionId, option) {
    if (submitted) return; // lock answers after submit
    setAnswers(prev => ({
      ...prev,
      [questionId]: option,
    }));
  }

  // submit quiz
  function handleSubmit() {
    const correctCount = quiz.questions.filter(
      q => answers[q.id] === q.answer
    ).length;

    setScore(correctCount);
    setSubmitted(true);
  }

  // retry quiz
  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  }

  // check if all questions answered
  const allAnswered = quiz.questions.every(q => answers[q.id]);

  // calculate percentage
  const percentage = Math.round(
    (score / quiz.questions.length) * 100
  );

  // RESULT SCREEN
  if (submitted) {
    return (
      <div>
        <h2>{quiz.title}</h2>

        <p>
          {percentage >= 70 ? "🎉 Passed!" : "📖 Keep studying!"}
          {" "}
          {score}/{quiz.questions.length} correct ({percentage}%)
        </p>

        {quiz.questions.map(q => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.answer;

          return (
            <div key={q.id}>
              <p>{q.text}</p>
              <p>
                Your answer: {userAnswer} {isCorrect ? "✅" : "❌"}
              </p>

              {!isCorrect && (
                <p>Correct answer: {q.answer}</p>
              )}
            </div>
          );
        })}

        <button onClick={handleRetry}>Retry Quiz</button>
      </div>
    );
  }

  // QUIZ SCREEN
  return (
    <div>
      <h2>{quiz.title}</h2>

      {quiz.questions.map((q, i) => (
        <div key={q.id}>
          <p>{i + 1}. {q.text}</p>

          {q.options.map(opt => (
            <label key={opt}>
              <input
                type="radio"
                name={q.id}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => selectAnswer(q.id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
      >
        Submit Quiz
      </button>
    </div>
  );
}