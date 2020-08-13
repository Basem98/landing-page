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
 * End Global Variables
 * Start Helper Functions
 *
*/


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
    const currentSelectedSection = document.querySelector('.your-active-class');
    /**
     *  The section's size and position relative to the user's viewport
     */

    const boundingClientRect = currentSelectedSection.getBoundingClientRect();
    /**
     * Start changing the current active section,
     * only when the user has already reached the first section
     * (after scrolling past approx. 900 pixels from top)
     */

    if (window.scrollY > 900) {
        if (boundingClientRect.top < 0 && boundingClientRect.bottom < 70 && currentSelectedSection.nextElementSibling) {
            currentSelectedSection.classList.remove('your-active-class');
            currentSelectedSection.nextElementSibling.classList.add('your-active-class');
        }
        if (boundingClientRect.top > 70 && boundingClientRect.bottom > 0 && currentSelectedSection.previousElementSibling) {
            currentSelectedSection.classList.remove('your-active-class');
            currentSelectedSection.previousElementSibling.classList.add('your-active-class');
        }
    } else {
        currentSelectedSection.classList.remove('your-active-class');
        document.getElementById('section1').classList.toggle('your-active-class');
    }
}

/**
 * @description Scroll to the section attached to the clicked anchor element
 * @param {Event} event An event object that's based on the main Event interface,
 * and has properties specific to the dispatched event
 */
function scrollToSection(event) {
    event.preventDefault();
    const selectedSectionId = event.target.getAttribute('href').slice(1);
    const selectedSection = document.getElementById(selectedSectionId);
    const sectionBoundigClientRect = selectedSection.getBoundingClientRect();
    const scrollingOptions = {
        top: window.scrollY + sectionBoundigClientRect.top,
        behavior: 'smooth'
    };
    window.scrollTo(scrollingOptions);
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

// Set sections as active


