/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

// The container for all the sections in index.html

/**
 * End Global Variables
 * Start Helper Functions
 *
*/


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNavBar() {
    const sections = document.querySelectorAll('section');
    const docFragment = document.createDocumentFragment();
    const listOfItems = document.getElementById('navbar__list');
    sections.forEach((section) => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.setAttribute('class', 'menu__link');
        anchor.setAttribute('href', `#${section.id}`);
        anchor.textContent = section.dataset.nav;
        listItem.appendChild(anchor);
        docFragment.appendChild(listItem);
    });
    listOfItems.appendChild(docFragment);
}

// Add class 'active' to section when near top of viewport
// STOPPED HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function getCurrentElement() {
    const currentSelectedSection = document.querySelector('.your-active-class');
    const boundingClientRect = currentSelectedSection.getBoundingClientRect();
    if (window.scrollY > 1000) {
        if (boundingClientRect.top < 0 && boundingClientRect.bottom < 50 && currentSelectedSection.nextElementSibling) {
            currentSelectedSection.classList.remove('your-active-class');
            currentSelectedSection.nextElementSibling.classList.add('your-active-class');
        }
        if (boundingClientRect.top > 50 && boundingClientRect.bottom > 0 && currentSelectedSection.previousElementSibling) {
            currentSelectedSection.classList.remove('your-active-class');
            currentSelectedSection.previousElementSibling.classList.add('your-active-class');
        }
    }
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

document.addEventListener('DOMContentLoaded', buildNavBar);
document.addEventListener('scroll', getCurrentElement);
// Build menu

// Scroll to section on link click

// Set sections as active


