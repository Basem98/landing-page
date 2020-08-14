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


/**
 * The list of the anchor elements that navigate to different sections
 */

const listOfItems = document.getElementById('navbar__list');

/**
 * Keep track of the currently-running timer to destroy it before setting a new one
 */

let timeoutID;


/**
 * End Global Variables
 * Start Helper Functions
 *
*/


/**
 * @description Show the navigation bar,
 * then set a timer that hides it after 3 seconds, if not destroyed
 * @returns {number} timeoutID The ID that'll be used to destroy the timer
 */

function toggleNavBar() {
    const pageHeader = document.querySelector('.page__header');
    pageHeader.style.display = 'block';

    const timeoutID = setTimeout(() => {
        pageHeader.style.display = 'none';
    }, 3000);
    return timeoutID;
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/


/**
 * @description Build the navigation bar dynamically based on the number of sections in the document
 */

function buildNavBar() {
    const sections = document.querySelectorAll('section');
    const docFragment = document.createDocumentFragment();
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

/**
 * @description Add class 'active' to the topmost section in the viewport
 */

function activateSection() {
    clearTimeout(timeoutID);
    timeoutID = toggleNavBar();
    const firstSection = document.getElementById('section1');
    const activeSection = document.querySelector('.your-active-class');
    const associatedLink = document.querySelector(`a[href='#${activeSection.id}']`);

    /**
     *  The section's size and position relative to the user's viewport
     */
    const boundingClientRect = activeSection.getBoundingClientRect();

    if (firstSection.getBoundingClientRect().top < 0) {
        /**
         * Start changing the current active section,
         * only when the user has already reached the first section
         * (scrolled past the first section's Y axis, i. e. top property)
         */
        if (boundingClientRect.top < 0 && boundingClientRect.bottom < 70
            && activeSection.nextElementSibling) {
            activeSection.classList.remove('your-active-class');
            activeSection.nextElementSibling.classList.add('your-active-class');
            associatedLink.classList.remove('menu__link__active');
            associatedLink.parentElement.nextElementSibling.firstChild.classList.add('menu__link__active');
        }
        if (boundingClientRect.top > 70 && boundingClientRect.bottom > 0
            && activeSection.previousElementSibling) {
            activeSection.classList.remove('your-active-class');
            activeSection.previousElementSibling.classList.add('your-active-class');
            associatedLink.classList.remove('menu__link__active');
            associatedLink.parentElement.previousElementSibling.firstChild.classList.add('menu__link__active');
        }
    } else {
        /**
         * Make sure that the first element is still active, if the user is at the top
         */
        document.getElementById('section1').classList.toggle('your-active-class', true);
        document.querySelector('[href=\'#section1\'').classList.toggle('menu__link__active', true);
    }
}

/**
 * @description Scroll to the section associated with the clicked anchor element,
 * then activate that anchor
 * @param {Event} event An event object that's based on the main Event interface,
 * and has properties specific to the dispatched event
 */
function scrollToSection(event) {
    event.preventDefault();
    const selectedSectionId = event.target.getAttribute('href')?.slice(1);
    const selectedSection = document.getElementById(selectedSectionId);
    if (selectedSection) {
        document.querySelector('.menu__link__active')?.classList.remove('menu__link__active');
        event.target.classList.add('menu__link__active');
        const sectionBoundigClientRect = selectedSection.getBoundingClientRect();
        const scrollingOptions = {
            top: window.scrollY + sectionBoundigClientRect.top,
            behavior: 'smooth'
        };
        window.scrollTo(scrollingOptions);
    }
}


/**
 * End Main Functions
 * Begin Events
 *
*/


/**
 * When the DOM is ready to be interacted with, start building the navigation bar
 */

document.addEventListener('DOMContentLoaded', buildNavBar);

/**
 * Show the navigation bar on load,
 * then hide it after 3 seconds, if no scrolling event is fired
 */

document.addEventListener('DOMContentLoaded', () => {
    timeoutID = toggleNavBar();
});

/**
 * When the DOM first loads, activate the section in the viewport after loading
 */

document.addEventListener('DOMContentLoaded', activateSection);

/**
 * On scrolling, change the active section based on what is the topmost section in the viewport
 */

document.addEventListener('scroll', activateSection);

/**
 * On clicking any anchor element in the nav__list, scroll to the selected section,
 * instead of the default anchor behavior
 */

listOfItems.addEventListener('click', scrollToSection);

