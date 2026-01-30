import axiosInstance from '../utils/axiosInstance'

interface TopicTag {
  name: string
  slug: string
}

export interface ProblemRecord {
  problemId: string
  timestamp: number
  title: string
}

export interface Problem extends Document {
  _id: string
  problemId: string
  title: string
  content: string
  difficulty: string
  likes: number
  dislikes: number
  exampleTestcases: string
  codeSnippets: { lang: string; code: string }[]
  topicTags: TopicTag[]
  stats: {
    totalAccepted: string
    totalSubmission: string
    totalAcceptedRaw: number
    totalSubmissionRaw: number
    acRate: string
  }
  hints: string[]
}

export const fetchProblems = async (
  page = 1,
  limit = 20,
  searchQuery = '',
  difficultyFilter = 'All',
  likedOnly = 'false',
  completedOnly = 'false'
): Promise<{
  problems: Problem[]
  totalPages: number
  totalproblems: number
}> => {
  const res = await axiosInstance.get('/problems', {
    params: {
      page,
      limit,
      search: searchQuery || undefined,
      difficulty: difficultyFilter !== 'All' ? difficultyFilter : undefined,
      likedOnly,
      completedOnly
    },
  })
  const data = res.data
  const problems = data.problems

  return {
    problems,
    totalPages: data.totalPages,
    totalproblems: data.totalproblems,
  }
}

export const getProblem = async (problemId: string) => {
  try {
    const res = await axiosInstance.get(`/problem?problemId=${problemId}`)
    const { problem } = res.data
    return problem
  } catch (error) {
    console.log(error)
  }
}

export const getNextProblem = async (problemId: string) => {
  try {
    const res = await axiosInstance.post('/next', { problemId })
    const { nextProblemID } = res.data
    return nextProblemID
  } catch (error) {
    console.log(error)
  }
}
