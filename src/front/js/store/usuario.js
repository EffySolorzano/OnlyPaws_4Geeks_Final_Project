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
  return {
    login: async (email, password) => {
      try {
        const store = getStore();
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
        setStore({ ...getStore(), isLoggedIn: true }); // Set the isLoggedIn state to true
        return response;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: message });
        throw error;
      }
    },

    logout: async () => {
      const store = getStore();
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:3001/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          localStorage.setItem("token", "");
          sessionStorage.setItem("token", "");
          setStore({ ...getStore(), isLoggedIn: false });
        } else {
          const responseData = await response.json();
          console.log("Error logging out", responseData.message);
        }
      } catch (error) {
        console.log("Error logging out", error);
      }
    },

   getProvider: async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/providers", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data); // Log the response data
        const providers = data; // Assuming the response contains an array of providers
        setStore({ providers, error: null }); // Update the store with providers instead of user
        return providers;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ providers: null, error: message }); // Update the store with providers as null
        throw error;
      }
    },

    getUser: async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/providers", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        const users = data;
        setStore({ users, error: null });
        return users;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ users: null, error: message });
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
    signup: async (
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
