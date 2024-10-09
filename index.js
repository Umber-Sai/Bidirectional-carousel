
function carousel(pictures) {
    const motherElement = document.getElementById('carousel')
    const hFrame = document.createElement('div') //horizontal frame
    const filterElement = document.createElement('div');
    const closeElement = document.createElement('close');

    const minimalScreenWidth = 400 //ниже этой ширины экрана карусель не будет открываться, но останется скролл до картики
    let isMoove = false;
    let startX 
    let currentX 
    let startY
    let currentY
    let currentSlide = 0;
    let slides = []
    let hImges =[]

    init();

    closeElement.addEventListener('click', (event) => {
        event.stopPropagation()
        closeCarusel()
    })

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

    // hFrame.ontouchmove = (event) => {
    //     if(!isMoove) {
    //         startX = event.targetTouches[0].clientX;
    //         startY = event.targetTouches[0].clientY;
    //     };
    //     isMoove = true;
    //     currentX = event.targetTouches[0].clientX;
    //     currentY = event.targetTouches[0].clientY;
    //     hFrame.classList.add('noTransition');
    //     hFrame.style.left = `calc(-100vw * ${currentSlide} + ${currentX - startX}px)`;
    // }

    // hFrame.ontouchend = (event) => {
    //     isMoove = false
    //     hFrame.classList.remove('noTransition');
    //     const offsetX = currentX - startX;
    //     const offsetY = currentY - startY;

    //     if(offsetX > window.screen.width/10) {prevSlide()}
    //     else if(offsetX < - window.screen.width/10) {nextSlide()}
    //     else {
    //         if(Math.abs(offsetY) > 100) {closeCarousel()}
    //         hFrame.style.left = `calc(-100vw * ${currentSlide})`;
    //     }
    // }














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
            // hSlideImg.style.maxWidth = motherElement.getBoundingClientRect().width + 'px'
            hImges.push(hSlideImg)
            hSlide.appendChild(hSlideImg);
            hFrame.append(hSlide)
        }
    }

    function openCarousel() {
        
        this.scrollIntoView({ behavior: 'smooth', block: 'center'});
        if(window.screen.width < minimalScreenWidth) return;

        currentSlide = slides.indexOf(this);
        const hImageElement = hImges[currentSlide];

        const instruction = [
            () => {
                hImageElement.style.width = this.getBoundingClientRect().width + 'px'
                hFrame.style.display = 'flex';
                hImageElement.style.transition = 'none'
                hFrame.style.left = `calc(-100vw * ${currentSlide})`;
                hImageElement.style.top = `calc(${this.getBoundingClientRect().height/2}px + ${this.getBoundingClientRect().top}px)`;
                hImageElement.style.transform = 'translate(-50%, -50%) scale(100%)'
                hFrame.style.opacity = '100%';
                filterElement.style.display = 'block';
            },
            () => {
                filterElement.style.opacity = '80%'
                hImageElement.style.transition = 'all .5s';
                hImageElement.style.top = '50%'
                hImageElement.style.transform = 'translate(-50%, -50%) scale(80%)'
                hFrame.style.transition = 'all .7s';
            }
        ]

        instruction[0]();
        setTimeout(() => {
            instruction[1]();
        }, 10)
    }


    function closeCarusel() {
        const hImageElement = hImges[currentSlide];
        const SlideElement = slides[currentSlide];

        const instruction = [
            () => {
                hImageElement.style.transition = 'all .5s';
                hImageElement.style.top = `calc(${SlideElement.getBoundingClientRect().height/2}px + ${SlideElement.getBoundingClientRect().top}px)`;
                hImageElement.style.transform = 'translate(-50%, -50%) scale(100%)'
                hFrame.style.opacity = '0%'
                filterElement.style.opacity = '0%'
            },
            () => {
                hImageElement.style.transform = 'translate(-50%, -50%) scale(80%)'
                filterElement.style.display = 'none';
                hImageElement.style.top = '50%'
                hFrame.style.display = 'none';
                hFrame.style.transition = 'none';
            }
        ]

        instruction[0]()
        setTimeout(() => {
            instruction[1]()
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



