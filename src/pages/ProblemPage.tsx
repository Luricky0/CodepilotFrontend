import React, { useEffect, useState } from 'react'
import ProblemDisplay from '../components/ProblemDisplay'
import CodeEditor from '../components/CodeEditor'
import { useParams } from 'react-router-dom'
import { getProblem, Problem } from '../api/problemApi'
export default function ProblemPage() {
  const { problemId } = useParams()
  const [problem, setProblem] = useState<Problem | null>(null)
  const load = async () => {
    if (problemId) setProblem(await getProblem(problemId))
  }
  useEffect(() => {
    load()
  }, [problemId])
  return (
    <div className="h-screen w-screen grid grid-cols-[1fr_2fr]">
      {problem ? <ProblemDisplay problem={problem} /> : <></>}
      {problem ? <CodeEditor problem={problem} /> : <></>}
    </div>
  )
}
