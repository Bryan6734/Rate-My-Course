import React from "react";
import { useGoogleLogin } from "@react-oauth/google";


function LoginButton() {

  // Generate the GoogleLogin component and run login functions on success
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("OAuth2 response:", response);

      const user = await getUserFromGoogle(response.access_token);
      const mongoDBUser = await findUserInMongoDB(user, response.access_token);
      
      console.log("User:", user);
      console.log("MongoDB User:", mongoDBUser);
      window.location.reload();

    },
    onFailure: (response) => console.error(response),
  });

  // Get user information from Google and return a JSON object
  async function getUserFromGoogle(accessToken){
    const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = await response.json();

    return { googleId: user.id, ...user };
  }

  // Check if the user's email ends with @milton.edu. If so, check if the user is in mongoDB. If not, create a new user in mongoDB.
  async function findUserInMongoDB(user, accessToken) {

    const response = await fetch("http://127.0.0.1:8000/users/googleId/" + user.googleId);

    const emailEnding = "@milton.edu";
    if (user.email.endsWith(emailEnding)) {
      const text = await response.text();

      if (text.length === 0) {
        console.log("User not found in MongoDB. Creating new user.");
        await postUserToMongoDB(user, accessToken);
      } else {
        console.log("User found in MongoDB.");
      }

      // Save user to localStorage (change later to use cookies)
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  // Post user to MongoDB if they are not already in the database
  async function postUserToMongoDB(user, accessToken) {
    await fetch("http://127.0.0.1:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleId: user.googleId,
        accessToken: accessToken,
        name: user.name,
        email: user.email,
        picture: user.picture,
      }),
    });

  }

  return (
    <button className="login-btn" onClick={() => login()}>
      Login
    </button>
  );
}

export default LoginButton;
