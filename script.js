const api = "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";

const generateImages = async () => {
  const inp = document.getElementById("input").value;

  const methods = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api}`,
    },
    body: JSON.stringify({
      prompt: inp,
      n: 3,
      size: "256x256",
    }),
  };

  try {
    const res = await fetch(
      "https://api.openai.com/v1/images/generations",
      methods
    );

    console.log("Response Status:", res.status);

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(
        `HTTP error! Status: ${res.status}. Error message: ${errorMessage}`
      );
      return;
    }

    const data = await res.json();

    console.log("API Response:", data);

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid response format");
    }

    const listImages = data.data;
    const images = document.getElementById("images");
    images.innerHTML = "";

    listImages.forEach((image) => {
      images.innerHTML += `
        <div>
          <img src='${image.url}' />
        </div>`;
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error.message);
  }
};
