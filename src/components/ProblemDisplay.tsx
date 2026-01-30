import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Example } from '../type'
import { getNextProblem, Problem } from '../api/problemApi'
import '../styles/ProblemDisplay.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ExamplesDisplay = ({ examples }: { examples: Example[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {examples.map((example, index) => {
        return (
          <div>
            <h3 className="font-semibold">Example {index + 1}:</h3>
            <div className="px-4 border-l-2 border-gray">
              {(Object.keys(example) as Array<keyof Example>).map((key) => {
                return (
                  <div className="font-medium font-menlo">
                    {key}:
                    <span className="mx-1 font-normal text-black-55">
                      {example[key]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
const ConstraintsDisplay = ({ constraints }: { constraints: string[] }) => {
  return (
    <div>
      <h3 className="font-semibold">Constraints:</h3>
      <ul className="list-disc">
        {constraints.map((item) => {
          return <li className="rounded mx-4 my-1 text-sm">{item}</li>
        })}
      </ul>
    </div>
  )
}

const ProblemDisplay = ({ problem }: { problem: Problem }) => {
  const navigate = useNavigate()
  const onNext = async () => {
    try {
      const nextProblemId = await getNextProblem(problem.problemId)
      navigate(`/detail/${nextProblemId}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="h-screen rounded-lg px-4 py-5 border-2 bg-white flex flex-col gap-4">
      <div className="flex items-center">
        <img
          src="/logo.png"
          className="w-8 h-8 cursor-pointer"
          onClick={() => {
            navigate('/')
          }}
          alt="Main Page"
        />
        <h1 className="text-2xl bold font-bold mx-2">
          {problem?.problemId}. {problem?.title}
        </h1>
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => onNext()}
          size="2x"
          className="ml-auto cursor-pointer"
        />
      </div>
      <div
        className={`${
          problem?.difficulty === 'Medium' ? 'w-16' : 'w-12'
        } h-8 flex items-center justify-center font-semibold px-2 py-1 rounded text-white
    ${
      problem?.difficulty === 'Easy'
        ? 'bg-green-500'
        : problem?.difficulty === 'Medium'
        ? 'bg-yellow-500'
        : 'bg-red-500'
    }`}>
        {problem?.difficulty}
      </div>
      {problem ? (
        <div
          className="problemContent overflow-scroll overflow-x-hidden"
          dangerouslySetInnerHTML={{ __html: problem.content }}
        />
      ) : (
        <div />
      )}
      {/* <ExamplesDisplay examples={problem.examples} />
      <ConstraintsDisplay constraints={problem.constraints}/> */}
    </div>
  )
}

export default ProblemDisplay
