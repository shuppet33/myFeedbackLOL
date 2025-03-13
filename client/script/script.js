const feedbackForm = document.getElementById('feedbackForm');
const commentContainer = document.getElementById('commentContainer');
const backdrop = document.querySelector('.backdrop');



const spinner =  {
    activeRequest: 0,

    load() {
        this.activeRequest += 1
        this.setClassName()
    },

    loaded() {
        this.activeRequest -= 1
        this.setClassName()
    },

    setClassName() {
        if (this.activeRequest === 0) {
            backdrop.classList.add('backdrop-hidden')
        } else {
            backdrop.classList.remove('backdrop-hidden')
        }
    }
}

const formData = (form) => ({
    name: form.name.value,
    // rating: form.rating.value,
    comment: form.comment.value,
})

feedbackForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    spinner.load()
    const response = await fetch("http://localhost:8000/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData(feedbackForm))
    }).then(res => res.json())


    clearForm(feedbackForm)

    commentContainer.appendChild(feedbackHTML(response))

    spinner.loaded()


    scroll()
})

const getAllFeedbacks = async () => {
    spinner.load()
    const response = await fetch("http://localhost:8000/api/").then(res => res.json())
    response.forEach(feedback => commentContainer.appendChild(feedbackHTML(feedback)))
    spinner.loaded()

    scroll()
}


const feedbackHTML = (feedbackItem) => {
    const container = document.createElement('div');
    container.classList.add('feedback');
    container.innerHTML = `
            <div class="feedback-box">
                <div class="rating">
                    <img src="./public/feedback/starmini__active.png" alt="starmini">
                    <img src="./public/feedback/starmini__active.png" alt="starmini">
                    <img src="./public/feedback/starmini__active.png" alt="starmini">
                    <img src="./public/feedback/starmini__active.png" alt="starmini">
                    <img src="./public/feedback/starmini__active.png" alt="starmini">
                </div>
                <span>${feedbackItem.comment}</span>
            </div>
            <div class="avatarmini-box">
                <div class="avatarmini">

                    <div class="avatarmini__img">
                        <img src="./public/feedback/avatarmini.png" alt="avatarmini">
                    </div>

                </div>
                <div class="data">
                    <span class="name">${feedbackItem.name}</span>
                    <div class="data-now">${feedbackItem.createdAt}</div>
                </div>
                <div class="flag">
                    <img src="./public/feedback/flag.svg" alt="flag">
                </div>
            </div>
    `
    return container
}

function clearForm (form) {
    form.reset();
}


// function scroll() {
//     const container = document.getElementById('commentContainer')

//     let heightContainer = container.getBoundingClientRect()
//     if (heightContainer.height > 605) {
//         container.classList.add('scroll-y')
//     }
//     console.log(heightContainer)
// }

function scroll() {
    let conteinerHeight = commentContainer.scrollHeight
    commentContainer.scrollTo(0, conteinerHeight)
}

getAllFeedbacks()