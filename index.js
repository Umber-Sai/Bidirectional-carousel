
function carousel(pictures) {
    const motherElement = document.getElementById('carousel')
    const hFrame = document.createElement('div') //horizontal frame
    const filterElement = document.createElement('div');
    const closeElement = document.createElement('close');

    const minimalScreenWidth = 550 //ниже этой ширины экрана карусель не будет открываться, но останется скролл до картики
    let isMoove = false;
    let startX 
    let currentX 
    let startY
    let currentY
    let currentSlide = 0;
    let slides = []
    let hImges =[]

    init();

    //активируем карусель по нажатию на картинку (сдайл)
    for (let i = 0; i < slides.length; i++) {
        slides[i].addEventListener('click', openCarousel);
    }

    hFrame.onmousemove = (event) => {
        if(event.clientX > window.screen.width/2) {
            hFrame.classList.remove('left');
            hFrame.classList.add('right');
            hFrame.onclick = nextSlide
        } else {
            hFrame.classList.remove('right');
            hFrame.classList.add('left');
            hFrame.onclick = prevSlide
        }
    }

    hFrame.ontouchmove = (event) => {
        if(!isMoove) {
            startX = event.targetTouches[0].clientX;
            startY = event.targetTouches[0].clientY;
        };
        isMoove = true;
        currentX = event.targetTouches[0].clientX;
        currentY = event.targetTouches[0].clientY;
        hFrame.classList.add('noTransition');
        hFrame.style.left = `calc(-100vw * ${currentSlide} + ${currentX - startX}px)`;
    }

    hFrame.ontouchend = (event) => {
        isMoove = false
        hFrame.classList.remove('noTransition');
        const offsetX = currentX - startX;
        const offsetY = currentY - startY;

        if(offsetX > window.screen.width/10) {prevSlide()}
        else if(offsetX < - window.screen.width/10) {nextSlide()}
        else {
            if(Math.abs(offsetY) > 100) {closeCarousel()}
            hFrame.style.left = `calc(-100vw * ${currentSlide})`;
        }
    }

    closeElement.addEventListener('click', (event) => {
        event.stopPropagation();
        closeCarousel()
    });










    //functions
    function init () {
        filterElement.className = 'carousel-filter'
        hFrame.className = 'hFrame'
        closeElement.className = 'carousel-close'
        closeElement.innerText = '✕' //тут можешь поменять значок закрытия
        motherElement.appendChild(filterElement);
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
            hSlide.className = 'hFrame-slide';
            const hSlideImg = document.createElement('img');
            hSlideImg.setAttribute('src',`./images/${pictures[i]}`);
            hSlideImg.classList.add('hFrame-slide-img');
            hImges.push(hSlideImg)
            hSlide.appendChild(hSlideImg);
            hFrame.append(hSlide)
        }
    }

    function openCarousel() {
        this.scrollIntoView({ behavior: 'smooth', block: 'center'});
        if(window.screen.width <= window.screen.height) return
        currentSlide = slides.indexOf(this);
        const hImageElement = hImges[currentSlide];
        
        hFrame.style.left = `calc(-100vw * ${currentSlide})`;
        hImageElement.style.top = `${this.getBoundingClientRect().top}px`;

        console.log(hImageElement.getBoundingClientRect().top)
        console.log(this.getBoundingClientRect().top)
        
        hFrame.style.display = 'flex';
        filterElement.style.display = 'flex';
        setTimeout(() => {
            filterElement.classList.add('open');
            hImageElement.style.top = (window.screen.height/2 - hImageElement.getBoundingClientRect().height/2) + 'px';
            hFrame.classList.add('open');
        }, 0)
    }

    function closeCarousel(event) {
        // hFrame.style.top = `${slides[currentSlide].getBoundingClientRect().top}px`;
        const hImageElement = hImges[currentSlide];
        hImageElement.style.top = `${slides[currentSlide].getBoundingClientRect().top}px`;
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
            document.getElementById('slide' + currentSlide).scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            document.getElementById('slide' + currentSlide).scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    '004.jpg',
    '003.jpg',
]

carousel(pictures);



