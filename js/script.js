/*Cat Clicker Premium Pro project.
Based on Udacity solution to CC Premium project.*/


/* ======= Model ======= */

var model = {
    formVisible: false,  //toggle for showing or hiding admin form
    currentCat: null,  // null is an object
    cats: [
        {
            clickCount: 0,
            name: 'Tabby',
            imgSrc: 'img/cat1.jpg',
            imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568',
        },
        {
            clickCount: 0,
            name: 'Tiger',
            imgSrc: 'img/cat2.jpg',
            imgAttribution: 'https://www.flickr.com/photos/xshamx/4154543904',
            location: 2
        },
        {
            clickCount: 0,
            name: 'Scaredy',
            imgSrc: 'img/cat3.jpg',
            imgAttribution: 'https://www.flickr.com/photos/kpjas/22252709',
            location: 3
        },
        {
            clickCount: 0,
            name: 'Shadow',
            imgSrc: 'img/cat4.jpg',
            imgAttribution: 'https://www.flickr.com/photos/malfet/1413379559',
            location: 4
        },
        {
            clickCount: 0,
            name: 'Sleepy',
            imgSrc: 'img/cat5.jpg',
            imgAttribution: 'https://www.flickr.com/photos/onesharp/9648464288',
            location: 5
        }
    ]
};

/* ======= Octopus ======= */

var octopus = {

    init: function() {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
    },

    // returns currentCat
    getCurrentCat: function() {
        return model.currentCat;
    },
    // returns cats array
    getCats: function() {
        return model.cats;
    },

    // sets currentCat to the cat passed in from click event
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

// beginning of my draft code

    //updates vars with new input from form fields after save is clicked
    updateVars: function() {
        this.newName = document.getElementById('name').value;
        this.newImgSrc = document.getElementById('imgSrc').value;
        this.newClickCount = document.getElementById('clicks').value;
    },  // close update Vars

    // clears input fields after save is clicked
    resetVars: function() {
        document.getElementById('name').value = '';
        document.getElementById('imgSrc').value = '';
        document.getElementById('clicks').value = '';
        },  // close resetVar

    //assigns input values to currentCat properties after save is clicked
    addInput: function() {
        if (this.newName !== '') {  //checks to see if input field is blank
        model.currentCat.name = this.newName;
        }
        if (this.newImgSrc !== '') {
        model.currentCat.imgSrc = this.newImgSrc;
        }
        if (this.newClickCount !== '') {
        model.currentCat.clickCount = this.newClickCount;
        }
        catView.render();
        catListView.render();
    },  // close addInput

    //changes model.formVisible status to true when admin button is clicked
    showAdmin: function() {
        model.formVisible = true;
        catView.toggleVisibility()
    }, // close showAdmin

    //changes model.formVisible status to false when save or cancel buttons are clicked
    hideAdmin: function() {
        model.formVisible = false;
        catView.toggleVisibility();
    }, //close hideAdmin

    //returns model.formVisible status for use in toggle function
    visible: function() {
        return model.formVisible;

    }, // close visible()

// end of my draft code

};  // close octopus()

/* ======= View ======= */

var catView = {

// start of my draft code

    //adds functionality to buttons
        initAdmin: function() {

   //Admin button: when clicked, shows admin field
        this.adminBtn = document.getElementById('admin-btn');
        this.adminBtn.addEventListener('click', function() {
            octopus.showAdmin();  //sets model.formVisible to true
        }); // end admin button

        //Save button: when clicked, hides admin form, updates model, clears fields
        this.saveBtn = document.getElementById('save-btn');
        this.saveBtn.addEventListener('click', function() {
            octopus.updateVars()  //assigns input data to input vars
            octopus.addInput();  // swaps input vars into model.currentCat
            octopus.hideAdmin();  //sets model.formVisible to false
            octopus.resetVars()  //resets input vars
        }); // end save button

        // Cancel button: when clicked, hides admin form
        this.cancelBtn = document.getElementById('cancel-btn');
        this.cancelBtn.addEventListener('click', function() {
            octopus.resetVars();
            octopus.hideAdmin();   // sets model.formVisibilty to false
        }); // end cancel buttoon

    },  //end of initAdmin bracket

    // shows or hides form field based on model.formVisible.  Called by catView.render
    toggleVisibility: function() {
        if (!octopus.visible()) {
        $('#form-container').hide()
        }
        else {
        $('#form-container').show()
        }
    }, //close toggleVisibility

// End of my draft code

    init: function() {
        // store pointers to our DOM display elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
        catView.initAdmin();
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

    this.render();
    },   // end catView.init

    // render this view (update the DOM elements with the right values)
    render: function() {
        // update the DOM elements with values from the currentCat
        var currentCat = octopus.getCurrentCat();
        this.catImageElem.src = currentCat.imgSrc;
        this.countElem.textContent = "Clicks:  " + currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.toggleVisibility(); // shows or hides form field
    } // end catView.render
};  // end catView

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },  // end catListView.init

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                }; // close return function
            })(cat)); // close addEventListener()

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        } // end for loop
    } // end catListView.render
}; // end catListView


// make it go!
octopus.init();
