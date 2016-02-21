/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // PUBLIC INSTANCE VARIABLES
        /*public rotationSpeedX: number;
        public rotationSpeedY: number;
        public rotationSpeedZ: number;*/
        //public numberOfObjects: number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(planeWidth, planeHeight) {
            /*this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;*/
            //this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }
        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        //Change Camera Method
        Control.prototype.focusMoon = function () {
            camera.position.set(planetFrieza.position.x, planetFrieza.position.y + 30, planetFrieza.position.z - 50);
            isFollowingMoonPlanet = true;
        };
        Control.prototype.viewSolarSystem = function () {
            isFollowingMoonPlanet = false;
            camera.position.set(-70, 2, 2);
            camera.lookAt(scene.position);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
