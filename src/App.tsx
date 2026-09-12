import React, { useState } from "react";
const API_url = "http://localhost:5038/auth";
function App() {
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    const response = await fetch(`${API_url}/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userInput, password: inputPassword }),
    });
    if (!response.ok) {
      let errorMessage = "";
      if (response.status === 400 || response.status === 401) {
        errorMessage = "Invalid user Name or password";
      } else {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      setError(errorMessage);
      return;
    }
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.userName);
    console.log("User logged");
  };

  const handleReg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    const response = await fetch(`${API_url}/reg`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userInput, password: inputPassword }),
    });
    if (!response.ok) {
      let errorMessage = "";
      if (response.status === 400 || response.status === 401) {
        errorMessage = "Invalid user Name or password";
      } else {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      setError(errorMessage);
      return;
    }
    console.log("User registerd please log in");
  };
  return (
    <>
      <div className="LogBox">
        <h1>Chess Game</h1>
        <div className="Box">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <div className="ButtonsBox">
            <button onClick={handleReg}>Register</button>
            <button onClick={handleLogIn}>Log in</button>
          </div>
          {error && (
            <p
              style={{
                color: error.includes("successfully") ? "green" : "red",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
