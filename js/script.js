const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
/* quaryselectorAll() used to select all the class elements and store it into counters variable as an array */
const counters = document.querySelectorAll('.counter')
    // creating a flag to control the data-target(3,7,4) when we scroll up and down. we are using let type because it can be changed and reassinged it
let scrollStarted = false;

btn.addEventListener('click', navToggle);
//when we scroll the page this event listener will start to react 
document.addEventListener('scroll', scrollPage);

function scrollPage() {
    const scrollPosition = window.scrollY;
    //console.log(scrollPosition);
    if (scrollPosition > 100 && !scrollStarted) {
        countUp();
        scrollStarted = true; //set it to true
    } else if (scrollPosition < 100 && scrollStarted) {
        reset();
        scrollStarted = false; //set it to false
    }
}

function navToggle() {
    btn.classList.toggle('open');
    overlay.classList.toggle('overlay-show');
    document.body.classList.toggle('stop-scrolling');
    menu.classList.toggle('show-menu');
}

function countUp() {
    counters.forEach((counter) => {
        // console.log(counter);
        counter.innerText = '0';
        //arrow function called updateCounter has been used to get the data-target numbers by calling getAttribute and set the counter
        const updateCounter = () => {
            //Get count target
            const target = +counter.getAttribute('data-target');
            // console.log(target);
            // Get current counter value
            const c = +counter.innerText;

            //Create an increment
            const increment = target / 100;

            //If counter is less than target add increment
            if (c < target) {
                //Round up and set the counter value
                counter.innerText = `${Math.ceil(c + increment)}`;
                //every 75ms updateCounter will be called recursively in setTimeout function untill c < target
                setTimeout(updateCounter, 75);
            } else {
                counter.innerText = target;
            }

        };

        updateCounter();

    });
}

//Resetting the counters to 0 when we  scroll up
function reset() {
    counters.forEach((counter) => (counter.innerHTML = '0'));
}