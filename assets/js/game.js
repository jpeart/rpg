class fighter {
    constructor(n, a, h, i, s) {
            this.name = n;
            this.attack = a;
            this.hp = h;
            this.img = i;
            this.sound = s;
            this.dead = false;
        } //end constructor
    addAttack() {
            this.attack *= 1.5;
        } //end add attack
    subHp(a) {
        this.hp -= a;
        // bad idea
        // if(this.hp <= 0)
        //     return true;
        // else
        //     return false;
    }

} //end fighter class

var rock = new fighter("The Rock", 50, 100, "assets/images/therock.jpg", "assets/sounds/");
var bill = new fighter("Bill Nye", 2, 200, "assets/images/bill.jpg", "assets/sounds/");
var dale = new fighter("Dale Gribble", 25, 80, "assets/images/dale.jpg", "assets/sounds/");
var shrek = new fighter("Shrek", 15, 125, "assets/images/shrek.jpg", "assets/sounds/");
var dwight = new fighter("Dwight Schrute", 10, 150, "assets/images/dwight.jpg", "assets/sounds/");
var list = [rock, bill, dale, shrek, dwight];
var firstpick = true;
var fighting = false;
var won = false;
// var dead = false;
var pick = null;
var oppo = null;

//startup
initialize();
//pick char (remove from avaliable list)
$(".pick").on("click", function() {
    // tried to remove pick class from all divs but doesnt want to work so i stuck with javascript
    //var temp = null;
    // for (i = 0; i < list.length; i++){
    //     temp = "'#"+i+"'";
    //     $(temp).removeClass("pick");
    // }
    // store the index of the pick
    if (firstpick) {
        //would like to use functions but will change the scope of "this".
        pick = this.id;
        // change class of divs
        for (i = 0; i < list.length; i++) {
            document.getElementById(i).classList.remove("pick");
            document.getElementById(i).classList.add("enemy");
        }
        // move div
        document.getElementById("you").appendChild(this);
        $("#title").html("Pick your Opponent");
        firstpick = false;
    } // pick opponent
    else if (!fighting) {
        // if else is a work around to javascript not recognizing new classes after load
        if (this.id != pick) {
            oppo = this.id;
            for (i = 0; i < list.length; i++) {
                if (!list[i].dead) {
                    document.getElementById(i).classList.remove("enemy");
                    if (i != oppo && i != pick)
                        document.getElementById(i).classList.add("fade");
                }
            }
            document.getElementById("enemy").appendChild(this);
            $("#title").html("Fight!");

            fighting = true;
            document.getElementById("att").style.display = "block";
        } else
            alert("you cant fight yourself");
    }
});

// attack button
// pick is index of pick oppo is index of opponent
// subtract attack from oppo hp, addAttack, if oppo hp > 0 sub hp by their attk, push new hps to div check if ded.
$("#att").on("click", function() {
    if (!list[pick].dead) {

        list[oppo].subHp(list[pick].attack);
        list[pick].addAttack();
        document.getElementById("enemyhp").innerHTML = "Health: " + list[oppo].hp;

        if (list[oppo].hp <= 0) {
            alert("you have defeated " + list[oppo].name);
            document.getElementById("enemyhp").innerHTML = "";
            document.getElementById("enemy").removeChild(document.getElementById(oppo));
            list[oppo].dead = true;            
            // did you win?
            for(i=0; i<list.length; i++)
            {
                console.log(list[i].name +" is dead " + list[i].dead);
                // second part of this if statement had me for a while
                if(!list[i].dead && i != pick)
                {
                    won = false; 
                    break;
                }
                else
                    won = true;
            }
            if(won)
                alert("You beat everyone! You Win!");
            // remove oppo from divs 
            // Moving the div might have removed it already? dont need to remove child i guess
            // document.getElementById(oppo).parentNode.removeChild(oppo);
            for (i = 0; i < list.length; i++) {
                if (!list[i].dead) {
                    document.getElementById(i).classList.remove("fade");
                    document.getElementById(i).classList.add("opacity-full");
                    document.getElementById(i).classList.add("enemy");
                }
            }
            fighting = false;
        } //end if
        //counter attack
        else {
            list[pick].subHp(list[oppo].attack);
            document.getElementById("youhp").innerHTML = "Health: " + list[pick].hp;
            //check if ded
            if (list[pick].hp <= 0) {
                list[pick].dead = true;
                alert("You have Died");
            }
        }

    }
});

// //pick enemy (on .enemy click) (set other opacities to 10%) ()
// //CSS class changes dont seem to stick (will never recognize ".enemy" even if its been added to the div)
//   seems as though javascript doesnt recognize class changes after initial load
// $(".enemy").on("click", function() {
//     oppo = this.id;
//     for (i = 0; i < list.length; i++) {
//         document.getElementById(i).classList.remove("enemy");
//         if (i != oppo && i != pick)
//             document.getElementById(i).classList.add("fade");
//     }
//     document.getElementById("enemy").appendChild(this);
//     $("#title").html("Fight!");

// });


// scope of "this" makes the function infeasible
// function playerpick() {
//     pick = this.id;
//     // change class of divs
//     for (i = 0; i < list.length; i++) {
//         document.getElementById(i).classList.remove("pick");
//         document.getElementById(i).classList.add("enemy");
//     }
//     // move div
//     document.getElementById("you").appendChild(this);
//     $("#title").html("Pick your Opponent");
//     firstpick = false;
//     return;
// }

//put the fighters on the screen
function initialize() {
    // initialize fighters
    for (i = 0; i < 5; i++) {
        var pic = document.createElement("img");
        pic.setAttribute("src", list[i].img);
        document.getElementById(i).innerHTML = list[i].name;
        document.getElementById(i).appendChild(pic);
        document.getElementById(i).innerHTML += "Health: " + list[i].hp;
    }
    return;
} //end initialize
