import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useData } from '../UserContext';
// import { UserContext } from '../UserContext';

function Quiz() {
  // app state
  const { data, updateData } = useData();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [timer, setTimer] = useState(60);
  const [result, setResult] = useState(false)
  const [ans, setAns] = useState([])
  const [userData, setUserdata] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()

  //UseEffect Hook for Api call and data 
  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=15").then((res) => {
      const { data } = res;
      if (data.results) {
        const Result = data.results.map((question) => ({
          question: question.question,
          answers: [...question.incorrect_answers, question.correct_answer],
        }));
        console.log("Result", Result)
        setQuestions(Result);
      }
      setUserdata(res?.data?.results);
    });
  }, []);

  console.log("questions", userData)
  console.log("Ans", ans)

  //onclick Handlers
  const handleAnswerClick = (selectedOption) => {
    const questionData = userData[activeQuestion];
    console.log("ActiveQuestion", questionData);
    console.log("selectedOption", questionData?.question + selectedOption);
    const updatedAns = [...ans, { Answer: selectedOption, Question: questionData?.question }];
    setAns(updatedAns);

    if (activeQuestion < userData.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else if (activeQuestion === userData.length - 1) {
      const updatedData = {
        userSelected: updatedAns,
        userData: userData,
      };

      updateData(updatedData);
      navigate("/report");
    }
  };

  console.log(result)

  return (
    <>
      <div className='text-[60px] font-bold pl-[10px] bg-[#1414143d] '>Quizzly</div>
      <hr className='mt-[1px] bg-[black] h-[3px]' />
      <div className='flex items-center justify-evenly pt-[100px]'>

        <div className='bg-[#1414143d] w-[60%] pl-[10px] rounded-lg '>
          <div className='text-[30px] font-bold text-zinc-800'>Question {activeQuestion + 1}</div>
          <div className='font-sans  text-[32px]'>{userData[activeQuestion]?.question}</div>
          <ul className='flex w-[80%] justify-evenly'>
            {questions[activeQuestion]?.answers?.map((option, index) => (
              <li className='flex' key={index} onClick={() => handleAnswerClick(option)}>
                <button className='rounded-md bg-[#6dd4fdf2] border-[1px] tracking-wider text-[15px] border-zinc-600 mr-[15px] w-[150px] cursor-pointer active:bg-[#c4bbf0] border-0 py-[15px] px-8'>{option}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mark-box w-[30%] bg-[#32327b3d] rounded-md">
          <div className="card mb-3">
            <div
              className="card-body"
              style={{
                display: "flex",
                padding: 10,
                flexWrap: "wrap"
              }}
            >
              {userData.map((item, index) => (
                <div
                  key={index}
                  className="question-no"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                    width: 50,
                    marginTop: "20px",
                    marginLeft: "20px",
                    marginBottom: "5px",
                    border: "1px solid black",
                    borderRadius: "5px",

                    cursor: "pointer",
                    backgroundColor:
                      index === activeQuestion
                        ? "#94cfe7"
                        : item?.selected
                          ? "grey"
                          : "#EAEAEA"
                  }}
                  onClick={() => setActiveQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='flex pl-[46px] pt-[20px]'>
        <button onClick={handleAnswerClick} className='rounded-sm font-bold  bg-[#0179a9] cursor-pointer active:bg-[#c4bbf0] text-[white] border-0 py-[15px] px-8'>
          NEXT
        </button>
      </div>
    </>
  );

}

export default Quiz;
