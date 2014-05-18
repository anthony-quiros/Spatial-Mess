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
var urlEnemy ="./Enemy.png"
var urlPlayer ="./Player.png";
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
var canvasWidth ;
var canvasHeight ;
//Tableau des touches du clavier
var currentlyPressedKeys;
initCanvas = function (){
    //Récupération de l'élement cavans de la page web
    canvas = document.getElementById("SpaceInvadersCanvas");
    //Récupération du contexte du canvas
    canvasContexte = canvas.getContext("2d");
    //Récupération des tailles du canvas
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
};
clearCanvas = function () {canvasContexte.clearRect(0, 0, canvasWidth, canvasHeight);};

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
            if(this._x<canvasWidth - this._width) {
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
        if(this._x>=canvasWidth- this._width ){
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
    this._typeOfBonus  = 'Bonus4G'
    this.getCollision  = function (){return this._collision;};
    this.getTypeOfBonus      = function () {return this._typeOfBonus;};
    this.setCollision  = function(value){this._collision= value;};
    this.moveUp        = function() { if(this._y > 0) { this._y -= 3; }};
    this.moveDown      = function() { if( this._y < canvasHeight ) { this._y += 3; } };
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
    this._typeOfBonus  = 'BonusShip'
    this.getCollision  = function (){return this._collision;};
     this.getTypeOfBonus      = function () {return this._typeOfBonus;};
    this.setCollision  = function(value){this._collision= value;};
    this.moveUp        = function() { if(this._y > 0) { this._y -= 3; }};
    this.moveDown      = function() { if( this._y < canvasHeight ) { this._y += 3; } };
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
    createAllBadShip();
    createPlayerOnCanvas();
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
function createPlayerOnCanvas() {
player     = new createPlayer (1,canvasHeight-30,25,25);

}
//Fonction utilisée à l'initalisation pour créer l'ensemble des vaisseaux
function createAllBadShip() {
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
        if( 'BonusShip'== allBonus[i].getTypeOfBonus() ){
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
    if(gameStart){
    clearCanvas();
    var randomInteger = getRandomInt(0,allShip.length -1);


     //Pour la gestion des mouvements
    actionPlayer();
    moveAllEnemy();
    moveFire();
    moveBonus();
    checkCollision();
    removeAllUselesObject();
    document.getElementById("nbShip").innerHTML = nbShip;
    document.getElementById("score").innerHTML = score;
    if(allShip.length == 0){
        niveau +=.5;
        allShip.pop();
        createAllBadShip();
    }
        if(allShip[randomInteger]){
    allShip[randomInteger].actionFire();}
    showFire(); 
    showPlayer();
    showAllShip();
    showAllBonus();
}
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
                player = new createPlayer (1,canvasHeight-30,25,25);
                
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
        if(allPlayerFire[i].getCollision() || allPlayerFire[i].getY()<0 || allPlayerFire[i].getY()>canvasHeight){
            allPlayerFire.splice(i, 1);
        }
    }

    for (var i = allEnemyFire.length - 1; i >= 0; i--) {
        if(allEnemyFire[i].getCollision() || allEnemyFire[i].getY()<0 || allEnemyFire[i].getY()>canvasHeight){
            allEnemyFire.splice(i, 1);
        }
    }

    for (var i = allBonus.length - 1; i >= 0; i--) {
        if(allBonus[i].getCollision() || allBonus[i].getY()<0 || allBonus[i].getY()>canvasHeight){
            allBonus.splice(i, 1);
        }
    }
};

//Fonctions utilitaires
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

