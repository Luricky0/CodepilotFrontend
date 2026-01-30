import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faCheck,
  faCircleCheck,
  faLightbulb,
  faRobot,
  faTag,
} from '@fortawesome/free-solid-svg-icons'
import { Problem, ProblemRecord } from '../api/problemApi'
import { completeProblem, getCompletedProblems } from '../api/userApi'
import { getAnalyzation, getAnswer, getEvaluation } from '../api/aiAPi'
import ReactMarkdown from 'react-markdown'

const CodeLangMap: Record<number, string> = {
  0: 'cpp',
  1: 'java',
  2: 'python',
  // 3: 'python',
  4: 'c',
  5: 'csharp',
  6: 'javascript',
  7: 'typescript',
}
const CodeLangShowMap: Record<string, string> = {
  cpp: 'C++',
  java: 'Java',
  python: 'Python',
  c: 'C',
  csharp: 'C#',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
}
const CodeLangNum: Record<string, number> = {
  'C++': 0,
  Java: 1,
  Python: 2,
  Python3: 3,
  C: 4,
  'C#': 5,
  JavaScript: 6,
  TypeScript: 7,
}
const CodeEditor = ({ problem }: { problem: Problem }) => {
  const codeSnippets = problem.codeSnippets
  const [lang, setLang] = useState(0)
  const [code, setCode] = useState(codeSnippets[lang]?.code || '')
  const [showHint, setShowHint] = useState(false)
  const [AIState, setAIState] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [evaluation, setEvaluation] = useState('')
  const [completedProblemsIDs, setCompletedProblemsIDs] = useState<
    ProblemRecord[]
  >([])
  const [AIModel, setAIModel] = useState('gemini')

  const load = async () => {
    try {
      setCompletedProblemsIDs(await getCompletedProblems())
    } catch (err) {
      console.error(err)
    }
  }

  const onComplete = async () => {
    try {
      await completeProblem(problem._id, problem.title)
      load()
    } catch (error) {
      console.log(error)
    }
  }

  const onAI = async () => {
    if (!isAILoading) {
      setIsAILoading(true)
      setAIState('evaluate')
      const res = await getEvaluation(problem.title, code, AIModel)
      setEvaluation(res?.data?.message)
      setIsAILoading(false)
    }
  }

  const onAIAnswer = async () => {
    if (!isAILoading) {
      setIsAILoading(true)
      setAIState('answer')
      const res = await getAnswer(
        problem.title,
        problem.content,
        CodeLangMap[lang],
        AIModel,
      )
      setEvaluation(res?.data?.message)
      setIsAILoading(false)
    }
  }

  const onAIAnalyzeProblem = async () => {
    if (!isAILoading) {
      setIsAILoading(true)
      setAIState('analyze')
      const res = await getAnalyzation(problem.title, problem.content, AIModel)
      setEvaluation(res?.data?.message)
      setIsAILoading(false)
    }
  }

  useEffect(() => {
    setCode(codeSnippets[lang]?.code || '')
  }, [lang, codeSnippets])

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="h-screen rounded-lg px-4 border-2 bg-white h-scrren">
      <h2 className="my-2 font-bold">Code</h2>
      <div className="flex flex-col h-[94vh]">
        <div className="h-16 flex justify-between items-center">
          <div className="flex">
            <select
              id="lang-select"
              value={lang}
              onChange={(e) => {
                console.log(Number(e.target.value))
                setLang(Number(e.target.value))
              }}
              className="border rounded px-2 py-1">
              {Object.entries(CodeLangMap).map(([key, value]) => (
                <option key={key} value={key}>
                  {CodeLangShowMap[value]}
                </option>
              ))}
            </select>
            <div className="mx-2 flex gap-2">
              {showHint ? (
                problem.topicTags.map((item) => (
                  <div className="rounded bg-white-dark p-1">{item.name}</div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex flex-row-reverse gap-3 px-2">
            <select
              value={AIModel}
              onChange={(e) => setAIModel(e.target.value)}
              className="border px-2 py-1 rounded">
              <option value="gemini">Gemini</option>
            </select>
            <FontAwesomeIcon
              icon={faCircleCheck}
              size="2x"
              style={
                completedProblemsIDs.some((p) => p.problemId === problem._id)
                  ? { color: 'green' }
                  : {}
              }
              onClick={() => onComplete()}
              title="Mark as completed"
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faBookOpen}
              size="2x"
              title="Show the answer"
              onClick={() => {
                onAIAnswer()
              }}
              style={AIState === 'answer' ? { color: 'orange' } : {}}
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faRobot}
              size="2x"
              title="AI review"
              onClick={() => {
                onAI()
              }}
              style={AIState === 'evaluate' ? { color: 'purple' } : {}}
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faLightbulb}
              title="Analyze the problem"
              size="2x"
              onClick={() => {
                onAIAnalyzeProblem()
              }}
              style={AIState === 'analyze' ? { color: 'blue' } : {}}
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faTag}
              size="2x"
              onClick={() => setShowHint(!showHint)}
              style={showHint ? { color: 'orange' } : {}}
              title="Show the hints"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            language={CodeLangMap[lang]}
            value={code}
            onChange={(val) => setCode(val || '')}
            theme="vs-light"
          />
        </div>
        <div
          className="rounded bg-white-dark p-2 overflow-scroll overflow-x-hidden overflow-y-auto
 max-h-[50vh]">
          <ReactMarkdown>
            {isAILoading ? 'Loading...' : evaluation}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
