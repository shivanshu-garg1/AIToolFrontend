import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setPrompt(""); // Clear the input field

    try {
      const serverUrl = "https://aitoolbackend-xyu9.onrender.com/api/generate";

      const res = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      const content = data.response || "No valid response from server.";

      if (content && content !== "No valid response from server.") {
        navigator.clipboard.writeText(content).then(() => {
          console.log("done");
        }).catch(err => {
          console.warn("Could not copy text to clipboard: ", err);
        });
      }

    } catch (error) {
      console.error("Error fetching response from backend:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter"
        disabled={isLoading}
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        submit
      </button>
    </div>
  );
}

export default App;
