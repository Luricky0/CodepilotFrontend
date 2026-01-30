import axiosInstance from '../utils/axiosInstance'

export const checkToken = async () => {
  try {
    const res = await axiosInstance.get('/checktoken')
    return res.data.valid
  } catch (error) {
    console.log(error)
  }
}
export const getLikedProblems = async () => {
  try {
    const res = await axiosInstance.get('/liked')
    return res.data.likedProblemsIDs
  } catch (error) {
    console.log(error)
  }
}

export const likeProblem = async (problemId: string, title: string) => {
  try {
    const res = await axiosInstance.post('/like', { problemId, title })
    return res.data.likedProblemsIDs
  } catch (error) {
    console.log(error)
  }
}

export const getCompletedProblems = async () => {
  try {
    const res = await axiosInstance.get('/completed')
    return res.data.completedProblemsIDs
  } catch (error) {
    console.log(error)
  }
}

export const completeProblem = async (problemId: string, title: string) => {
  try {
    const res = await axiosInstance.post('/complete', { problemId, title })
    return res.data.completedProblemsIDs
  } catch (error) {
    console.log(error)
  }
}

export const getGoals = async () => {
  try {
    const res = await axiosInstance.get('/goals')
    return res.data.goals
  } catch (error) {
    console.log(error)
  }
}
export const postGoal = async (goal: string) => {
  try {
    const res = await axiosInstance.post('/setgoal', { goal })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
export const getRecommendation = async () => {
  try {
    const res = await axiosInstance.get('/recommendation')
    return res.data.recommendedProblem
  } catch (error) {
    console.log(error)
  }
}
