//load categories function
//load categories
//toggle loader
const loadCategories = async () => {
    toggleLoader(true);
    //fetch url
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    //fetch response
    const res = await fetch(url);
    //fetch data
    const data = await res.json();
    //display categories
    displayCategories(data.data.news_category);
    try {
        nonExistentFunction();
    } catch (error) {
        console.error(error);
    }

}
//display categories
//display categories
const displayCategories = categories => {
    //get catagories
    const catagories = document.getElementById("catagories");
    //loop through catagories
    categories.forEach(catagori => {
        //create catagori li
        const catagoriLi = document.createElement('a');
        //add class
        catagoriLi.classList.add('nav-item');
        //add inner html
        catagoriLi.innerHTML = `
        <a class="nav-link" href="#" onclick="displayId(${catagori.category_id})">${catagori.category_name}</a>
        `
        //append child
        catagories.appendChild(catagoriLi);
    })
}

//display id
const displayId = async (id) => {
    toggleLoader(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    const res = await fetch(url);
    const data = await res.json();
    categoriesItem(data.data);
    const h = document.getElementById('hf');
    h.innerText = data.data.length;

}

//display items
const categoriesItem = item => {
    const items = document.getElementById('new-container');
    items.innerHTML = '';
    const arr = [];
    const result = item.sort((a, b) => (b.total_view - a.total_view));

    result.forEach(newsCard => {
        // let array = newsCard.total_view === null ? '0' : newsCard.total_view;
        let array = arr.push(newsCard.total_view);


        const catagoriCard = document.createElement('div');
        catagoriCard.classList.add('row')
        catagoriCard.innerHTML = `
        <div class="card mb-3 p-4">
        <div class="row g-0">
        <div class="col-md-4">
        <img src="${newsCard.image_url}" class="img-fluid rounded" alt="..."></div>
        <div class="col-md-8">
        <div class="px-4 card-body d-flex flex-column">
        <h5 class="card-title fw-bold fs-3 pt-2" data-bs-toggle="modal" data-bs-target="#exampleModal_${newsCard._id}">${newsCard.title}</h5>
        <p class="card-text">
        ${newsCard.details.slice(0, 450)}<a href=""  class="read-more text-danger  " data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Read More</a>
        </p>
        <div class="d-flex justify-content-between mt-3 md-flex-column mobile-view">
        <div class="d-flex"><div>
        <img class="author-profile-img" src="${newsCard.author.img}" alt="" srcset=""></div>
        <div class="px-2">
        <p class="author-name">${newsCard.author.name === null ? "No Author" : newsCard.author.name}</p>
        <p class="publish-date">${newsCard.author.published_date === null ? "No Date" : newsCard.author.published_date}</p>
        </div>
        </div>
        <div class="d-flex mt-1"><div>
        <i class="fa-regular fa-eye"></i></div><div>
        <p class="fw-bold">&nbsp${newsCard.total_view === null ? "No " : newsCard.total_view} Views</p></div>
        </div>
        <div class="d-flex mt-1"><div>
        <i class="fa-solid fa-star"></i></div><div>
        <p class="fw-bold">&nbsp${newsCard.rating.number} Rating</p></div>
        </div>
        <div class="mt-1 blog-click-icon">
        <a href="" class="read-more btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal_${newsCard._id}">Read More <i class="fa-solid fa-arrow-right-long"></i></a>
         </div>
        </div>
        </div>
        </div>
        </div>
        </div>


    <!-- Modal -->


    <div class="modal fade" id="exampleModal_${newsCard._id}" tabindex="-1" aria-labelledby="exampleModalLabel_${newsCard._id}"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel_${newsCard._id}">
    Badge:  ${newsCard.rating.badge}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal"aria-label="Close"></button>
    </div>
    <div class="modal-body">

    <img src="${newsCard.image_url}" class="img-fluid" alt="...">


    <div class="container text-center">
    <div class="row g-2 my-3">
    <div class="col-6">
    <div class="p-3 custom-bg rounded">${newsCard.author.published_date}</div>
    </div>
    <div class="col-6">
    <div class="p-3 custom-bg rounded">${newsCard.rating.number} Rating</div>
    </div>
    </div>
    </div>


    <h5 class="card-title fw-bold fs-3 pt-2">${newsCard.title}</h5>
    <p class="card-text">${newsCard.details}</p>
    </div>

    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    </div>
    </div>
    </div>


    <!-- Modal Close  -->

    </div>
    </div>
    `
        items.appendChild(catagoriCard);
    })

    //stop loader
    toggleLoader(false);
}


