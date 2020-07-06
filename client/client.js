console.log("Hello");

const formRef = document.querySelector("form");

// hiding loading element
const loadingRef = document.querySelector(".loading");
loadingRef.style.display = "none";

const API_URL = "http://localhost:5000/mews";

formRef.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formRef);
    const nameData = formData.get("name");
    const contentData = formData.get("content");

    const mew = {
        nameData,
        contentData,
    };

    // displaying loading element & hiding form element
    formRef.style.display = "none";
    loadingRef.style.display = "";

    // posting data to server API
    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(mew),
        headers: {
            "content-type": "application/json",
        },
    });
});
