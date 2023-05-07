export const userStore = {
  userList: [],
  user: {
    msg: "I'm an object",
  },
  currentUser: "",
  isLoggedIn: false,
  usersData: [],
  favoritos: [],
};

export const userActions = (getStore, getActions, setStore) => {
  const useLocalFetch = async (endpoint, body = "", method = "GET") => {
    try {
      const url = "http://127.0.0.1:3001/api" + endpoint;
      const requestInit = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: body ? JSON.stringify(body) : null,
      };
      const response = await fetch(url, requestInit);
      const respuestaJson = await response.json();
      return { respuestaJson, response };
    } catch (error) {
      console.log("Error loading data from local API", error);
    }
  };

  return {
    login: async (email, password) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:3001/api" + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();
        const user = data.user;
        localStorage.setItem("token", data.token);
        setStore({ ...getStore(), isLoggedIn: true });
        return response;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: message });
        throw error;
      }
    },

    logout: async () => {
      let body = "";
      let { respuestaJson, response } = await useFetch("/logout", body, "POST");
      if (response && response.ok) {
        localStorage.setItem("token", "");
        sessionStorage.setItem("token", "");
        setStore({ ...getStore(), isLoggedIn: false });
      } else {
        console.log("Error logging out", respuestaJson.message);
      }
    },

    getUser: async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const response = await fetch(
          "http://127.0.0.1:3001/api" + "/get-user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        const user = data.user;
        setStore({ user, error: null });
        return user;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: message });
        throw error;
      }
    },
    register: async (
      name,
      surname,
      country,
      username,
      email,
      password,
      isAuthenticated
    ) => {
      try {
        console.log(
          name,
          surname,
          country,
          username,
          email,
          password,
          isAuthenticated
        );
        const response = await fetch("http://127.0.0.1:3001/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            surname: surname,
            country: country,
            username: username,
            email: email,
            password: password,
            is_authenticated: isAuthenticated,
          }),
        });
        const data = await response.json();
        const user = data.user;
        localStorage.setItem("token", data.token);
        setStore({ user, error: null });
        return { ok: true, user };
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: "Something went wrong" });
        return { ok: false, message };
      }
    },
    petSitterRegister: async (
      name,
      surname,
      country,
      username,
      email,
      password,
      isAuthenticated
    ) => {
      try {
        console.log(
          name,
          surname,
          country,
          username,
          email,
          password,
          isAuthenticated
        );
        const response = await fetch(
          "http://127.0.0.1:3001/api/register-provider",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              surname: surname,
              country: country,
              username: username,
              email: email,
              password: password,
              is_authenticated: isAuthenticated,
            }),
          }
        );
        const data = await response.json();
        const user = data.user;
        localStorage.setItem("token", data.token);
        setStore({ user, error: null });
        return { ok: true, user };
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: "Something went wrong" });
        return { ok: false, message };
      }
    },
  };
};
