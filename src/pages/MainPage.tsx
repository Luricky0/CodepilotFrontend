import React, { useState } from 'react'
import ProblemList from '../components/ProblemList'
import UserCard from '../components/UserCard'
import { ProblemRecord } from '../api/problemApi'
import GoalCard from '../components/GoalCard'

const MainPage = () => {
  const [likedProblemsIDs, setLikedProblemsIDs] = useState<ProblemRecord[]>([])
  const [completedProblemsIDs, setCompletedProblemsIDs] = useState<
    ProblemRecord[]
  >([])
  return (
    <>
      <h1 className="flex items-center font-menlo text-4xl py-4">
        <img src="/logo.png" className="w-10 h-10 mx-2" alt="Logo" />
        Codepilot
      </h1>
      <div className="grid grid-cols-[3fr_1fr] gap-2 mx-2">
        <ProblemList
          likedProblemsIDs={likedProblemsIDs}
          setLikedProblemsIDs={setLikedProblemsIDs}
          completedProblemsIDs={completedProblemsIDs}
          setCompletedProblemsIDs={setCompletedProblemsIDs}
        />
        <div className='flex flex-col gap-2'>
          <GoalCard />
          <UserCard
            likedProblemsIDs={likedProblemsIDs}
            completedProblemsIDs={completedProblemsIDs}
          />
        </div>
      </div>
    </>
  )
}

export default MainPage
