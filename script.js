/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Variables globales.
var canvas;
var canvasContexte;
var playerPicture;
var loadPersonnage = false;
var currentlyPressedKeys = {};
var saut = false;
var urlEnemy ="data:image/png;base64,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";
var urlPlayer ="data:image/png;base64,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";
urlBonusFire = './bonusFire.png'
var imgEnemy;
var imgPlayer;
var allShip = new Array();
var player;
var allPlayerFire = new Array();
var allEnemyFire = new Array();
var allBonus = new Array();
var niveau = 0;
var gameStart = false
var nbShip = 0;
var score = 0;
var canMoveToRight = true
var down = false
//Tableau des touches du clavier
var currentlyPressedKeys;
initCanvas = function (){
    //Récupération de l'élement cavans de la page web
    canvas = document.getElementById("SpaceInvadersCanvas");
    //Récupération du contexte du canvas
    canvasContexte = canvas.getContext("2d");
};
clearCanvas = function () {canvas.width = canvas.width;};

/**
* 
*Les classes
* 
**/

/*
 La classe abstraite Sprit
*/

Sprite = function (x, y, width, height){
    //Initialisation des attribut de la classe
    this._x = x;
    this._y = y;
    this._height = height;
    this._width = width;
    this.getX = function (){return this._x;};
    this.getY = function (){return this._y;};
    this.getHeight = function (){return this._height;};
    this.getWidth = function (){return this._width;};
    this.setX = function (value){this._x = value;};
    this.setY = function (value){this._y= value;};
    this.setWidth = function (value){this._width = value;};
    this.setHeight = function (value){this._height = value;};
};

/*
 * La classe Abstraite Ship qui hérite de la classe Sprint
 */

//La classe Ship
Ship = function (xShip, yShip, widthShip, heightShip, speedShip, picureShip) {
    
    //Implémentation de l'héritage
    this.__proto__ = new Sprite(xShip,yShip,widthShip,heightShip);
    //Initialisation des champs
    this._speedShip     = speedShip;
    this._picureShip    = picureShip;
    this._collision     = false;

    //Initilisation des methodes
    this.getSpeed           = function () {return this._speedShip;};
    this.getUrlPicureShip   = function () {return this.urlPicureShip;};
    this.getTypeOfShip      = function () {return this._typeOfShip;};
    this.getCollision       = function () {return this._collision;};
    this.setSpeedShip       = function (value) {this._widthShip = value;};
    this.setPicureShip      = function (value) {this._PicureShip = value;};
    this.setTypeOfShip      = function (value) {this._typeOfShip = value;};
    this.setCollision       = function (value) {this._collision = value;};
    this.moveRight  = function (){
            if(this._x<canvas.width - this._width) {
                this._x += this._speedShip + niveau;
            }
        };
        this.moveLeft   = function () {
            if(this._x>=0) {
                this._x -= (this._speedShip +niveau);
            }
        };

};
/*
 * La classe Player qui hérite de la classe Ship
 */
 Player = function(xShip, yShip,  widthShip, heightShip, speedShip, picureShip){
    //Implémentation de l'héritage
    this.__proto__  = new Ship(xShip, yShip,  widthShip, heightShip, speedShip, picureShip);
    this._firewidth = 7;
    
    this.getFireWidth = function() { return this._firewidth; };
    this.setFireWidth = function(value) { this._firewidth = value; };
    this.actionFire = function () { 
    if(allPlayerFire.length <=5) {
        allPlayerFire.push(createFire(this._x + 12, this._y - 7,this._firewidth,enumTypeOfFireDirection.TOP));
    }
        
    };
 };


BadShip = function (xShip, yShip,  widthShip, heightShip, speedShip, picureShip){
    //Implémentation de l'héritage
    this.__proto__ = new Ship(xShip, yShip,  widthShip, heightShip, speedShip, picureShip);

    this.actionFire = function () { 
        if(allEnemyFire.length <=5) {
            allEnemyFire.push(createFire(this._x + 12, this._y + this._height,7, enumTypeOfFireDirection.BOTTOM));
        }  
    };

    this.calculFreeMove = function () {
        if(this._x<=0){
            canMoveToRight = true;
            down = true;
        }
        if(this._x>=canvas.width - this._width ){
            canMoveToRight = false;
            down = true;
        }
    }
    this.freeMove = function () {

        if(down) {
            this._y += this._height; 
        }
        if(canMoveToRight){
            this.moveRight();
        }
        else {
            this.moveLeft() ;
        };
    }
};

//La classe fire
Fire = function (x,y,width,height,direction) {
    
    //Implémentation de l'héritage de la classe sprit
    this.__proto__ = new Sprite(x,y,width,height, direction);
    this._collision = false;
    this._direction = direction
    this.getCollision  = function (){return this._collision;};
    this.setCollision  = function(value){this._collision= value;};
    this.moveFire = function (){if(this._direction == enumTypeOfFireDirection.TOP){this._y -=(3 + niveau);}else {this._y +=1 + niveau;}};
};

/**
* Les classe utilisées pour les Bonus
*
**/
//Classe abstraite Bonus
Bonus4G = function (x,y,width,height,direction) {
    
    //Implémentation de l'héritage de la classe sprit
    this.__proto__     = new Sprite(x,y,width,height, direction);
    this._collision    = false;
    this._direction    = direction;
    this._typeOfBonus  = 
    this.getCollision  = function (){return this._collision;};
    this.getTypeOfBonus      = function () {return this._typeOfBonus;};
    this.setCollision  = function(value){this._collision= value;};
    this.moveUp        = function() { if(this._y > 0) { this._y -= 3; }};
    this.moveDown      = function() { if( this._y < canvas.height ) { this._y += 3; } };
    this.modifPlayer   = function (player){
        player.setFireWidth(player.getWidth());
        player.actionFire = function () { 
            if(allPlayerFire.length <=5) {
                allPlayerFire.push(createFire(this._x, this._y - 7,this._firewidth,enumTypeOfFireDirection.TOP));
            }
        
            };

    };
};


BonusShip = function (x,y,width,height,direction) {
    
    //Implémentation de l'héritage de la classe sprit
    this.__proto__     = new Sprite(x,y,width,height, direction);
    this._collision    = false;
    this._direction    = direction;
    this.getCollision  = function (){return this._collision;};
    this.setCollision  = function(value){this._collision= value;};
    this.moveUp        = function() { if(this._y > 0) { this._y -= 3; }};
    this.moveDown      = function() { if( this._y < canvas.height ) { this._y += 3; } };
    this.modifPlayer   = function (player){ nbShip++; };
};

/**
*
*Les fonctions qui permettent de créer les badShip, le joueur, les coups de feu
*
**/
createPlayer  = function (x,y,h,w){return new Player(x,y,h,w,2, imgPlayer);};
createEnemy   = function (x,y,h,w){return new BadShip(x,y,h,w,1, imgEnemy);};
createFire    = function (x,y,width, direction){ return new Fire(x,y,width,7, direction);};
createBonus4G = function (x,y,width, direction){ return new Bonus4G(x,y,width,7, direction);};
createBonusship = function (x,y,width, direction){ return new BonusShip(x,y,width,7, direction);};


//Fonctions qui permettent de charger les images en mémoire
chargeEnemyPicture = function () {
imgEnemy = new Image();   // Crée un nouvel objet Image
imgEnemy.src = urlEnemy; // Définit le chemin vers sa source
imgEnemy.onload = function(){
    chargePlayerPicture();
    };
};

chargePlayerPicture = function () {
imgPlayer = new Image();   // Crée un nouvel objet Image
imgPlayer.src = urlPlayer; // Définit le chemin vers sa source
imgPlayer.onload = function(){
    chargeBonusFirePicture();
    };
};
chargeBonusFirePicture = function () {

imgBonusFire = new Image();   // Crée un nouvel objet Image
imgBonusFire.src = urlBonusFire; // Définit le chemin vers sa source
imgBonusFire.onload = function(){
    createAllShip();
    gameStart = true;
    };

}


function initGame() {
    nbShip = 4;
    initCanvas();
    chargeEnemyPicture();
    showAll();
}

//Création du joueur
function createPlayer() {
player     = new createPlayer (1,canvas.height-30,25,25);

}
//Fonction utilisée à l'initalisation pour créer l'ensemble des vaisseaux
function createAllShip() {
    player     = new createPlayer (1,canvas.height-30,25,25);
    allShip.push(new createEnemy (5,5,25,25));
    allShip.push(new createEnemy (5,35,25,25));
    allShip.push(new createEnemy (5,65,25,25));
    allShip.push(new createEnemy (5,95,25,25));
    allShip.push(new createEnemy (35,5,25,25));
    allShip.push(new createEnemy (35,35,25,25));
    allShip.push(new createEnemy (35,65,25,25));
    allShip.push(new createEnemy (35,95,25,25));
    allShip.push(new createEnemy (65,5,25,25));
    allShip.push(new createEnemy (65,35,25,25));
    allShip.push(new createEnemy (65,65,25,25));
    allShip.push(new createEnemy (65,95,25,25));
    allShip.push(new createEnemy (95,5,25,25));
    allShip.push(new createEnemy (95,35,25,25));
    allShip.push(new createEnemy (95,65,25,25));
    allShip.push(new createEnemy (95,95,25,25));
    allShip.push(new createEnemy (125,5,25,25));
    allShip.push(new createEnemy (125,35,25,25));
    allShip.push(new createEnemy (125,65,25,25));
    allShip.push(new createEnemy (125,95,25,25));
    allShip.push(new createEnemy (155,5,25,25));
    allShip.push(new createEnemy (155,35,25,25));
    allShip.push(new createEnemy (155,65,25,25));
    allShip.push(new createEnemy (155,95,25,25));
}
//Fonction qui permet d'afficher l'ensemble des coups de feu sur le canvas
function showFire() {

    //Affichage des coups de feu du joueur
    for (var i = 0; i < allPlayerFire.length; i++)  {
        canvasContexte.beginPath();
        canvasContexte.moveTo(allPlayerFire[i].getX(),allPlayerFire[i].getY());
        canvasContexte.lineTo(allPlayerFire[i].getX() + allPlayerFire[i].getWidth(),allPlayerFire[i].getY());
        canvasContexte.fillStyle = "green";
        canvasContexte.strokeStyle = "green"; 
        canvasContexte.lineWidth = allPlayerFire[i].getHeight();
        canvasContexte.fill();
        canvasContexte.stroke(); 
    }

    //Affichage des coups de feu qui ne vienent pas du joueur
    for (var i = 0; i < allEnemyFire.length; i++)  {
        canvasContexte.beginPath();
        canvasContexte.moveTo(allEnemyFire[i].getX(),allEnemyFire[i].getY());
        canvasContexte.lineTo(allEnemyFire[i].getX(),allEnemyFire[i].getY() - allEnemyFire[i].getHeight());
        canvasContexte.fillStyle = "red";
        canvasContexte.strokeStyle = "red"; 
        canvasContexte.lineWidth = allEnemyFire[i].getWidth();
        canvasContexte.fill();
        canvasContexte.stroke(); 
    }
    return true;
};
//Fonction qui permet d'afficher l'ensemble des vaisseau sur le canvas (enemi et joueur)
function showAllShip() {
    for (var i = 0; i < allShip.length; i++)  {
        //console.debug("Ajout d'un vaisseau de type : " + allShip[i].getTypeOfShip());
        //console.debug(allShip[i])
        canvasContexte.drawImage(imgEnemy, allShip[i].getX(), allShip[i].getY(), allShip[i].getHeight(),allShip[i].getWidth()); 
    }
    return true;
};

showPlayer = function() {
    if (player && gameStart ) {
        canvasContexte.drawImage(imgPlayer, player.getX(), player.getY(), player.getHeight(),player.getWidth()); 
    }
};

//Fonction qui permet d'afficher l'ensemble des Bonus
function showAllBonus() {
    for (var i = 0; i < allBonus.length; i++)  {
        //console.debug("Ajout d'un vaisseau de type : " + allShip[i].getTypeOfShip());
        //console.debug(allShip[i])
        if( BonusShip === allBonus[i].getTypeOfShip()){
            canvasContexte.drawImage(imgPlayer, allBonus[i].getX(), allBonus[i].getY(), allBonus[i].getHeight(),allBonus[i].getWidth()); 
        }
        else{
            canvasContexte.drawImage(imgBonusFire, allBonus[i].getX(), allBonus[i].getY(), allBonus[i].getHeight(),allBonus[i].getWidth()); 
        }
    }
    return true;
};
//Fonction qui va afficher l'ensemble du jeu
function showAll() {
    clearCanvas();
    var randomInteger = getRandomInt(1,allShip.length -1);


     //Pour la gestion des mouvements
    actionPlayer();
    moveAllEnemy();
    moveFire();
    moveBonus();
    checkCollision();
    removeAllUselesObject();
    document.getElementById("nbShip").innerHTML = nbShip;
    document.getElementById("score").innerHTML = score;
    if(player== null && gameStart){
        nbDead++;
        document.getElementById("nbShip").innerHTML = nbShip;
        niveau = 0;
        allShip = new Array();
        createAllShip();
    }
    if(allShip.length == 0){
        niveau +=.5;
        allShip.pop();
        createAllShip();
    }
        if(allShip[randomInteger]){
    allShip[randomInteger].actionFire();}
    showFire(); 
    showPlayer();
    showAllShip();
    showAllBonus();
    requestAnimationFrame(showAll);
}

getAllEnemy = function() {
    var enemys = new Array();
    for (var i = 0; i < allShip.length; i++)  {
        var img;
        if(allShip[i].getTypeOfShip() === BadShip){
            enemys.push(allShip[i])
        }
    }
    return enemys;
};
/**
* Contient la liste des type possible pour un vaiseau
**/
enumTypeOfShip = Object.freeze({ENEMY: "ENEMY", PLAYER : "PLAYER"});

/**
* Contient la liste des direction pour les fire
**/
enumTypeOfFireDirection = Object.freeze({TOP: "TOP", BOTTOM : "BOTTOM"});

/*
****Gestion des mouvements du joueur
*/
/**
    Contient la liste des mouvement possible pour le joueur, pour le moment gauche et droite
**/

MoveLeft = 37;
MoveRight = 39;
MoveFire1 = 32;
MoveFire2 = 38;
//Cette fonction est utilisée lorsque l'utilisateur appuie sur une touche du clavier
function handleKeyDown(event) {
    var keyCode = event.keyCode;
    if(keyCode == MoveFire1 || keyCode == MoveFire2 ){
        player.actionFire();
    }
    else{
        currentlyPressedKeys[event.keyCode] = true;
    } 
}
//Cette fonction est utilisée lorsque l'utilisateur relache la pression sur une touche du clavier
 function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }

function initListener() {
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
}

function actionPlayer(){
    var myReturn = false;
    if(currentlyPressedKeys[MoveLeft] && currentlyPressedKeys[MoveLeft] == true){
        player.moveLeft();
        myReturn = true;
    }
    if(currentlyPressedKeys[MoveRight] && currentlyPressedKeys[MoveRight] == true){
        player.moveRight();
        myReturn = true;
    }

    return myReturn;
}
//Fonction qui va faire bouger les enemis
function moveAllEnemy(){
    for (var i = 0; i < allShip.length; i++) {
        allShip[i].calculFreeMove();
    };

    for (var i = 0; i < allShip.length; i++) {
        allShip[i].freeMove();
    };
    down = false;
}

//Fonction qui va faire avancer les coups de feu
function moveFire(){
    for (var i = 0; i < allEnemyFire.length; i++) {
        allEnemyFire[i].moveFire();
    }

    for (var i = 0; i < allPlayerFire.length; i++) {
        allPlayerFire[i].moveFire();
    }
}

//Fonction qui va faire avancer les bonus
function moveBonus(){
    for (var i = 0; i < allBonus.length; i++) {
        allBonus[i].moveDown();
    }
}


/*
*Cette fonction a pour objectif la detection de collision entre deux object
*@Return Return true si deux objets sont en collision
*/
function hasCollision(obj1, obj2){
    if((obj2.getX() >= obj1.getX() + obj1.getWidth())      // trop à droite
    || (obj2.getX() + obj2.getWidth() <= obj1.getX()) // trop à gauche
    || (obj2.getY() >= obj1.getY() + obj1.getHeight()) // trop en bas
    || (obj2.getY() + obj2.getHeight() <= obj1.getY()))  // trop en haut
          return false; 
   else
          return true; 
};

function checkCollision(){

    //Collision entre les les tires amis et les vaiseaux méchants
    for (var i = 0; i < allShip.length; i++) {
        for (var j = 0; j < allPlayerFire.length; j++) {
            if(hasCollision(allShip[i], allPlayerFire[j])) {
                allShip[i].setCollision(true);
                allPlayerFire[j].setCollision(true);
                score += 1000;
                 //Création des bonus
                if ( getRandomInt(1,30) == 28 ) {
                    allBonus.push( new Bonus4G( allShip[i].getX(), 20, 20, 7, 'UP' ) );
                    console.log('fire')
                }
                else {
                        if ( getRandomInt(1,30) == 26 ) {
                        allBonus.push( new BonusShip( allShip[i].getX(), 20, 20, 7, 'UP' ) );
                        console.log('ship')
                }

                }
            }
        }
    }
    //collision entre les tire méchants et le joueur
    for (var j = 0; j < allEnemyFire.length; j++) {
            if(hasCollision(player, allEnemyFire[j])) {
                nbShip--;
                
                if (nbShip == 0) {
                    player.setCollision(true);
                }
                
                allEnemyFire[j].setCollision(true);
            }
        }
    //Collision entre les tires
    for (var i = 0; i < allPlayerFire.length; i++) {
        for (var j = 0; j < allEnemyFire.length; j++) {
            if(hasCollision(allPlayerFire[i], allEnemyFire[j])) {
                allPlayerFire[i].setCollision(true);
                allEnemyFire[j].setCollision(true);
                score += 100;
            }
        }
    }

    //Collision entre les bonus et le joueur
    for (var j = 0; j < allBonus.length; j++) {
        if( hasCollision(allBonus[j], player ) ) {
            allBonus[j].setCollision(true);
            allBonus[j].modifPlayer(player);
            score += 10000;
        }
    }

};
function removeAllUselesObject(){
    for (var i = allShip.length - 1; i >= 0; i--) {
        if(allShip[i].getCollision()){
            allShip.splice(i, 1);
        }
    }
    if(player && player.getCollision()){
        player = null;
    }

    for (var i = allPlayerFire.length - 1; i >= 0; i--) {
        if(allPlayerFire[i].getCollision() || allPlayerFire[i].getY()<0 || allPlayerFire[i].getY()>canvas.height){
            allPlayerFire.splice(i, 1);
        }
    }

    for (var i = allEnemyFire.length - 1; i >= 0; i--) {
        if(allEnemyFire[i].getCollision() || allEnemyFire[i].getY()<0 || allEnemyFire[i].getY()>canvas.height){
            allEnemyFire.splice(i, 1);
        }
    }

    for (var i = allBonus.length - 1; i >= 0; i--) {
        if(allBonus[i].getCollision() || allBonus[i].getY()<0 || allBonus[i].getY()>canvas.height){
            allBonus.splice(i, 1);
        }
    }
};

//Fonctions utilitaires
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

