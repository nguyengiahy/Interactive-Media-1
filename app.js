const translate = document.querySelectorAll(".translate");          // Selects ALL elements with the class ".translate"
const big_title = document.querySelector(".big-title");             // Selects the FIRST element with the class ".big-title"
const header = document.querySelector("header");                    // Selects the FIRST element with the class ".header"
const shadow = document.querySelector(".shadow");                   // Selects the FIRST element with the class ".shadow"
const content = document.querySelector(".content");                 // Selects the FIRST element with the class ".content"
const section = document.querySelector("section");                  // Selects the FIRST element with the class ".section"
const image_container = document.querySelector(".imgContainer");    // Selects the FIRST element with the class ".imgContainer"
const opacity = document.querySelectorAll(".opacity");              // Selects ALL elements with the class ".opacity"
const border = document.querySelector(".border");                   // Selects the FIRST element with the class ".border"

let header_height = header.offsetHeight;                            // Gets the height of the header.
let section_height = section.offsetHeight;                          // Gets the height of the section.

window.addEventListener('scroll', () => {                           // Triggered when scrolling
    let scroll = window.pageYOffset;                                // Determines how far the page has been scrolled down in pixels.
    let sectionY = section.getBoundingClientRect();                 // Retrieves the size of the section and its position relative to the viewport.
    
    // Translate effect
    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;        // The element is shifted vertically based on the scroll position and a speed factor defined in data-speed attribute.
    });

    // Opacity effect
    opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);   // The element's opacity is modified based on the scroll position relative to the top of the section and its height.
    })

    big_title.style.opacity = - scroll / (header_height / 2) + 1;           // The opacity of big_title decreases as the user scrolls down.
    shadow.style.height = `${scroll * 0.5 + 300}px`;                        // The height of the shadow element increases as the user scrolls

    // As the user scrolls, the content goes down, and the image_container goes up.
    content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
    image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

    // The border's width is adjusted based on the scroll, with the border growing as the user scrolls.
    border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
})