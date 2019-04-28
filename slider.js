const NATIVE_SLIDER = (imgUrlArray, parentQuerySelector) => {

    // part one , create our slider template 
    const parentOfSlider = document.querySelector(`${parentQuerySelector}`);
    var sliderImagesTemplate = ``;
    var sliderButtonsTemplate = ``;
    var sliderTemplate = ``;
    
    imgUrlArray.forEach((imgUrl, index) => {
        sliderImagesTemplate += `
        <div class="slider-img" id='slider-${index + 1}'>
            <img src="${imgUrl}"/>
        </div>
        `;

        sliderButtonsTemplate += `
        <button id='button-${index + 1}'>${index + 1}</button>
        `;
    })

    sliderTemplate = `
    <div class="slider">
        <div class="slider-images">
            ${sliderImagesTemplate}
        </div>
        <div class="slider-buttons">
            <button class="next" id='next'>Next</button>
            ${sliderButtonsTemplate}
            <button class="prev" id='prev'>Prev</button>
        </div>
    </div>
    `;


    // slider template into your parent element
    parentOfSlider.innerHTML = sliderTemplate;

    //////////////// part 2 , actions of slider  ///////////////////
    const sliderButtons = document.querySelectorAll('.slider-buttons button');
    const sliderImages = document.querySelectorAll('.slider-img');

    sliderButtons.forEach((sliderBtn) => {
        sliderBtn.addEventListener('click', () => {
            var getActiveImg = document.querySelector('.selected-slider-img');
            var getId = sliderBtn.id;
            // if id is next
            if (getId === 'next') 
            {
                var getIdOfActiveImg = parseInt(getActiveImg.id.split('-')[1]);
                var getNextImgElement = document.querySelector(`#slider-${getIdOfActiveImg + 1}`);

                // check if element exist
                if(getNextImgElement !== null) {
                    getActiveImg.classList.remove('selected-slider-img');
                    getNextImgElement.classList.add('selected-slider-img');
                    activeCurrentButton(getIdOfActiveImg + 1);
                    notifications(' ');
                } else {
                    // active first one 
                    var getTheFirstElement = document.querySelector('#slider-1');
                    getActiveImg.classList.remove('selected-slider-img');
                    getTheFirstElement.classList.add('selected-slider-img');
                    activeCurrentButton(1);
                    notifications(', note : you click next button on the last one so you are here');
                }
                
            // if id is prev    
            } else if (getId === 'prev') 
            {
                var getIdOfActiveImg = parseInt(getActiveImg.id.split('-')[1]);
                var getNextImgElement = document.querySelector(`#slider-${getIdOfActiveImg - 1}`);

                 // check if element exist
                 if(getNextImgElement !== null) {
                    getActiveImg.classList.remove('selected-slider-img');
                    getNextImgElement.classList.add('selected-slider-img');
                    activeCurrentButton(getIdOfActiveImg - 1);
                    notifications(' ');
                } else {
                    // active first one 
                    var getTheFirstElement = document.querySelector(`#slider-${imgUrlArray.length}`);
                    getActiveImg.classList.remove('selected-slider-img');
                    getTheFirstElement.classList.add('selected-slider-img');
                    activeCurrentButton(imgUrlArray.length);
                    notifications(', note : you click prev button on the first one so you are here');
                }

            // if id is number    
            } else 
            {
                getId = parseInt(getId.split('-')[1]);
                var getIdOfActiveImg = parseInt(getActiveImg.id.split('-')[1]);
                var getChoosedIdImg = document.querySelector(`#slider-${getId}`);
                getActiveImg.classList.remove('selected-slider-img');
                getChoosedIdImg.classList.add('selected-slider-img');
                activeCurrentButton(getId);
                notifications(' ');
            }
        })
    })
    


    const activeCurrentButton = (currentImgId) => {
        var getButton = document.querySelector(`#button-${currentImgId}`);
        sliderButtons.forEach((btn) => {
            btn.classList.remove('selected-button');
        })
        getButton.classList.add('selected-button');
    }

     // first image , to active it 
     const firstSliderImg = document.querySelector('.slider-img');
     // active first one
     firstSliderImg.classList.add('selected-slider-img');
     // active first button 
     activeCurrentButton(1);

}

NATIVE_SLIDER(['img/5f41b254996991c4ee41a0ae0e8b9a45.jpg', 'img/I0ZRNt.jpg', 'img/photo-1431512284068-4c4002298068.jpg', 'img/photo-1431794062232-2a99a5431c6c.jpg', 'img/photo-1500993855538-c6a99f437aa7.jpg', 'img/photo-1502082553048-f009c37129b9.jpg'], '.parent');



// YOU CAN REMOVE THIS PART 
const notifications = (causeText) => {
    var nav = document.querySelector('nav');

    if(causeText != ' ') {
        nav.style.background = `#e74c3c`;
    } else {
        nav.style.background = `#2ecc71`;
    }

    var getSelectedImg = document.querySelector('.selected-slider-img').id.split('-')[1];
    nav.innerHTML = `Photo number ${getSelectedImg} is activated ${causeText}`;
}
