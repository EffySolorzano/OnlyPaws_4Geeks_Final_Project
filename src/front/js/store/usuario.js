export const userStore = {
  userList: [],
  user: {
    msg: "I'm an object",
  },
  currentUser: "",
  isLoggedIn: true,
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
        // let userActions = await getActions().getUserInfo();
        //let actions = await getActions().getInfoProvider();
        const response = await fetch("http://127.0.0.1:3001/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();

        console.log("Response Data:", data);

        if (response.ok) {
          const token = data.access_token;
          const role = data.role; // Get the role from the response data
          const id = data.role === "user" ? data.id : data.provider_id; // Get the ID based on the role
          localStorage.setItem("token", token);
          console.log("Token stored in localStorage:", token);
          setStore({
            ...getStore(),
            isLoggedIn: true,
            role: role, // Set the role based on the response data
            id: id,
          });
          localStorage.setItem("isLoggedIn", "true");
        } else {
          console.log("Login failed");
          localStorage.removeItem("token");
          setStore({ ...getStore(), isLoggedIn: false, role: null, id: null });
          localStorage.removeItem("isLoggedIn");
        }

        return response;
      } catch (error) {
        const message = error.message || "Something went wrong";
        setStore({ user: null, error: message });
        throw error;
      }
    },

    checkLoggedIn: () => {
      const token = localStorage.getItem("token");
      const isLoggedIn = token !== null;
      setStore({ isLoggedIn });
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
          localStorage.removeItem("profileData"); // Added this line
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
    getUserInfo: async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch("http://127.0.0.1:3001/api/info_user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch user info");
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        console.log("User Info: ", data);

        // Do something with the data, like returning it
        return data;
      } catch (error) {
        console.log("Error fetching user info", error);
        throw error;
      }
    },

    getInfoProvider: async () => {
      try {
        const store = getStore();
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

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

        if (!response.ok) {
          console.log("Failed to fetch InfoProvider data");
          throw new Error("Failed to fetch InfoProvider data");
        }

        const data = await response.json();
        return data; // Here you return the data so you can use it in your components
      } catch (error) {
        console.log("Error fetching InfoProvider data", error);
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
    deleteProvider: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://127.0.0.1:3001/api/info_provider",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          console.log("Provider deleted successfully");
        } else {
          const data = await response.json();
          console.log("Failed to delete provider:", data.error);
        }
      } catch (error) {
        console.error("Failed to delete provider:", error);
      }
    },
    deleteUser: async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:3001/api/info_user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("User deleted successfully");
        } else {
          const data = await response.json();
          console.log("Failed to delete user:", data.error);
        }
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },
    uploadProviderPicture: async (file) => {
      const url = "http://127.0.0.1:3001/api/upload/provider";
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload provider profile picture");
        }

        const data = await response.json();
        console.log("Success!!!!", data);
        return data.ruta; // Return the profile picture URL for rendering
      } catch (error) {
        console.error("Failed to upload provider profile picture:", error);
        throw error;
      }
    },
  };
};
