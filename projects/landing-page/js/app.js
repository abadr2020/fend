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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections;
let navDocFragment;
let navBarList;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isSectionIsVisible(element){
    let boundingRect = element.getBoundingClientRect();
    let visible = boundingRect.bottom > 0 && boundingRect.top < window.innerHeight && boundingRect.top >= -1;
    return visible;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/



document.addEventListener('DOMContentLoaded', function(){
    // build the nav
    buildNavMenu();

    // Add class 'active' to section when near top of viewport
    document.addEventListener('scroll', setActiveSection);

    // Scroll to anchor ID using scrollTO event
    navBarList.addEventListener('click', scrollToSection, false);
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function buildNavMenu(){
    // get HTMLCollection of all elements with section Tag Name
sections = document.querySelectorAll('section');
// create new Fragment
navDocFragment = document.createDocumentFragment();
// get ul of navbar list
navBarList = document.querySelector('#navbar__list');
// iterate over the HTMLCollection
sections.forEach(function(section){
    // create list item
    let li = document.createElement('li');
    // create anchor
    let a = document.createElement('a');
    // populate its HTML content with the value of the data-nav attribute
    a.innerHTML = section.dataset.nav;
    // add class to anchor
    a.classList.add('menu__link');
    //add href to anchor
    a.setAttribute('href', '#'+section.id);
    // set data-nav of anchor to section Id
    a.setAttribute('data-nav',section.id);
    // a.setAttribute('data-order', i);
    //append anchor to li
    li.appendChild(a);
    // append the list item to the navDocFragment
    navDocFragment.appendChild(li);
});
// append Fragment to nav bar list
navBarList.appendChild(navDocFragment);
}

// Scroll to section on link click
function scrollToSection(e){
    // check if click is done on the anchor itself 
    if (e.target && e.target.nodeName.toLowerCase() == 'a'){
        // prevent default behavior of clicking the anchor (navigate)
        e.preventDefault();
        // get section
        let section = document.querySelector('#'+e.target.dataset.nav);
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth',
          })

    }
}
// Set sections as active
function setActiveSection(){
    sections.forEach(function(section){
        if(isSectionIsVisible(section)){
            section.classList.add('your-active-class');
         }else{
            section.classList.remove('your-active-class');
        }
    });
}

