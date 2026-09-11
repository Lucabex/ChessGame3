import { useState } from "react";

function App() {
  const [error, setError] = useState("");
  const handleLogIn = async (e: React.SubmitEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return <></>;
}
export default App;
