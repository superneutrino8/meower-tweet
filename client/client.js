console.log("Hello");

const formRef = document.querySelector("form");

// hiding loading element
const loadingRef = document.querySelector(".loading");
loadingRef.style.display = "none";

formRef.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formRef);
    const nameData = formData.get("name");
    const contentData = formData.get("content");
    const cat = {
        nameData,
        contentData,
    };
    console.log(cat);

    // displaying loading element & hiding form element
    formRef.style.display = "none";
    loadingRef.style.display = "";
});
