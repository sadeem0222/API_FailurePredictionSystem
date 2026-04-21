import React, { useState } from "react";

function App() {
  const [apiCalls, setApiCalls] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [previousFailures, setPreviousFailures] = useState("");
  const [result, setResult] = useState("");

  const handlePredict = async () => {

    const data = {
      api_calls: Number(apiCalls),
      response_time: Number(responseTime),
      previous_failures: Number(previousFailures)
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      setResult(result.prediction);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>API Failure Prediction System</h2>

      <input
        placeholder="API Calls"
        value={apiCalls}
        onChange={(e) => setApiCalls(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Response Time"
        value={responseTime}
        onChange={(e) => setResponseTime(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Previous Failures"
        value={previousFailures}
        onChange={(e) => setPreviousFailures(e.target.value)}
      />

      <br /><br />

      <button onClick={handlePredict}>
        Predict
      </button>

      <h3>Result: {result}</h3>

    </div>
  );
}

export default App;