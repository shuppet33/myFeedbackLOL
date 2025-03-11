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
    rating: form.rating.value,
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
})

const getAllFeedbacks = async () => {
    spinner.load()
    const response = await fetch("http://localhost:8000/api/").then(res => res.json())
    response.forEach(feedback => commentContainer.appendChild(feedbackHTML(feedback)))
    spinner.loaded()
}


const feedbackHTML = (feedbackItem) => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="createdAt">${feedbackItem.createdAt}</div>
        <div class="name">${feedbackItem.name}</div>
        <div class="rating">${feedbackItem.rating}</div>
        <div class="comment">${feedbackItem.comment}</div>
    `
    return container
}

function clearForm (form) {
    form.reset();
}


getAllFeedbacks()