import axios from "axios";

export const api = {
  getUsers: async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      return response.data;
    } catch (error) {
      console.error("ERROR FETCH USERS", error);
      // return [];
      throw error; // ❌ кидаємо далі, щоб Redux Thunk зловив
    }
  },
};
