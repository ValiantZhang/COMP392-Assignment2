/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        // PRIVATE INSTANCE VARIABLES
        private _planeWidth: number;
        private _planeHeight: number;
        
        // PUBLIC INSTANCE VARIABLES

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(planeWidth: number, planeHeight: number) {
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }


        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        
        //Change Camera Method
        //focus on the one with the moon
        public focusMoon(): void {
            camera.position.set(planetFrieza.position.x, planetFrieza.position.y + 30, planetFrieza.position.z - 50);
            isFollowingMoonPlanet = true;
        }
        
        //focus back on the entire solar system
        public viewSolarSystem(): void {
            isFollowingMoonPlanet = false;
            camera.position.set(-70, 2, 2);
            camera.lookAt(scene.position);
        }
    }
}
