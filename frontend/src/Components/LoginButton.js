import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

function LoginButton() {
  // Generate the GoogleLogin component and run login functions on success
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("OAuth2 response:", response);

      const googleUserData = await getUserFromGoogle(response.access_token);
      const mongoDBUser = await findUserInMongoDB(googleUserData, response.access_token);

      console.log("User:", googleUserData);
      console.log("MongoDB User:", mongoDBUser);

      if (mongoDBUser) {
        localStorage.setItem("user", JSON.stringify(mongoDBUser));
      } else {
        localStorage.removeItem("user");
      }
      
      window.location.reload();
    },
    onFailure: (response) => console.error(response),
  });

  // Get user information from Google and return a JSON object
  async function getUserFromGoogle(accessToken) {
    const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const googleUserData = await response.json();

    if (!googleUserData.email.endsWith("@milton.edu")) {
      alert("You must use a Milton email to login.");
      console.log("User is not a Milton student.");
      return null;
    }

    return {
      googleId: googleUserData.id,
      firstName: googleUserData.given_name,
      lastName: googleUserData.family_name,
      email: googleUserData.email,
      picture: googleUserData.picture,
    };
  }

  // Check if the user's email ends with @milton.edu. If so, check if the user is in mongoDB. If not, create a new user in mongoDB.
  async function findUserInMongoDB(user, accessToken) {
    try {
      const response = await fetch("https://rate-my-course-backend.onrender.com/users/googleId/" + user.googleId);

      if (!user.email.endsWith("@milton.edu")) {
        alert("You must use a Milton email to login.");
        console.log("User is not a Milton student.");
        return null;
      } else {

        // If there is no response, create a new user in MongoDB
        if (response.status === 404) {
          console.log("User not found in MongoDB. Creating new user.");
          await postUserToMongoDB(user, accessToken);
          

        // If the response goes through, retrieve the user data.
        } else if (response.status === 200) {
          console.log("User found in MongoDB.");


        } else {
          alert("An error occured. Status code: " + response.status, ". Please email Bryan.");
        }
      }
    } catch (error) {
      return null;
    }

    return user; 
  }

  async function postUserToMongoDB(user, accessToken) {
    var graduationYear = user.email.match(/\d+/g);
    if (graduationYear) {
      graduationYear = "20" + graduationYear[0];
    } else {
      graduationYear = 0;
    }

    graduationYear = parseInt(graduationYear);

    console.log("posting user to mongoDB. NEW:")
    console.log(user)

    await fetch("https://rate-my-course-backend.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleId: user.googleId,
        accessToken: accessToken,
        firstName: user.firstName,
        lastName: user.lastName,
        graduationYear: graduationYear,
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
