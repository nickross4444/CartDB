import WorldCameraFinderProvider from "SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider";
import { HandInputData } from "SpectaclesInteractionKit.lspkg/Providers/HandInputData/HandInputData";
import { HandType } from "SpectaclesInteractionKit.lspkg/Providers/HandInputData/HandType";
import TrackedHand from "SpectaclesInteractionKit.lspkg/Providers/HandInputData/TrackedHand";

@component
export class HandMenu extends BaseScriptComponent {
    //@input private handFollowObject: SceneObject;
    @input private distanceToHand: number = 5;
    @input private moneyTrackerObject: SceneObject;
    @input public preferencesButton: SceneObject;
    @input public groceryButton: SceneObject;
    @input public cartListButton: SceneObject;

    private handProvider: HandInputData = HandInputData.getInstance()
    private leftHand = this.handProvider.getHand("left" as HandType);
    private rightHand = this.handProvider.getHand("right" as HandType);
    private camera = WorldCameraFinderProvider.getInstance();
    private noTrackCount = 0;
    private noClockTrackCount = 0;

    private store: GeneralDataStore;

    onAwake() {
        this.store = global.persistentStorageSystem.store;
        this.createEvent("UpdateEvent").bind(() => {
            this.update();
        })
        //this.handFollowObject.enabled = false;
    }

    update() {
        // Main Menu
        if (this.tryShowHandMenu(this.rightHand)) 
        {
            //this.handFollowObject.enabled = true;
            this.preferencesButton.enabled = true;
            this.groceryButton.enabled = true;
            this.cartListButton.enabled = true;
            this.noTrackCount = 0;
        }
        else
        {
            this.noTrackCount++;
            if(this.noTrackCount > 10)
            {
                //this.handFollowObject.enabled = false;
                this.preferencesButton.enabled = false;
                this.groceryButton.enabled = false;
                this.cartListButton.enabled = false;
            }
        }
        // Clock Menu
        if (this.tryShowClockHandMenu(this.rightHand)) 
        {
            this.moneyTrackerObject.enabled = true;
            this.noClockTrackCount = 0;
        }
        else
        {
            this.noClockTrackCount++;
            if(this.noClockTrackCount > 10)
            {
                this.moneyTrackerObject.enabled = false;
            }
        }
    }
    private tryShowHandMenu(hand: TrackedHand): boolean {
        if(!hand.isTracked()) {
            return false;
        }
        const currentPosition = hand.pinkyKnuckle.position;
        if(currentPosition != null) {
            const knuckleForward = hand.indexKnuckle.forward;
            const cameraForward = this.camera.getTransform().forward;
            const angle = Math.acos(knuckleForward.dot(cameraForward) / (knuckleForward.length * cameraForward.length)) *  180.0 / Math.PI;
            if(Math.abs(angle) > 30) { // 20 before
                return false;
            }
            var directionNextToKnuckle = hand.handType == "left" ? hand.indexKnuckle.right : hand.indexKnuckle.right.mult(HandMenu.scalar3(-1));

            this.preferencesButton.getTransform().setWorldRotation(this.camera.getTransform().getWorldRotation());
            this.preferencesButton.getTransform().setWorldPosition(hand.pinkyKnuckle.position.add(hand.wrist.forward.mult(new vec3(2.25,2.25,2.25))));
            
            this.groceryButton.getTransform().setWorldRotation(this.camera.getTransform().getWorldRotation());
            this.groceryButton.getTransform().setWorldPosition((hand.ringKnuckle.position.add(hand.middleKnuckle.position).mult(new vec3(0.5,0.5,0.5))).add(hand.wrist.forward.mult(new vec3(2.25,2.25,2.25))));

        
             this.cartListButton.getTransform().setWorldRotation(this.camera.getTransform().getWorldRotation());
            this.cartListButton.getTransform().setWorldPosition(hand.indexKnuckle.position.add(hand.wrist.forward.mult(new vec3(2.25,2.25,2.25))));
            return true;
        }
        return false;
    }

    private tryShowClockHandMenu(hand: TrackedHand): boolean {
        if (!hand.isTracked()) {
            return false;
        }
        const currentPosition = hand.wrist.position;
        if (currentPosition != null) {
            const handBackDirection = hand.indexKnuckle.forward.mult(HandMenu.scalar3(-1));
            const cameraForward = this.camera.getTransform().forward;
            const angle = Math.acos(handBackDirection.dot(cameraForward) / (handBackDirection.length * cameraForward.length));
            const backsideThreshold = Math.PI / 3; // Example: 60 degrees
            if (angle < backsideThreshold) {
                //var directionOffset = hand.handType == "left" ? hand.wrist.right.mult(VectorUtils.scalar3(-this.distanceToHand)) : hand.wrist.right.mult(VectorUtils.scalar3(this.distanceToHand));
                this.moneyTrackerObject.getTransform().setWorldRotation(quat.lookAt(hand.wrist.back, new vec3(0,0,1)));//this.camera.getTransform().getWorldRotation());
                this.moneyTrackerObject.getTransform().setWorldPosition(currentPosition.add(hand.wrist.back.mult(new vec3(2.5,2.5,2.5))));//.add(directionOffset));
                return true;
            }
        }
        return false;
    }
    static scalar3(x: number): vec3 {
        return new vec3(x, x, x);
    }
}