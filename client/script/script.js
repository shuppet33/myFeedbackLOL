const feedbackForm = document.getElementById('feedbackForm');
const commentContainer = document.getElementById('commentContainer');
const backdrop = document.querySelector('.backdrop');

const errorValidation = document.querySelector('.err');

const avatar = document.querySelectorAll('.avatar')
const arrowUp = document.getElementById('arrow-up')
const arrowDown = document.getElementById('arrow-down')


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


const imgId = {
    avatarList: avatar,
    id: 1,
    imgShow(i) {

        if (i < 1) {
            this.id = this.avatarList.length;
        }

        if (i > avatar.length) {
            this.id = 1;
        }

        for (let i = 0; i < this.avatarList.length; i++) {
            this.avatarList[i].classList.add('d-none')
        }

        this.avatarList[this.id - 1].classList.remove('d-none')
    },
}

const formData = (form) => ({
    name: form.name.value,
    // rating: form.rating.value,
    comment: form.comment.value,
    imgId: imgId.id
})

feedbackForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    // Проверка полей
    const data = formData(feedbackForm)

    if (validation(data)) {
        errShow(errorValidation)
        return
    }
    errHide(errorValidation)

    // Загрузка
    // spinner.load()


    const response = await fetch("http://localhost:8000/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json())


    console.log('LOOOG', data)

    // Очистка формы
    clearForm(feedbackForm)

    //Добавление нового feedback'а
    commentContainer.appendChild(feedbackHTML(response))

    // spinner.loaded()

    // Добавление скролла
    scroll()
})

const getAllFeedbacks = async () => {
    // spinner.load()

    const response = await fetch("http://localhost:8000/api/").then(res => res.json())
    response.forEach(feedback => commentContainer.appendChild(feedbackHTML(feedback)))

    // spinner.loaded()

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
                        <img src="./public/feedback/avatarmini-${feedbackItem.img}.png" alt="avatarmini">
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

function scroll() {
    let h = window.innerHeight - 335
    commentContainer.style.height = h + 'px'

    let containerHeight = commentContainer.scrollHeight
    commentContainer.scrollTo(0, containerHeight)
}

function validation(data) {
    const arr = []

    for (let i in data) {
        arr.push(data[i])
    }


    for (let i of arr) {
        if (i === '') {
            return true
        }
    }
}

function errShow(err) {
    err.classList.remove('d-none')
}

function errHide(err) {
    err.classList.add('d-none')
}


arrowUp.addEventListener('click', (event) => {
    imgId.imgShow(imgId.id += 1)
})

arrowDown.addEventListener('click', (event) => {
    imgId.imgShow(imgId.id -= 1)
})

getAllFeedbacks()
imgId.imgShow(1)



