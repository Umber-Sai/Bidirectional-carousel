
function carousel(pictures) {
    const motherElement = document.getElementById('carousel')
    const hFrame = document.createElement('div') //horizontal frame
    const closeElement = document.createElement('close');

    const minimalScreenWidth = 600 //ниже этой ширины экрана карусель не будет открываться, но останется скролл до картики
    let isMoove = false;
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

    hFrame.addEventListener('scroll', (event) => {
        const newSlide =  Math.round(hFrame.scrollLeft / window.innerWidth);
        if(newSlide !== currentSlide) {
            currentSlide = newSlide;
            scrollToTarget()
        }

    })

    

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
        scrollToTarget(this)
        setTimeout(() => {
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
        console.log(isMoove)
        if(isMoove) return
        isMoove = true
        if(currentSlide + 1 < slides.length) {
            currentSlide ++
        } else {
            currentSlide = 0
        }
        updateCarousel();
    }

    function prevSlide() {
        console.log(isMoove)
        if(isMoove) return
        isMoove = true
        if(currentSlide - 1 >= 0) {
            currentSlide --
        } else {
            currentSlide = slides.length - 1;
        }
        updateCarousel();
    }

    function updateCarousel () {
        scrollToTarget()
        hFrame.scrollTo({
            left: currentSlide * window.innerWidth,
            behavior: 'smooth'
        });
    }

    function scrollToTarget(target = slides[currentSlide]) {
        const targetRect = target.getBoundingClientRect();
        window.scrollTo({
            top: window.scrollY + targetRect.top + targetRect.height / 2 - window.innerHeight /2 ,
            behavior : 'smooth'
        });

        setTimeout(() => {
            isMoove = false;
        }, 1000)
    }
}


const pictures = [
    '001.jpg',
    '004.jpg',
    '002.jpg',
    '004.jpg',
    '003.jpg',
]

carousel(pictures);



