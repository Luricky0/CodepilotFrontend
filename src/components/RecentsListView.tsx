import React from 'react'
import { ProblemRecord } from '../api/problemApi'
import { useNavigate } from 'react-router'

const RecentsListView = ({ problemList }: { problemList: ProblemRecord[] }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full gap-2">
      {problemList?problemList
        .slice(-5)
        .reverse()
        .map((p, index) => (
          <div
            className={`w-full grid grid-cols-[3fr_1fr] items-ceneter gap-2 p-1
            ${index % 2 === 0 ? 'bg-white-dark' : 'bg-white'}`}>
            <div
              className="whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
              onClick={() => {
                navigate(`/detail/${p.problemId}`)
              }}>
              {p.title}
            </div>
            <div className="flex flex-row-reverse whitespace-nowrap text-ellipsis">
              {new Date(p.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        )):<></>}
    </div>
  )
}

export default RecentsListView
