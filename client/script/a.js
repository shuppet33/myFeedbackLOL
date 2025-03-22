// const starsContainer = document.getElementById('rating')
// const stars = document.querySelectorAll('.star')

// console.log(stars)
// console.log(starsContainer)

// stars.forEach(star => star.addEventListener('mouseover', (event) => {
//    for (let i = 0; i <= stars.length; i++) {
//       star[i].src = './public/form/star__active.png';
//    }
// }))

// stars.forEach(star => star.addEventListener('mouseout', (event) => {
//    star.src = './public/form/star__not-active.png';
// }))



const ratingContainer = document.getElementById('rating');
const stars = Array.from(document.querySelectorAll('.star'));
let starId;

stars.forEach((star, index) => {
      star.addEventListener('mouseover', () => {
         stars.slice(0, index + 1).forEach(s => {
            s.src = './public/form/star__active.png'
         });

         star.addEventListener('click', (event) => {
            star.dataset.starId = index + 1
            console.log(event.target.dataset.starId)
         })
      });

      star.addEventListener('mouseout', () => {
         stars.forEach(s => s.src = './public/form/star__not-active.png');
      });
});


const starObj = {
   starId: 0,
   starState: false,
}