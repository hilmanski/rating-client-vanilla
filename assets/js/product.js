
//Get Key/Id from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const key = urlParams.get('key')

//========================
//Display Stars SVG
//========================
const stars_svg = drawStarsSVG()
$('#ratingstar-current').innerHTML = stars_svg
$('#ratingstar-submission').innerHTML = stars_svg

//========================
//Load product by Key
//========================
fetch(`${baseURL}/products/${key}`)
    .then(response => response.json())
    .then(function (data) {
        //Display Product Data
        $('h1')[0].innerText = data.title
        $('h2')[0].innerText = data.body

        //Display reviews
        const reviews = data.reviews

        if(reviews.length == 0) {
            $('#current-rating-nr').innerText = 'no reviews yet'
            return
        }

        let total_star_count = 0
        reviews.forEach(function (review, index) {
            total_star_count += parseInt(review.star_count)

            const stars_svg = drawStarsSVG()
            let contentEl = `
                            <p>${stars_svg} - <b>${review.star_count}</b> <i> ${review.review}</i> </p>
                        `
            $('#reviews').insertAdjacentHTML('beforeend', contentEl)

            const el = $('#reviews').querySelectorAll('p')[index].querySelectorAll('path')
            highlightRatingStar(el, review.star_count)
        });

        //Update current total rating
        const total = total_star_count / reviews.length
        const el = $('#ratingstar-current').querySelectorAll('path')
        highlightRatingStar(el, Math.ceil(total))
        $('#current-rating-nr').innerText = total.toFixed(2)
    })
    .catch(err => console.log(err))


//========================
//Draw 5 stars
//========================
function drawStarsSVG() {
    let stars = ''
    for (let i = 0; i < 5; i++) {
        stars += ` <svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.5 0L20.9664 7.71885L30.2414 10.3647L24.3448 17.7812L24.6107 27.1353L15.5 24L6.38933 27.1353L6.65517 17.7812L0.758624 10.3647L10.0336 7.71885L15.5 0Z"
                    fill="#C4C4C4" />
            </svg>`
    }

    return stars
}

//=====================================
//Highlight (change color) of the star
//====================================
function highlightRatingStar(el, total) {
    for (let i = 0; i < total; i++) {
        el[i].style.fill = '#FDCE6E'
    }
}

//================================================
//Hover effect on rating star submission
//================================================
let rating_nr = 1
const ratingstar_submission = $('#ratingstar-submission').querySelectorAll('path')
ratingstar_submission.forEach((item, index) => {
    item.addEventListener('mouseenter', function () {
        rating_nr = index + 1
        for (let i = 0; i < 5; i++) {
            if (i < index + 1) {
                ratingstar_submission[i].style.fill = '#FDCE6E'
            } else {
                ratingstar_submission[i].style.fill = '#C4C4C4'
            }
        }
    })
})

//================================================
//On Submit Review
//================================================
function submitReview() {
    const newReview = {
        'star_count': rating_nr,
        'review': $('#review_textarea').value
    }

    fetch(`${baseURL}/reviews/${key}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview),
    })
        .then(response => response.json())
        .then(function (data) {
            console.log(data)
            location.reload()
            //TODO:
            //Add new reviews
            //Update Total Stars
            //Immediate feedback
        })
        .catch(err => console.log(err))
}

//========================
//Modal Toggle
//========================
$('#modal-root').addEventListener('click', rootClick);
$('.modal')[0].addEventListener('click', modalClick);

function rootClick() {
    $('#modal-root').classList.remove('visible');
}

function openModal() {
    $('#modal-root').classList.add('visible');
}

function modalClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
}
