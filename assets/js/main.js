const navBtn = document.querySelector('.nav-btn')
const navBox = document.querySelector('.nav-box')
const btnWrapper = document.querySelector('.btn-wrapper');
const btn = document.querySelector('.btn');
const path1 = document.querySelector('.mobile.hamburger > g > path:nth-child(1)');
const path2 = document.querySelector('.mobile.hamburger > g > path:nth-child(2)');
const path3 = document.querySelector('.mobile.hamburger > g > path:nth-child(3)');
const home = document.getElementById('home');

const navHome = document.querySelector('nav .home');
const navDest = document.querySelector("nav .destination")
const navCrew = document.querySelector("nav .crew")
const navTech = document.querySelector("nav .technology")

const contents = document.getElementById('contents');
const cagetory = document.getElementById('category');
const container = document.querySelector('#contents .container');
const contentsWrapper = document.querySelector("#contents .contents-wrapper")

const imgDest = contents.querySelector("img.dest");
const imgCrew = contents.querySelector("img.crew");
const imgTech = contents.querySelector("img.tech");


const desc = contents.querySelector("p");
const extraDiv = document.querySelector(".destination-extra-div ")

const secondTitle1 = contents.querySelector("h5 > span:first-child")
const secondTitle2 = contents.querySelector("h5 > span:last-child");

const titleH2 = contents.querySelector("h2");
const titleH3 = contents.querySelector("h3");
const titleH4 = contents.querySelector("h4");

const contentsUl = contents.querySelector("ul");
const contentsLi = contentsUl.querySelectorAll("li");

const navWrapper = document.querySelector(".nav-wrapper")

const changes = document.querySelectorAll('.change')
const pageChanges = document.querySelectorAll('.pageChanges')

let current = "home";


function renderDest() {
    let currentDest = "Moon"
    category.className = "destination"
    let h2 = contents.querySelector(".destination h2")
    const subheading1 = document.querySelector(".destination-extra-div > div:first-of-type > .subheading1")
    const subheading2 = document.querySelector(".destination-extra-div > div:last-of-type > .subheading1")
    extraDiv.style.displa = "flex";
    extraDiv.classList.remove("hidden");
    titleH2.style.display = "block";
    titleH3.style.display = "none";
    titleH4.style.display = "none";
    imgDest.style.display = "block";
    imgCrew.style.display = "none";
    imgTech.style.display = "none";

    fetch('assets/js/data.json')
        .then(response => response.json())
        .then(data => {
            const destinations = data.destinations;
            setContentsActiveClass(contentsLi[0])
            imgDest.src = destinations[0].images.webp
            desc.textContent = destinations[0].description;
            h2.textContent = destinations[0].name
            subheading1.textContent = destinations[0].distance
            subheading2.textContent = destinations[0].travel



            for (i = 0; i < destinations.length; i++) {
                contentsLi[i].textContent = destinations[i].name;
            }


            for (let i = 0; i < contentsLi.length; i++) {
                contentsLi[i].addEventListener("click", () => {
                    currentDest = destinations[i].name;
                    setContentsActiveClass(contentsLi[i]);
                    imgDest.src = destinations[i].images.webp;
                    desc.textContent = destinations[i].description;
                    h2.textContent = destinations[i].name;
                    subheading1.textContent = destinations[i].distance
                    subheading2.textContent = destinations[i].travel
                    showEffect()
                });
            }


        });
}



function renderCrew() {
    let currentCrew = "0"
    category.className = "crew";
    extraDiv.classList.add("hidden");
    titleH2.style.display = "none";
    titleH3.style.display = "block";
    titleH4.style.display = "block";
    imgDest.style.display = "none";
    imgCrew.style.display = "block";
    imgTech.style.display = "none";

    fetch('assets/js/data.json')
        .then(response => response.json())
        .then(data => {
            const crew = data.crew;
            setContentsActiveClass(contentsLi[0])
            imgCrew.src = crew[0].images.webp;
            desc.textContent = crew[0].bio;
            titleH3.textContent = crew[0].name;
            titleH4.textContent = crew[0].role;

            for (i = 0; i < crew.length; i++) {
                contentsLi[i].textContent = '';
            }


            for (let i = 0; i < contentsLi.length; i++) {
                contentsLi[i].addEventListener("click", () => {
                    currentDest = i;
                    setContentsActiveClass(contentsLi[i]);
                    imgCrew.src = crew[i].images.webp;
                    desc.textContent = crew[i].bio;
                    titleH3.textContent = crew[i].name;
                    if (current === "crew") {
                        titleH4.textContent = crew[i].role;
                    }
                    showEffect()
                });
            }
        });
}

let currentTech = "0"

function renderTech(screenWidth, current) {
    category.className = "technology"
    extraDiv.classList.add("hidden");
    titleH2.style.display = "none";
    titleH3.style.display = "block";
    titleH4.style.display = "block";
    imgDest.style.display = "none";
    imgCrew.style.display = "none";
    imgTech.style.display = "block";


    fetch('assets/js/data.json')
        .then(response => response.json())
        .then(data => {
            setContentsActiveClass(contentsLi[current])
            const tech = data.technology;
            if (screenWidth <= 990) {
                imgTech.src = tech[current].images.landscape;
            } else {
                imgTech.src = tech[current].images.portrait;
            }
            desc.textContent = tech[current].description;
            titleH3.textContent = tech[current].name;
            titleH4.textContent = "the terminology...";

            for (i = 0; i < tech.length; i++) {
                contentsLi[i].textContent = i + 1;
            }


            for (let i = 0; i < contentsLi.length - 1; i++) {
                contentsLi[i].addEventListener("click", () => {
                    currentTech = i;
                    setScreenWidth();
                    setContentsActiveClass(contentsLi[i]);
                    if (screenWidth <= 990) {
                        imgTech.src = tech[i].images.landscape;
                    } else {
                        imgTech.src = tech[i].images.portrait;
                    }
                    desc.textContent = tech[i].description;
                    titleH3.textContent = tech[i].name;
                    showEffect()
                });
            }
        });

}

function updateImageSrc() {
    let screenWidth = window.innerWidth;
    fetch('assets/js/data.json')
        .then(response => response.json())
        .then(data => {
            const tech = data.technology;
            if (screenWidth <= 990) {
                imgTech.src = tech[currentTech].images.landscape;
            } else {
                imgTech.src = tech[currentTech].images.portrait;
            }

        }
        )
}

updateImageSrc();
window.addEventListener("resize", () => {
    updateImageSrc();
    setScreenWidth();
    if (current === "technology") {
        renderTech(screenWidth, currentTech);
    }

});



function setContentsActiveClass(current) {
    contentsLi.forEach(li => {
        li.className = ''
    })

    current.classList.add('active');
}

let screenWidth = window.innerWidth;

function setScreenWidth() {
    screenWidth = window.innerWidth;
}



function changeContents() {
    setScreenWidth()
    currentTech = 0;
    if (current === "destination") {
        secondTitle1.textContent = "01";
        secondTitle2.textContent = "pick your destination";
        renderDest();
    } else if (current === "crew") {
        secondTitle1.textContent = "02";
        secondTitle2.textContent = "meet your crew";
        renderCrew();
    } else if (current === "technology") {
        secondTitle1.textContent = "03";
        secondTitle2.textContent = "space launch 101";
        renderTech(screenWidth, currentTech);
    }
}


let isClicked = false;


// nav open & close 
navBtn.addEventListener("click", () => {
    isClicked = !isClicked;
    navBtn.classList.toggle("close", isClicked);
    navBtn.classList.toggle("hamburger", !isClicked);
    navBox.classList.toggle("menu-opened", isClicked);
    navBox.classList.toggle("menu-closed", !isClicked);
    btnWrapper.style.zIndex = isClicked ? "-1" : "1";
    navWrapper.style.zIndex = isClicked ? "-1" : "1";
});



// menu close

function handleMenuClose() {
    let screenWidth = window.innerWidth;
    if (screenWidth <= 540) {
        isClicked = false;
        navBox.classList.remove("menu-opened");
        navBox.classList.add("menu-closed");
    } else {
        navBox.classList.remove("menu-closed");
        navBox.classList.add("menu-opened");
    }
}

window.addEventListener('resize', handleMenuClose);




function handleNavClose() {
    const width = window.innerWidth;
    if (width <= 540) {
        isClicked = false;
        navBox.classList.remove("menu-opened");
        navBox.classList.add("menu-closed", !isClicked)
        navBtn.classList.remove("close");
        navBtn.classList.add("hamburger");
    }
}


btn.addEventListener('click', () => {
    current = "destination"
    navEffect();
})

function removeList() {
    const ul = document.querySelector("#contents ul")
    const lis = ul.querySelectorAll("li")
    const lastLi = lis[lis.length - 1]

    if (current === "technology") {
        lastLi.style.display = "none"
    } else {
        lastLi.style.display = "block";
    }
}

function pageChange() {
    if (current === "home") {
        home.classList.remove('hidden');
        contents.classList.add('hidden');
    } else {
        home.classList.add('hidden');
        contents.classList.remove('hidden');

    }
}

function setActiveClass() {
    navHome.classList.remove("active");
    navDest.classList.remove("active");
    navCrew.classList.remove("active");
    navTech.classList.remove("active");

    if (current == "home") {
        navHome.classList.add("active");
    } else if (current == "destination") {
        navDest.classList.add("active");
    } else if (current == "crew") {
        navCrew.classList.add("active");
    } else if (current == "technology") {
        navTech.classList.add("active");
    }
}


function navEffect() {
    navWrapper.style.zIndex = "1";
    pageChange();
    removeList();
    handleNavClose();
    handleMenuClose();
    setActiveClass();
    changeContents();
    fadeIn();
}

navHome.addEventListener('click', () => {
    current = "home"
    btnWrapper.style.zIndex = "1";
    navEffect();
});


navDest.addEventListener('click', () => {
    current = "destination"
    navEffect();
})

navCrew.addEventListener('click', () => {
    current = "crew";
    navEffect();
})

navTech.addEventListener('click', () => {
    current = "technology"
    navEffect();
})


function showEffect() {
    changes.forEach(change => {
        change.style.transform = "translateY(10%)"
        change.style.opacity = "0";
        change.style.transition = "";
    })

    setTimeout(() => {
        changes.forEach(change => {
            change.style.transition = "all 2s";
            change.style.transform = "translateY(0%)"
            change.style.top = "0";
            change.style.opacity = "1";
        })
    }, 0);
}

function fadeIn() {
    pageChanges.forEach(change => {
        change.removeAttribute("style");
        change.style.opacity = "0";
        change.style.transition = "";
    })

    setTimeout(() => {
        pageChanges.forEach(change => {
            change.style.transition = "all 2s";
            change.style.opacity = "1";
        })
    }, 0);

}
