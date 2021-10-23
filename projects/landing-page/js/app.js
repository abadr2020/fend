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
let navBarList;
const scrollToTopBtn = document.querySelector('#scrollToTop');
let timer = null;
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



document.addEventListener('DOMContentLoaded', function(){
    // Add section to page
    addSection();
    // build the nav
    buildNavMenu();
    // Add class 'active' to section when near top of viewport
    createObserver();
    // Scroll to anchor ID using scrollTO event
    navBarList = document.querySelector('#navbar__list');
    navBarList.addEventListener('click', scrollToSection, false);
    // Manage show/hide scroll to top button and navBar visibility
    document.addEventListener('scroll', function(){
        showScrollToTop();
        handleNavBarVisibility();
    });
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
});

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Add section
function addSection(){
    sections = document.querySelectorAll('section');
    main = document.querySelector('main');
    let section = document.createElement('section');
    section.setAttribute('id','section'+(sections.length + 1).toString());
    section.setAttribute('data-nav','Section '+(sections.length + 1).toString());
    let div = document.createElement('div');
    div.classList.add('landing__container');
    div.innerHTML = `        
    <h2>${section.dataset.nav}</h2>
    <p>Lorem ipsum dolor sit amet, 
    consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. 
    Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. 
    Sed convallis sollicitudin mauris ac tincidunt. 
    Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. 
    Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    `;
    section.append(div);
    main.appendChild(section);
}
// Build menu 
function buildNavMenu(){
// get nav Bar List Items
navBarList = document.querySelector('#navbar__list');
// get NodeList of all elements with section Tag Name
sections = document.querySelectorAll('section');
// create new Fragment
let navDocFragment = document.createDocumentFragment();
    sections.forEach(function(section){
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.innerHTML = section.dataset.nav;
        a.classList.add('menu__link');
        a.setAttribute('href', '#'+section.id);
        // set data-nav of anchor to section Id
        a.setAttribute('data-nav',section.id);
        a.setAttribute('id','nav_'+section.id);
        li.appendChild(a);
        navDocFragment.appendChild(li);
    });
navBarList.appendChild(navDocFragment);
}

// Scroll to section on link click
function scrollToSection(e){
    // check if click is done on the anchor itself 
    if (e.target && e.target.nodeName.toLowerCase() == 'a'){
        // prevent default behavior of clicking the anchor (navigate)
        e.preventDefault();
        // remove active class from all nav items
        document.querySelectorAll('.active-class').forEach((element) => {
            element.classList.remove('active-class');
        })
        // set active class to the clicked nav item
        document.querySelector('#'+e.target.id).classList.add('active-class');
        // get section
        let section = document.querySelector('#'+e.target.dataset.nav);
        section.scrollIntoView({behavior: 'smooth'});
    }
}
// Set sections as active
function createObserver(){
    let observer;
    // set observer options
    let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  };
  // declare observer with observer callback
  observer = new IntersectionObserver(setIntersectedToActive, options);
  // get sections
  sections = document.querySelectorAll('section');
  // observe each section
  sections.forEach(function(section){
    observer.observe(section);
  });
}
// observer callback
function setIntersectedToActive(elements){
    elements.forEach((element) => {
        if (element.isIntersecting) {
            // reomve your-active-class from all sections
            document.querySelectorAll('.your-active-class').forEach((el) => {
                    el.classList.remove('your-active-class');
            });
            // reomve active-class from all navItems
            document.querySelectorAll('.active-class').forEach((el) => {
                el.classList.remove('active-class');
            });
            // set section to target of intersection entry
            let section = element.target;
            // set your-active-class to intersecting section
            section.classList.add('your-active-class');
            // get navItem
            let navItem = document.querySelector('#nav_' + section.id);
            // set active-class to nacItem of intersecting section
            navItem.classList.add('active-class');
            }
      });
}
// show scroll to top button if scroll exceeds 50 px
function showScrollToTop(){
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        scrollToTopBtn.setAttribute('style', 'display: block');
      } else {
        scrollToTopBtn.setAttribute('style', 'display: none');
      }
}
// scroll to the top of the page if the scrollToTop btn has been clicked
function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}
// if user scrolls during the timer, the nav bar is shown, elsewise it's hidden
function handleNavBarVisibility(){    
    if(timer !== null) {
        clearTimeout(timer);
        navBarList.setAttribute('style','display:block');        
    }
    timer = setTimeout(function() {
        if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
          navBarList.setAttribute('style','display:none');
        }
    }, 5000);
}

