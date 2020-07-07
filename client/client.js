console.log("Hello");

const formRef = document.querySelector("form");

// hiding loading element
const loadingRef = document.querySelector(".loading");
loadingRef.style.display = "";

const mewsRef = document.querySelector(".mews");

const API_URL = "http://localhost:5000/mews";

loadAllMews();

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
    })
        .then((res) => res.json())
        .then((createdMew) => {
            console.log(createdMew);
            formRef.reset();
            formRef.style.display = "";
            loadAllMews();
        });
});

function loadAllMews() {
    mewsRef.innerHTML = "";
    fetch(API_URL)
        .then((res) => res.json())
        .then((mews) => {
            mews.reverse();
            mews.forEach((mew) => {
                const div = document.createElement("div");
                div.classList.add("mews__single");

                const header = document.createElement("h3");
                header.textContent = mew.name;

                const contents = document.createElement("p");
                contents.textContent = mew.content;

                const date = document.createElement("small");
                date.textContent = new Date(mew.created);

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                mewsRef.appendChild(div);
            });
            loadingRef.style.display = "none";
        });
}
