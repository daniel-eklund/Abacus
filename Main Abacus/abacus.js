document.addEventListener('DOMContentLoaded', function() {
// GLOBALS
    // Array holding bead objects
    var abacusArray = [];
    // Number of columns in the abacus
    //var posNumCol = prompt("Number of positive columns?", "Enter numeric value");
    //var negNumCol = prompt("Number of negative columns?", "Enter numeric value");
    var posNumCol = 5;
    var negNumCol = 0;
    
    //current col clicked by bead
    const NUMCOL = parseInt(posNumCol) + parseInt(negNumCol);
    var col;
    var value;
    var level = 0;
    var obj = 1;
    var ifDrawn = false;
    var user = "";
    var txtString = "Welcome!<br>";
    var findRandom;


function makeAbacus(numCol) {
    //make numCol columns
    //set array of bead objects
    var abacus = document.getElementById("middle");
    var innerString = "";
    for(var col = 1; col <= numCol; col++) {        
        innerString += '<div class="column" id="c' + col + '">';
        innerString += '<div class="beadContainerTop">';
        var colorStr;
        switch(col) {
            case 1: 
                colorStr = 'src="graphics/svgs/blueHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_blue.svg" alt="bead"';
                break;
            case 2:
                colorStr = 'src="graphics/svgs/greenHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_green.svg" alt="bead"';
                break;
            case 3:
                colorStr = 'src="graphics/svgs/orangeHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_orange.svg" alt="bead"';
                break;
            case 4:
                colorStr = 'src="graphics/svgs/yellowHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_yellow.svg" alt="bead"';
                break;
            case 5:
                colorStr = 'src="graphics/svgs/redHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_red.svg" alt="bead"';
                break;
            case 6:
                colorStr = 'src="graphics/svgs/purpleHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_purple.svg" alt="bead"';
                break;
            case 7: 
                colorStr = 'src="graphics/svgs/blueHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_blue.svg" alt="bead"';
                break;
            case 8:
                colorStr = 'src="graphics/svgs/greenHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_green.svg" alt="bead"';
                break;
            default:
                colorStr = 'src="graphics/svgs/beadHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead.svg" alt="bead"';
        }
        
        if(col >= (NUMCOL - negNumCol)+1) colorStr = 'src="graphics/svgs/blackHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_black.svg" alt="bead"'; 

        //colorStr = 'src="graphics/svgs/blackHover.svg" alt="beadHover" /><img class="mouse_off" src="graphics/svgs/bead_black.svg" alt="bead"';

        for(var bead = 1; bead <= 7; bead++) { 
            makeBead(col, bead);
            //if 3rd bead, set padding, if 2nd bead set zIndex
            if(bead == 3) innerString += '<a class="bead" style="padding-top: 41px;" id="c' + col + 'b' + bead + '" onclick="beadClick(this);"><img class="mouse_on"'  + colorStr + '/></a>';
            if(bead == 2) innerString += '<a class="bead" style="z-index: 1; margin-top:-23px; margin-bottom: 23px;" id="c' + col + 'b' + bead + '" onclick="beadClick(this);"><img class="mouse_on"' + colorStr + '/></a>';
            if(bead!=2 && bead!=3 && bead!=1) innerString += '<a class="bead" id="c' + col + 'b' + bead + '" onclick="beadClick(this);"><img class="mouse_on"' + colorStr + '/></a>';
            if(bead == 1) innerString += '<a class="bead" style="z-index: 1; margin-top:-23px; margin-bottom: 23px;" id="c' + col + 'b' + bead + '" onclick="beadClick(this);"><img class="mouse_on"' + colorStr + '/></a>'; 
        }
        //close divs, apply elements to innerhtml
        innerString += '</div></div>';
        abacus.innerHTML += innerString;
        innerString = "";
    }
    
}


function makeBead(col, bead) {
    //make bead object
    //column #
    //bead_num {1: top, 7:bottom}
    var state = false;
    if(bead == 1 || bead == 2) state = true;
    var newBead = {
        'name': "bead",
        'id': 'c'+col+'b'+bead,
        'colNum': col,
        'beadNum': bead,
        'state': state
        //state: true=up, false=down
    }
    abacusArray.push(newBead);
    return;
}

beadClick = function(inbead) {
    //get correct bead element
    //check clicked element id
    //get correct element loaded into elem
    //get correct array location from col#/bead#
    var idstr = inbead.id;
    var elem = document.querySelector('#' + idstr);
    //if idstr length is 5, double digit col
    if(idstr.length == 5) {
        col = idstr.substring(1,3);
        var bead = idstr.substring(4,5);
    } else {
        col = idstr.substring(1, 2);
        var bead = idstr.substring(3, 4);
    }
    var loc = parseInt(7*col-7) + parseInt(bead) - 1;

    if(abacusArray[loc].state) { //if up
        //move down
        //if bead 2 or 7 and up : move self down
        //these beads don't have beads below them
        if(bead==2 || bead==7) {
            abacusArray[loc].state = false;
            elem.style.marginTop = '0px';
            elem.style.marginBottom = '0px';
        } else { //check 1, 3-6
        //if all other bead and up
            // :check if bead below
            // :move all down till bead below
            if(abacusArray[loc+1].state == false) { //check below
                elem.style.marginTop = '0px';
                elem.style.marginBottom = '0px';
                abacusArray[loc].state = false; 
            } else {
                //bead is below is up :move self + those below
                //move stack
                if(bead==1) {
                    //move 1 & move 2
                    abacusArray[loc+1].state = false;
                    abacusArray[loc].state = false;
                    var nElem = document.querySelector('#c' + col + 'b2');
                    nElem.style.marginTop = '0px';
                    nElem.style.marginBottom = '0px';
                    elem.style.marginTop = '0px';
                    elem.style.marginBottom = '0px';
                } else {
                    //if bead > 3 find gap
                    //call recursive helper
                    var gap = bgapHelper(loc+1);
                    //correct gap for col;
                    //if(gap!=6) gap -= 7 * (col-1);
                    gap--;
                    if(gap!=6) {
                        gap -= 7*col;
                        gap += 7;
                    }
                    ///start at bead, move to gap
                    //total beads needed to move
                    //var total = (bead-1) - gap;
                    var total = gap - (bead-2);
                    var ele;
                    var bdNum;
                    //loop through and set all margins
                    for(var t = 0; t < total; t++) {
                        abacusArray[loc+t].state = false;
                        bdNum = abacusArray[loc+t].beadNum;
                        ele = document.querySelector('#c' + col + 'b' + bdNum);
                        ele.style.marginTop = '0px';
                        ele.style.marginBottom = '0px';
                    }
                    
                }
            }
        }
    } else { //if down
        //move up
        //if bead (1 or 3) and down : move self up
        //these beads don't have beads above them
        if(bead==1 || bead==3) {
            elem.style.marginTop = '-23px';
            elem.style.marginBottom = '23px';
            abacusArray[loc].state = true; 
        } 
        //if all other beads and down 
            // :check if beads above
            // :move all up till bead above
        if(bead==2 || bead > 3) {
            //bead above is moved up :move self
            if(abacusArray[loc-1].state) { //check above
                elem.style.marginTop = '-23px';
                elem.style.marginBottom = '23px';
                abacusArray[loc].state = true; 
            } else {
            //else bead above is down :move self + those above
                //move stack
                //if bead == 2:
                if(bead==2) {
                    //move 1 & move 2
                    abacusArray[loc-1].state = true;
                    abacusArray[loc].state = true;
                    var nElem = document.querySelector('#c' + col + 'b1');
                    nElem.style.marginTop = '-23px';
                    nElem.style.marginBottom = '23px';
                    elem.style.marginTop = '-23px';
                    elem.style.marginBottom = '23px';
                } else {
                    //if bead >3: find gap
                    //call recursive helper
                    var gap = tgapHelper(loc-1);
                    if(gap!=1) gap -= 7 * (col-1); //correct gap for col
                    ///start at bead, move to gap
                    //total beads needed to move
                    var total = (bead-1) - gap;
                    var ele;
                    var bdNum;
                    //loop through and set all margins
                    for(var t = 0; t < total; t++) {
                        abacusArray[loc-t].state = true;
                        bdNum = abacusArray[loc-t].beadNum;
                        ele = document.querySelector('#c' + col + 'b' + bdNum);
                        ele.style.marginTop = '-23px';
                        ele.style.marginBottom = '23px';
                    }
                }
            }
        }
    }

    // Calculate the abacus values when a bead is clicked
    //console.clear();
    //for(var i = 0; i < abacusArray.length; i++) {
    //    console.log("Bead: " + i + " : " + abacusArray[i].state);
    //}
    abacusToNumber();
    checkObj("click bead", idstr);
}

//recursive functions to find where the gap above is
tgapHelper = function(uLoc) {
    return tgapFinder(uLoc);
}
tgapFinder = function(loc) {
    if(loc == (7*col - 7 + 1)) return 1;
    if(abacusArray[loc].state == false) return tgapFinder(loc-1);
    return loc;
}

//recursive functions to find where the gap below is
bgapHelper = function(bLoc) {
    return bgapFinder(bLoc);
}
bgapFinder = function(loc) {
    if(loc == (7*col - 7 + 7)) return 7;
    if(abacusArray[loc].state == true) return bgapFinder(loc+1);
    return loc;
}


//Function Helper: Returns the negative mulitplier applied to the furthest right NEGATIVE column
function getNegativeColStartNum() {
    colBuffer = 1;
    for(var i=1; i < negNumCol; i++) {
        colBuffer *= 10;
    }
    return colBuffer;
}

//Function: Resets the abacus margins to base positions
function resetAbacus() {  
        // Reset beads 1 and 2 states to true and margins to +-23px
        for(var i = 0; i < abacusArray.length; i++) {
            if(abacusArray[i].beadNum == 1 || abacusArray[i].beadNum == 2) {
                abacusArray[i].state = true;
                document.getElementById(abacusArray[i].id).style.marginTop = "-23px";
                document.getElementById(abacusArray[i].id).style.marginBottom = "23px";
            } else {// Set each state of the beads to false and change margins to 0
                abacusArray[i].state = false;
                document.getElementById(abacusArray[i].id).style.marginTop = "0px";
                document.getElementById(abacusArray[i].id).style.marginBottom = "0px";
            }
        }
        document.getElementById("decNumBar").value = 0;
        if(level == 1) checkObj("reset");
        return;
}

function setAbacus() {
    value = document.getElementById("decNumBar").value;
    resetAbacus();
    document.getElementById("decNumBar").value = value;
    var needCol = value.length;
    //prevent overflow, set to abacus size
    if (needCol > NUMCOL) needCol = NUMCOL;
    //set value to max value place
    //i.e. 123456789 on 8 length abacus truncates to:
    //23456789

    var valArray = []; 
    //loop and find each value by 10^x place
    for(var i = 0; i < needCol; i++) {
        valArray[i] = Math.floor((value % Math.pow(10, i+1)) / Math.pow(10, i));
    }  

    //if >= 5 : set top
    //set bottom remainder

    var test;
    var elem; //string for id
    var obj; //obj
    var loc;
    var curr = (NUMCOL - negNumCol);

    for(var i = 0; i < needCol; i++) { 

        test = valArray[i];
        loc = parseInt(7*(curr)-7) + 1;

        if(test >= 5) {
            elem = "c" + ((NUMCOL - i) - (negNumCol)) + "b2";
            obj = document.getElementById(elem);
            obj.style.marginTop = '0px';
            obj.style.marginBottom = '0px';
            abacusArray[loc].state = false;

        }
        //for each bottom bead that needs to move up
        for(var c = 0; c < (test % 5); c++) {
            var offset = loc + c + 1;
            abacusArray[offset].state = true;
            elem = "c" + ((NUMCOL - i) - (negNumCol)) + "b" + (3 + c);
            obj = document.getElementById(elem);                
            obj.style.marginTop = '-23px';
            obj.style.marginBottom = '23px';
        }
        curr--;
    }
    checkObj("submit");
}

//Function: Calculate the Abacus Values to a numeric value
function abacusToNumber() {
    var inString = "";
    var selectedColTotal = 0;
    var columnValuesArray = [];
    var total = 0;
    var negColBuffer = getNegativeColStartNum();
    var colBuffer = 1;
    var currentCol = NUMCOL;
    var negToPos = false;
    // Move through the array in backwards order
    for(var i = abacusArray.length - 1; i >= 0; i--) {
        // If current col is positive, do positive column calculations
        if(abacusArray[i].colNum <= (NUMCOL - negNumCol)) {
            // Set to starting point of positive columns
            if(abacusArray[i].colNum == (NUMCOL - negNumCol)) {
                if(negToPos == false) {
                    // Push column value to the array
                    columnValuesArray.push(selectedColTotal);
                    selectedColTotal = 0;
                    negToPos = true;
                }
                currentCol = abacusArray[i].colNum;
        } 
        
        if(abacusArray[i].colNum != currentCol) {
            // Update Column multiplier    
            colBuffer *= 10;
            // Push column value to the array
            columnValuesArray.push(selectedColTotal);
            selectedColTotal = 0;
            currentCol = abacusArray[i].colNum;
        }
            // If it is in the top row, calculate
            if(abacusArray[i].beadNum <= 2 && abacusArray[i].state == false) {
                total += (5 * colBuffer);
                selectedColTotal += (5 * colBuffer);
            // Bottom row calculate
            } else if(abacusArray[i].beadNum > 2 && abacusArray[i].state == true) {
                total += (1 * colBuffer);
                selectedColTotal += (1 * colBuffer);
            }
            } else { //If current col is negative, do negative calculations
            //If current col is negative, do negative calculations
            if(abacusArray[i].colNum != currentCol) {
                negColBuffer /= 10;
                // Push column value to the array
                columnValuesArray.push(selectedColTotal);
                selectedColTotal = 0;
                currentCol = abacusArray[i].colNum;
            }
            // Top row calculate
            if(abacusArray[i].beadNum <= 2 && abacusArray[i].state == false) {
                total -= (5 * negColBuffer);
                selectedColTotal -= (5 * negColBuffer);
                // Bottom row calculate
            } else if(abacusArray[i].beadNum > 2 && abacusArray[i].state == true) {
                total -= (1 * negColBuffer);
                selectedColTotal -= (1 * negColBuffer);
            }
        }
    } /// END OF FOR LOOP
    // Push final value to column array
    columnValuesArray.push(selectedColTotal);
    selectedColTotal = 0;
    // For loop writes out values of each individual column
    for(var i = columnValuesArray.length - 1; i >= 0; i--) {
        inString += columnValuesArray[i] + ", ";
    }
    //document.getElementById("columnNumBar").innerText = inString;
    // Update the total in the input bar
    document.getElementById("decNumBar").value = total;
}

function makeTab(typeVar) {
    var elem = document.getElementById("tab");
    var sideElem = document.getElementById("helper");
    if(typeVar == "sign in") {
        elem.innerHTML = '<div><label for="username">Username:</label><input type="text" id="user" name="user"></div><div><label for="pass">Password: </label><input type="password" id="pass" name="password" minlength="5" required></div><button id = "submitSign">Sign In</button>';
        document.getElementById("submitSign").addEventListener("click", signIn);
        txtString = "Sign in to access lessons!";
    }
    if(typeVar =="lesson: 1"){
        txtString += " Click on any bead to start counting.<br>";
        txtString += " An abacus starts counting from the very right. This is the 1's column. The top 2 beads count as 5 of the bottom beads. So moving one bead from the very right would be 1, and moving one bead down from the top would be 5.<br>This lesson will walk you through the basics of using an abacus.<br>";
        var list = ["Lesson 1: Tutorial", "Click any bead", "Reset abacus", "Enter decimal value"];
        var complete = [0, 1, 0, 0];
        //elem.innerHTML = '<div id="innerTab"><h3>Tutorial</h3><ul id="objectives"><div id="current">Click any bead</div><div id="finished">Objective 2</div></ul></div>';
        elem.innerHTML = makeLevel(list, complete);
    } 
    if(typeVar =="lesson: 2") {
        txtString = "Now that you know some things, lets do some math!<br>Move the bead that equals one (first column, bottom section, top bead)."
        var list = ["Lesson 2: Add 2 + 5", "Set abacus to 2", "Add 5 bead", "Abacus is at 7"];
        var complete = [0, 1, 0, 0]
        elem.innerHTML = makeLevel(list, complete);
        var beadStr;
        beadStr = "c" + posNumCol + "b3";
        setElem(beadStr);
    }
    if(typeVar =="lesson: 3") {
        txtString = "This shows the default lesson layout. It includes a name, and 3 objectives that cycle through when completing them.<br>At the moment only 3 lessons are coded in, with easy enough support to add many more!";
        var list = ["Lesson 3: Default", "obj", "obj2", "obj3"];
        var complete = [0, 1, 0, 0]
        elem.innerHTML = makeLevel(list, complete);
    }
    if(typeVar =="lesson: 4") {
        txtString = "This lesson wants you to set the abacus to a random number that is given, no cheating and using the text input bar!";
        document.getElementById("decNumBar").disabled = true;
        var random = (Math.floor(Math.random() * (Math.pow(10,posNumCol - 1)) + 1));
        findRandom = random;
        var list = ["Lesson 4: Set Abacus", "Set abacus to " + random];
        var complete = [0, 1, 0, 0]
        elem.innerHTML = makeLevel(list, complete);
        txtString += "<br>Set the abacus to " + findRandom;
    }
    sideElem.innerHTML = txtString;
}

function signIn() {
    user = document.getElementById("user").value;
    var elem = document.getElementById("helper");
    txtString = '<div>Welcome ' + user + '!</div>';
    elem.innerHTML = txtString;
    level = 1;
    makeTab("lesson: " + level);
}

function makeLevel(objList, complete) {
    if(level != 4) document.getElementById("decNumBar").disabled = false;
    var levelStr = '<div id="innerTab"><h3>' + objList[0] + '</h3><ul id="objectives">';
    for(var element = 1; element < objList.length; element++) {
        if(!complete[element]) levelStr += '<div id="finished">' + objList[element] + '</div>';
        if(complete[element]) levelStr += '<div id="current">' + objList[element] + '</div>';
    }
    if(ifDrawn == false && level>=1) {
        var elem = document.getElementById('buttonDiv');
        elem.classList.add("butDiv");
        var buttonStr = "";
        buttonStr += '<button class="levelButton" id="previous">←</button>';
        buttonStr += '<button class="levelButton" id="restart">↻</button>';
        buttonStr += '<button class="levelButton" id="next">→</button>';
        elem.innerHTML = buttonStr;
        document.getElementById("restart").addEventListener("click", restartLevel);
        document.getElementById("next").addEventListener("click", nextLevel);
        document.getElementById("previous").addEventListener("click", previousLevel);
        ifDrawn = true;
    }
    return levelStr;
}

function checkObj(fromStr, idValue) {
    var elem = document.getElementById("tab");
    var list;
    var complete;
    var value = document.getElementById("decNumBar").value;
    var sideElem = document.getElementById("helper");
    if(level == 1) {
        if((obj == 1) && (fromStr == "click bead")) {
            txtString = " Clicking on the reset button will reset all the beads.<br>This handy button lets you easily move all the beads back to 0.";
            elem = document.getElementById("tab");
            list = ["Lesson 1: Tutorial", "Click any bead", "Reset abacus", "Set decimal value"];
            complete = [0, 0, 1, 0];
            elem.innerHTML = makeLevel(list, complete);
            setElem('resetDiv');
            elem = document.getElementById('resetDiv'); 
            //special movement
            elem.style.marginBottom = "-12px";
            elem = document.getElementById('resetButton');
            elem.style.marginLeft = "0px";
            obj++;
        }
        if((obj == 2) && (fromStr == "reset")) {
            txtString = "This input bar shows the current value of all the beads on the abacus.<br>If you enter in a number the abacus will automatically set to that number!<br>Why don't you try entering in your age and pushing submit?";
            elem = document.getElementById("tab");
            list = ["Lesson 1: Tutorial", "Click any bead", "Reset abacus", "Set decimal value"];
            complete = [0, 0, 0, 1];
            elem.innerHTML = makeLevel(list, complete);
            unsetElem('resetDiv');
            //reset button margin
            elem = document.getElementById("resetButton");
            elem.style.marginLeft = "10px";
            //set input bar to red
            setElem('decInput');
            obj++;
        }
        if((obj == 3) && (fromStr == "submit") && (value != 0)) {
            txtString = "Yay! You completed the basic introduction. Lets move on to doing some math.<br>Press the forward arrow key to move on to the next lesson.<br>Pressing the back arrow will take you to the previous lesson at anytime, and the repeat button will let you start the current lesson over.";
            elem = document.getElementById("tab");
            list = ["Lesson 1: Complete", "Click any bead", "Reset abacus", "Set decimal value"];
            complete = [1, 0, 0, 0];
            elem.innerHTML = makeLevel(list, complete);
            unsetElem('decInput');
        }
    }
    if(level == 2) {
        if(obj==1) {
            if(value == 0) {
                var beadStr;
                beadStr = "c" + posNumCol + "b3";
                setElem(beadStr);
            }
            if(value == 1) {
                txtString += "<br>Perfect! Now let's move the second bead up to equal 2.<br>";
                var beadStr;
                beadStr = "c" + posNumCol + "b4";
                unsetElem(beadStr);
                setElem(beadStr);
            }
            if(value == 2) {
                txtString += "Great! You are totally getting it. Let's now add 5. Remember, the top section are beads worth 5 of the bottom beads. Moving the first column 5 bead down will make our abacus equal to 7!"
                elem = document.getElementById("tab");
                var list = ["Lesson 2: Add 2 + 5", "Set abacus to 2", "Add 5 bead", "Abacus is at 7"];
                complete = [0, 0, 1, 0];
                elem.innerHTML = makeLevel(list, complete);
                var beadStr;
                beadStr = "c" + posNumCol + "b2";
                unsetElem(beadStr);
                setElem(beadStr);
                obj++;
            }
        }
        if((obj == 2) && (idValue == "c5b2")) {
            txtString = "You clicked on the 5 bead. Great! But you seem to have moved some extra beads around. Make sure the abacus is equal to 7 to proceed.";
            unsetElem("c");
            elem = document.getElementById("tab");
            var list = ["Lesson 2: Add 2 + 5", "Set abacus to 2", "Add 5 bead", "Abacus is at 7"];
            complete = [0, 0, 0, 1];
            elem.innerHTML = makeLevel(list, complete);
            obj++;
        }
        if((obj == 3) && (value == 7)) {
            txtString = "Woohoo. We had 2. Then we added another 5 by sliding a bead that had a value of 5. We now have 7.<br>Great work, let's move on to the next lesson!";
            var beadStr;
            beadStr = "c" + posNumCol + "b4";
            elem = document.getElementById("tab");
            var list = ["Lesson 2: Complete", "Set abacus to 2", "Add 5 bead", "Abacus is at 7"];
            complete = [1, 0, 0, 0];
            elem.innerHTML = makeLevel(list, complete);
            obj++;
        }
    }
    if(level == 4) {
        if(value == findRandom) {
            txtString += "<br>Nice, keep restarting this lesson for infinite fun!";
            var list = ["Lesson 4: Complete", "Set abacus to random"];
            var complete = [1, 0, 0, 0];
            elem.innerHTML = makeLevel(list, complete);
        }
    }
    sideElem.innerHTML = txtString;
} 

function previousLevel() {
    if(level!=1) {
        txtString = "";
        document.getElementById("decNumBar").value = 0;
        resetAbacus();
        var elems = document.getElementsByClassName("border");
        for (var i = 0; i < elems.length; i++) {
            elems[i].classList.remove("border");
        }
        elems = document.getElementsByClassName("bborder");
        for (var i = 0; i < elems.length; i++) {
            elems[i].classList.remove("bborder");
        }
        obj = 1;
        level--;
        makeTab("lesson: " + level);
    }
}

function restartLevel() {
    resetAbacus();
    txtString = "";
    document.getElementById("decNumBar").value = 0;
    var elems = document.getElementsByClassName("border");
    for (var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("border");
    }
    elems = document.getElementsByClassName("bborder");
    for (var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("bborder");
    }
    obj = 1;
    makeTab("lesson: " + level);
}

function nextLevel() {
    if(level != 4) {
        txtString = "";
        document.getElementById("decNumBar").value = 0;
        resetAbacus();
        var elems = document.getElementsByClassName("border");
        for (var i = 0; i < elems.length; i++) {
            elems[i].classList.remove("border");
        }
        elems = document.getElementsByClassName("bborder");
        for (var i = 0; i < elems.length; i++) {
            elems[i].classList.remove("bborder");
        } 
        obj = 1;
        level++;
        makeTab("lesson: " + level);
    }
}


function setElem(name) {
    var elem = document.getElementById(name);
    if(name.substring(0,1) == "c") {
        elem.classList.add("bborder");
        elem.classList.remove("noBorder");
    } else {
        elem.classList.add("border");
        elem.classList.remove("noBorder");
    }
}

function unsetElem(name) {
    var elem = document.getElementById(name);
    if(name.substring(0,1) == "c") {
        elems = document.getElementsByClassName("bborder");
        for (var i = 0; i < elems.length; i++) {
            elems[i].classList.remove("bborder");
        }
    } else {
        elem.classList.add("noBorder");
        elem.classList.remove("border");
    }
}


/// Used for testing purposes
function makeButtons() {
    document.getElementById("resetButton").addEventListener("click", resetAbacus);
    document.getElementById("submitButton").addEventListener("click", setAbacus);
}


makeButtons();
makeTab("sign in");
//level = 1;
//makeTab("lesson: " + level);
makeAbacus(NUMCOL);
});