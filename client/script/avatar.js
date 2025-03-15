const avatar = document.querySelectorAll('.avatar')

const arrowUp = document.getElementById('arrow-up')
const arrowDown = document.getElementById('arrow-down')


let indexValue = 1;

function showImg(index) {

    if (index < 1) {
        indexValue = avatar.length;
    }

    if (index > avatar.length) {
        indexValue = 1;
    }

    for (let i = 0; i < avatar.length; i++) {
        avatar[i].classList.add('d-none')
    }

    avatar[indexValue - 1].classList.remove('d-none')

    return indexValue;
}

arrowUp.addEventListener('click', (event) => {
    showImg(indexValue += 1)
})

arrowDown.addEventListener('click', (event) => {
    showImg(indexValue -= 1)
})

showImg(indexValue)


