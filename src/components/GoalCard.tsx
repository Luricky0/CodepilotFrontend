import React, { useEffect, useState } from 'react'
import { getGoals, getRecommendation, postGoal } from '../api/userApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faRobot } from '@fortawesome/free-solid-svg-icons'
import { Problem } from '../api/problemApi'
import { useNavigate } from 'react-router'
const GoalCard = () => {
  const [goal, setGoal] = useState('')
  const [recProblem, setRecProblem] = useState<Problem>()
  const navigate = useNavigate()
  const load = async () => {
    const goals = await getGoals()
    const recommendation = await getRecommendation()
    if (recommendation) setRecProblem(recommendation)
    if (goals) setGoal(goals[goals.length - 1].goal)
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <div className="bg-white rounded-lg border-2 p-2">
      <h2 className="text-xl font-bold">My Current Goal</h2>
      <input
        type="text"
        value={goal}
        onChange={(e) => {
          if (e.target.value.length < 30) setGoal(e.target.value)
        }}
        onBlur={() => {
          postGoal(goal)
        }}
        placeholder="Set your goal!"
        className="text-xl focus:outline-none w-full"
      />
      {recProblem ? (
        <>
          <h2 className="text-l font-semibold flex gap-1 items-center">
            <FontAwesomeIcon icon={faRobot} style={{ color: 'orange' }} />
            Recommendation Based On Your Goal
          </h2>

          <div
            className="bg-white-dark p-1 cursor-pointer"
            onClick={() => {
              navigate(`/detail/${recProblem?._id}`)
            }}>
            {recProblem?.problemId}. {recProblem?.title}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
export default GoalCard
