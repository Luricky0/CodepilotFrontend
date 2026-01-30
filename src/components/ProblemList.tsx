import React, { useEffect, useRef, useState } from 'react'
import { fetchProblems, Problem } from '../api/problemApi'
import 'font-awesome/css/font-awesome.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import {
  completeProblem,
  getCompletedProblems,
  getLikedProblems,
  likeProblem,
} from '../api/userApi'
import { useNavigate } from 'react-router-dom'

const ProblemList = ({
  likedProblemsIDs,
  setLikedProblemsIDs,
  completedProblemsIDs,
  setCompletedProblemsIDs,
}: any) => {
  const [problems, setproblems] = useState<Problem[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [likedOnly, setLikedOnly] = useState(false)
  const [completedOnly, setCompletedOnly] = useState(false)
  const [loading, setLoading] = useState(true)

  const debounceTimeout = useRef<any>(null)
  const navigate = useNavigate()

  const load = async () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = setTimeout(async () => {
      try {
        const data = await fetchProblems(
          page,
          20,
          searchQuery,
          difficultyFilter,
          likedOnly.toString(),
          completedOnly.toString(),
        )

        if (page > data.totalPages && data.totalPages > 0) {
          setPage(data.totalPages)
          return
        }

        setLikedProblemsIDs(await getLikedProblems())
        setCompletedProblemsIDs(await getCompletedProblems())
        setTotalPages(data.totalPages)
        setproblems([...data.problems])
      } catch (err) {
        console.error('Error fetching problems:', err)
      } finally {
        setLoading(false)
      }
    }, 100)
  }

  const onLike = async (problemId: string, title: string) => {
    try {
      await likeProblem(problemId, title)
      load()
    } catch (error) {
      console.log(error)
    }
  }

  const onComplete = async (problemId: string, title: string) => {
    try {
      await completeProblem(problemId, title)
      load()
    } catch (error) {
      console.log(error)
    }
  }

  const onClick = (problem: Problem) => {
    navigate(`/detail/${problem._id}`, { state: { problem } })
  }

  useEffect(() => {
    load()
  }, [page, difficultyFilter, likedOnly, completedOnly])

  useEffect(() => {
    load()
    setPage(1)
  }, [difficultyFilter, likedOnly, completedOnly])
  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div>
      <div className="rounded-lg px-4 py-5 border-2 bg-white">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Problems</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') load()
            }}
            onBlur={() => load()}
            className="border px-2 py-1 rounded"
          />

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="border px-2 py-1 rounded">
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <i
            className={`fa fa-heart
             text-red-500 fa-2x cursor-pointer`}
            style={likedOnly ? { color: 'red' } : { color: '#dddddd' }}
            onClick={() => {
              setCompletedOnly(false)
              setLikedOnly(!likedOnly)
            }}></i>

          <FontAwesomeIcon
            icon={faCircleCheck}
            style={completedOnly ? { color: 'green' } : { color: '#dddddd' }}
            className="cursor-pointer"
            size="2x"
            onClick={() => {
              setCompletedOnly(!completedOnly)
              setLikedOnly(false)
            }}
          />
        </div>

        <div className="p-3 grid grid-cols-[8fr_1fr_1fr] gap-4 border-b border-black-08 text-black-55">
          <div>Title</div>
          <div>Difficulty</div>
          <div>Actions</div> {/* New Actions column */}
        </div>
        {problems.map((q, index) => (
          <div
            key={q.problemId}
            className={`p-2 grid grid-cols-[8fr_1fr_1fr] gap-4 items-center 
            ${index % 2 === 0 ? 'bg-white-dark' : 'bg-white'}`}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onClick(q)}
              className="cursor-pointer">
              {q.problemId}. {q.title}
            </a>
            <div
              className={`font-semibold text-sm
            ${
              q.difficulty === 'Easy'
                ? 'text-green-500'
                : q.difficulty === 'Medium'
                  ? 'text-yellow-500'
                  : 'text-red-500'
            }`}>
              {q.difficulty}
            </div>
            <div className="grid grid-cols-[1fr_1fr] items-center ">
              {likedProblemsIDs?.some(
                (item: { problemId: string }) => item.problemId === q._id,
              ) ? (
                <i
                  className="fa fa-heart text-red-500 fa-2x"
                  onClick={() => onLike(q._id, q.title)}></i>
              ) : (
                <i
                  className="fa fa-heart fa-2x"
                  style={{ color: '#dddddd' }}
                  onClick={() => onLike(q._id, q.title)}></i>
              )}

              {completedProblemsIDs?.some(
                (item: { problemId: string }) => item.problemId === q._id,
              ) ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ color: 'green', fontSize: '2rem' }}
                  onClick={() => onComplete(q._id, q.title)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ color: '#dddddd', fontSize: '2rem' }}
                  onClick={() => onComplete(q._id, q.title)}
                />
              )}
            </div>
          </div>
        ))}

        {/* Page Chooser */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-black-08 rounded disabled:opacity-50">
            Last
          </button>
          <span className="text-gray-600">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-black-08 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProblemList
