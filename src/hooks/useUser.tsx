
import useLocalStorage from "./useLocalStorage"
const useUser = () => {
  const [username,setUsername,removeUsername] = useLocalStorage('username','');
  const [token,setToken,removeToken] = useLocalStorage('token','');

  return {
    username,
    setUsername,
    removeUsername,
    token,
    setToken,
    removeToken,
  }

}
export default useUser;