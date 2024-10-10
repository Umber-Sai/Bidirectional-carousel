
function carousel(pictures) {
    const motherElement = document.getElementById('carousel')
    const hFrame = document.createElement('div') //horizontal frame
    const closeElement = document.createElement('close');

    const minimalScreenWidth = 400 //ниже этой ширины экрана карусель не будет открываться, но останется скролл до картики
    let isMoove = false;
    let startX 
    let currentX 
    let startY
    let currentY
    let currentSlide = 5;
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
            hFrame.onclick = () => {
                nextSlide()
            }
        } else {
            hFrame.classList.remove('right');
            hFrame.classList.add('left');
            hFrame.onclick = () => {
                prevSlide()
            }
        }
    }

    // hFrame.ontouchstart = (event) => {
        
    //     startX = event.targetTouches[0].clientX;
    //     startY = event.targetTouches[0].clientY;
    //     currentX = event.targetTouches[0].clientX;
    //     currentY = event.targetTouches[0].clientY;

    //     hFrame.ontouchmove = (event) => {
    //         isMoove = true;
    //         hFrame.style.transition = 'none'
    //         currentX = event.targetTouches[0].clientX;
    //         currentY = event.targetTouches[0].clientY;
    //         hFrame.style.left = `calc(-100vw * ${currentSlide} + ${currentX - startX}px)`;
    //     }
    // }

    

    // hFrame.ontouchend = (event) => {
    //     isMoove = false;
    //     hFrame.style.transition = 'all .5s';
    
    //     const offsetX = currentX - startX;
    //     const offsetY = currentY - startY;
    
    //     // Проверка для прокрутки по горизонтали
    //     if (Math.abs(offsetX) > window.screen.width / 10) {
    //         const direction = Math.sign(offsetX);
    //         if (direction === 1) { // свайп вправо
    //             prevSlide();
    //         } else if (direction === -1) { // свайп влево
    //             nextSlide();
    //         }
    //     } else {
    //         // Если свайп недостаточно велик
    //         hFrame.style.left = `calc(-100vw * ${currentSlide})`;
    //     }
    
    //     // Проверка для закрытия карусели при вертикальном движении
    //     if (Math.abs(offsetY) > 100) {
    //         closeCarusel();
    //     }
    // };





    








    //functions
    function init () {
        hFrame.className = 'hFrame'
        closeElement.className = 'carousel-close'
        closeElement.innerText = '✕' //тут можешь поменять значок закрытия
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
        if(window.screen.width < minimalScreenWidth) return;

        currentSlide = slides.indexOf(this);
        const hImageElement = hImges[currentSlide];

        const instruction = [
            () => {
                hFrame.style.display = 'flex';
                hFrame.scrollTo({left: currentSlide * window.innerWidth});
                hImageElement.style.maxWidth = this.getBoundingClientRect().width + 'px'
                hImageElement.style.transition = 'none'
                hImageElement.style.top = `calc(${this.getBoundingClientRect().height/2}px + ${this.getBoundingClientRect().top}px)`;
                hImageElement.style.transform = 'translate(-50%, -50%) scale(100%)'
            },
            () => {
                hFrame.style.opacity = '100%';
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
            },
            () => {
                hImageElement.style.transform = 'translate(-50%, -50%) scale(80%)'
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
        if(currentSlide + 1 < slides.length) {
            currentSlide ++
            updateCarousel();
        } else {

        }
    }

    function prevSlide() {
        if(currentSlide - 1 >= 0) {
            currentSlide --
            updateCarousel();
        } else {

        }
    }

    function updateCarousel () {
        hFrame.scrollTo({
            left: currentSlide * window.innerWidth,
            behavior: 'smooth'
        });
    }
}


const pictures = [
    '001.jpg',
    '002.jpg',
    '004.jpg',
    '003.jpg',
]

carousel(pictures);



