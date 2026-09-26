export async function generateStudyMaterial(input, signal) {
  const response = await fetch("http://localhost:5000/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input }),
    signal
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate study material.");
  }

  if (!data.success || !data.data) {
    throw new Error("Server returned an unexpected response.");
  }

  return data.data;
}