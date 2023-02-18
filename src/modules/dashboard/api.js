import axios from "axios"

export async function getUsers() {
  const { data } = await axios.get("https://63ec770432a08117239b6d61.mockapi.io/api/users")
  return data
}