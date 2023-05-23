export const userStore = {
  userList: [],
  user: {
    msg: "I'm an object",
  },
  currentUser: "",
  isLoggedIn: false,
  usersData: [],
  favoritos: [],
  chatbotResponse: "",
  providerList: [],
  provider: null,
  currentProvider: null,
  providersData: [],
};

export const userActions = (getStore, getActions, setStore) => {
  return {
    login: async (email, password) => {
      try {
        const store = getStore();
        const response = await fetch("http://127.0.0.1:3001/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();
        const user = data.user;

        console.log("Response Data:", data);

        if (response.ok) {
          const token = data.access_token; // Modify this line to use the correct token property name (e.g., access_token)
          localStorage.setItem("token", token); // Store the token in localStorage
          console.log("Token stored in localStorage:", token);
          setStore({ ...getStore(), isLoggedIn: true }); // Set the isLoggedIn state to true
        } else {
          console.log("Login failed");
          localStorage.removeItem("token"); // Remove token from localStorage
          setStore({ ...getStore(), isLoggedIn: false }); // Set the isLoggedIn state to false
        }

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

        if (response.ok) {
          const provider = data.provider;
          const provider_id = data.provider_id; // Access the provider ID from the response
          localStorage.setItem("token", data.token);
          setStore({ provider, error: null });
          console.log("Provider ID:", provider_id);
          return { ok: true, provider };
        } else {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ provider: null, error: message });
        return { ok: false, message };
      }
    },

    sendEmail: async (fullname, email, phone, subject, message) => {
      const url = "http://127.0.0.1:3001/api/send-email";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        fullname: fullname,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
      });

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body,
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        const data = await response.json();
        console.log(data);
        return data; // Return the data for handling in the calling function
      } catch (error) {
        console.error("Failed to send email:", error);
        throw error; // Rethrow the error for handling in the calling function
      }
    },
    forgotPassword: async (email) => {
      const url = "http://127.0.0.1:3001/api/forgot-password";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        email: email,
      });

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body,
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        const data = await response.json();
        console.log(data);
        return data; // Return the data for handling in the calling function
      } catch (error) {
        console.error("Failed to send reset password email:", error);
        throw error; // Rethrow the error for handling in the calling function
      }
    },
    infoUser: async (userData) => {
      const url = "http://127.0.0.1:3001/api/info_user";
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = JSON.stringify(userData);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body,
        });

        if (!response.ok) {
          throw new Error("Failed to save changes");
        }

        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Failed to save changes:", error);
        throw error;
      }
    },

    infoProvider: async (userData) => {
      const url = "http://127.0.0.1:3001/api/info_provider";
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = JSON.stringify(userData);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body,
        });

        if (!response.ok) {
          throw new Error("Failed to save provider changes");
        }

        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Failed to save provider changes:", error);
        throw error;
      }
    },
    getInfoUser: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:3001/api/info_user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data); // Log the response data
        const infoUser = data; // Assuming the response contains the InfoUser data
        setStore({ infoUser, error: null }); // Update the store with infoUser
        return infoUser;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ infoUser: null, error: message }); // Update the store with infoUser as null
        throw error;
      }
    },

    getInfoProvider: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://127.0.0.1:3001/api/info_provider",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data); // Log the response data
        const infoProvider = data; // Assuming the response contains the InfoProvider data
        setStore({ infoProvider, error: null }); // Update the store with infoProvider
        return infoProvider;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ infoProvider: null, error: message }); // Update the store with infoProvider as null
        throw error;
      }
    },
    updateUser: async (userData) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:3001/api/info_user-edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      const data = await response.json();
      return { status: response.status, data: data };
    },

    updateProvider: async (providerData) => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:3001/api/info_provider-edit`, // Remove providerId from the URL
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(providerData), // Remove providerId from the request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update provider profile");
      }

      const data = await response.json();
      return { status: response.status, data: data };
    },

    getUserProfilePicture: async () => {
      const url = "http://127.0.0.1:3001/api/profile_picture/users";
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(url, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile picture");
        }

        const data = await response.json();
        console.log(data);
        return data.profilePictureUrl; // Return the profile picture URL for rendering
      } catch (error) {
        console.error("Failed to fetch user profile picture:", error);
        throw error;
      }
    },

    getProviderProfilePicture: async () => {
      const url = "http://127.0.0.1:3001/api/profile_picture/providers";
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(url, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch provider profile picture");
        }

        const data = await response.json();
        console.log(data);
        return data.profilePictureUrl; // Return the profile picture URL for rendering
      } catch (error) {
        console.error("Failed to fetch provider profile picture:", error);
        throw error;
      }
    },
  };
};
