
export const domElements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),

    resultsList: document.querySelector('.results__list'),
    resultSection: document.querySelector('.results'),
    buttonsPagination: document.querySelector('.results__pages'),

    recipe: document.querySelector('.recipe'),

    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
}


export const renderLoader = (parent) => {
    const loader = `
        <div class='loader'>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader){
        loader.parentNode.removeChild(loader);
    }
    
}