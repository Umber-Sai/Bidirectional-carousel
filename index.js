
function carousel(pictures) {
    const motherElement = document.getElementById('carousel')
    const hFrame = document.createElement('div') //horizontal frame
    const filterElement = document.createElement('div');

    const nextElement = document.createElement('div');
    const prevElement = document.createElement('div');
    const closeElement = document.createElement('close');

    let currentSlide = 0;
    let slides = []

    init();

    //активируем карусель по нажатию на картинку (сдайл)
    for (let i = 0; i < slides.length; i++) {
        slides[i].addEventListener('click', openCarousel);
    }

    nextElement.addEventListener('click', nextSlide)
    prevElement.addEventListener('click', prevSlide)
    closeElement.addEventListener('click', closeCarousel);

    function init () {
        filterElement.className = 'carousel-filter'
        hFrame.className = 'hFrame'
        nextElement.className = 'carousel-next';
        prevElement.className = 'carousel-prev';
        closeElement.className = 'carousel-close'
        closeElement.innerText = '✕' //тут можешь поменять значок закрытия
        motherElement.appendChild(filterElement);
        hFrame.appendChild(nextElement);
        hFrame.appendChild(prevElement);
        hFrame.appendChild(closeElement);
        motherElement.appendChild(hFrame);


        //создаём слайды
        for (let i = 0; i < pictures.length; i++) {
            //слайд для carousel
            const cSlide = document.createElement('img');
            cSlide.setAttribute('src', './images/' + pictures[i])
            cSlide.setAttribute('id', 'slide' + i)
            cSlide.setAttribute('alt', pictures[i])
            cSlide.className = 'slide';

            motherElement.appendChild(cSlide);
            slides.push(cSlide);


            //слайд для hFrame
            const hSlide = document.createElement('div');
            hSlide.style.backgroundImage = `url(images/${pictures[i]})`;
            hSlide.className = 'hFrame-img';

            hFrame.append(hSlide)
        }
    }

    function openCarousel() {
        this.scrollIntoView({ behavior: 'smooth'});
        currentSlide = slides.indexOf(this);
        hFrame.style.left = `calc(-100vw * ${currentSlide})`;
        hFrame.style.top = `${this.getBoundingClientRect().top}px`;
        
        hFrame.style.display = 'flex';
        filterElement.style.display = 'flex';
        setTimeout(() => {
            filterElement.classList.add('open');
            hFrame.classList.add('open');
        }, 0)
       
        console.log(hFrame.getElementsByClassName('hFrame-img'))
    }

    function closeCarousel() {
        hFrame.style.top = `${slides[currentSlide].getBoundingClientRect().top}px`;
        hFrame.classList.remove('open');
        filterElement.classList.remove('open');
        
        setTimeout(() => {
            hFrame.style.display = 'none';
            filterElement.style.display = 'none';
        }, 500)
        
    }

    function nextSlide() {
        if(currentSlide + 1 < pictures.length) {
            currentSlide ++
            document.getElementById('slide' + currentSlide).scrollIntoView({ behavior: 'smooth' });
            hFrame.style.left = `calc(-100vw * ${currentSlide})`;
        } else {
            hFrame.style.left = `calc(-100vw * ${currentSlide} - 10vw)`;
            setTimeout(() => {
                hFrame.style.left = `calc(-100vw * ${currentSlide})`;
            }, 100);
        }
    }

    function prevSlide() {
        if(currentSlide - 1 >= 0) {
            currentSlide --
            document.getElementById('slide' + currentSlide).scrollIntoView({ behavior: 'smooth' });
            hFrame.style.left = `calc(-100vw * ${currentSlide})`;
        } else {
            hFrame.style.left = "10vw";
            setTimeout(() => {
                hFrame.style.left = '0';
            }, 100);
        }
    }
}


const pictures = [
    '001.jpg',
    '002.jpg',
    '003.jpg',
    '004.jpg',
]

carousel(pictures);



