/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // PUBLIC INSTANCE VARIABLES
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(planeWidth, planeHeight) {
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }
        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        //Change Camera Method
        //focus on the one with the moon
        Control.prototype.focusMoon = function () {
            camera.position.set(planetFrieza.position.x, planetFrieza.position.y + 30, planetFrieza.position.z - 50);
            isFollowingMoonPlanet = true;
        };
        //focus back on the entire solar system
        Control.prototype.viewSolarSystem = function () {
            isFollowingMoonPlanet = false;
            camera.position.set(-70, 2, 2);
            camera.lookAt(scene.position);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
