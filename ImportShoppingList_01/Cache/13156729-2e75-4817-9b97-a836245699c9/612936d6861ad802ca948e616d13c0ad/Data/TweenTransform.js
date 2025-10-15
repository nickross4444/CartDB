// TweenTransform.js
// Version: 0.1.3
// Event: Any Event
// Description: Runs a tween on a Lens Studio transform using TweenJS
// ----- USAGE -----
// Attach this script as a component after the Tween Manager script on either the same scene object or in a lower scene object in the Objects Panel.
// -----------------

// @input SceneObject sceneObject
// @input string tweenName
// @input bool playAutomatically = true
// @input int loopType = 0 {"widget":"combobox", "values":[{"label":"None", "value":0}, {"label":"Loop", "value":1}, {"label":"Ping Pong", "value":2}, {"label":"Ping Pong Once", "value":3}]}
// @ui {"widget":"separator"}
// @input int type = 0 {"widget":"combobox", "values":[{"label":"Move", "value":0}, {"label":"Scale", "value":1}, {"label":"Rotate", "value":2}]}
// @input int movementType = 0 {"widget": "combobox", "values": [{"label": "From / To", "value": 0}, {"label": "To", "value": 1}, {"label":"From", "value": 2}, {"label":"Offset", "value": 3}]}
// @input vec3 start {"showIf": "movementType", "showIfValue": 0}
// @input vec3 end {"showIf": "movementType", "showIfValue": 0}
// @input vec3 from {"showIf": "movementType", "showIfValue": 2, "label":"Start"}
// @input vec3 to {"showIf": "movementType", "showIfValue": 1, "label":"End"}
// @input vec3 offset {"showIf": "movementType", "showIfValue": 3}
// @input bool additive {"showIf":"movementType", "showIfValue": 3}
// @ui {"widget":"label", "label":"(Use on Loop)", "showIf": "movementType", "showIfValue": 3}

// @input float time = 1.0
// @input float delay = 0.0
// @input bool isLocal = true
// @ui {"widget":"separator"}
// @input string easingFunction = "Quadratic" {"widget":"combobox", "values":[{"label":"Linear", "value":"Linear"}, {"label":"Quadratic", "value":"Quadratic"}, {"label":"Cubic", "value":"Cubic"}, {"label":"Quartic", "value":"Quartic"}, {"label":"Quintic", "value":"Quintic"}, {"label":"Sinusoidal", "value":"Sinusoidal"}, {"label":"Exponential", "value":"Exponential"}, {"label":"Circular", "value":"Circular"}, {"label":"Elastic", "value":"Elastic"}, {"label":"Back", "value":"Back"}, {"label":"Bounce", "value":"Bounce"}]}
// @input string easingType = "Out" {"widget":"combobox", "values":[{"label":"In", "value":"In"}, {"label":"Out", "value":"Out"}, {"label":"In / Out", "value":"InOut"}]}

// If no scene object is specified, use object the script is attached to
if (!script.sceneObject) {
    script.sceneObject = script.getSceneObject();
}

// Setup the external API
script.tweenObject = script.getSceneObject();
script.tweenType = 'transform';
script.startTween = startTween;
script.resetObject = resetObject;
script.tween = null;
script.setupTween = setupTween;
script.setupTweenBackwards = setupTweenBackwards;
script.updateToStart = updateToStart;
script.updateToEnd = updateToEnd;
script.start = null;
script.end = null;
script.setStart = setStart;
script.setEnd = setEnd;
script.manualStart = false;
script.manualEnd = false;

script.createEvent('OnDestroyEvent').bind(stopTween);

if (global.tweenManager && global.tweenManager.addToRegistry) {
    global.tweenManager.addToRegistry(script);
}

// Manually set start value
function setStart(start) {
    script.manualStart = true;
    script.start = start;
}

// Manually set end value
function setEnd(end) {
    script.manualEnd = true;
    script.end = end;
}

// Update the tween to its start
function updateToStart() {
    updateValue(script.start);
}

// Update the tween to its end
function updateToEnd() {
    if (script.loopType == 3) {
        updateValue(script.start);
    } else {
        updateValue(script.end);
    }
}

// Play it automatically if specified
if (script.playAutomatically) {
    // Start the tween
    startTween();
}

// Create the tween and start it
function startTween() {
    if (!global.tweenManager) {
        print('Tween Transform: Tween Manager not initialized. Try moving the TweenManager script to the top of the Objects Panel or changing the event on this TweenType to "Lens Turned On".');
        return;
    }

    script.tween = setupTween();

    if (script.tween) {
        // Start the tween
        script.tween.start();
    }
}

// Stops active tween
function stopTween() {
    if (script.tween) {
        script.tween.stop();
        script.tween = null;
    }
}

// Create the tween with passed in parameters
function setupTween() {
    const DEG_TO_RAD = 0.0174533;

    const transform = script.sceneObject.getTransform();

    let transformParameter = null;

    let startValue = null;

    let endValue = null;

    let tween = null;

    // Set the appropriate parameter based on isLocal and tweenType
    const type = script.isLocal ? 'Local' : 'World';

    switch (script.type) {
        case 0:
            transformParameter = transform['get' + type + 'Position']();
            break;
        case 1:
            transformParameter = transform['get' + type + 'Scale']();
            break;
        case 2:
            transformParameter = transform['get' + type + 'Rotation']();
            break;
    }

    // Set the start and end of the script based on the movementType selected
    if (!script.manualStart) {
        switch (script.movementType) {
            case 0:
                script.start = (script.type == 2) ? quat.fromEulerAngles(script.start.x * DEG_TO_RAD, script.start.y * DEG_TO_RAD, script.start.z * DEG_TO_RAD) : script.start;
                break;
            case 1:
                script.start = (script.type == 2) ? transformParameter : new vec3(transformParameter.x, transformParameter.y, transformParameter.z);
                break;
            case 2:
                script.start = (script.type == 2) ? quat.fromEulerVec(script.from.uniformScale(DEG_TO_RAD)) : new vec3(script.from.x, script.from.y, script.from.z);
                break;
            case 3:
                script.start = (script.type == 2) ? transformParameter : new vec3(transformParameter.x, transformParameter.y, transformParameter.z);
                break;
        }
    }

    if (!script.manualEnd) {
        switch (script.movementType) {
            case 0:
                script.end = (script.type == 2) ? quat.fromEulerAngles(script.end.x * DEG_TO_RAD, script.end.y * DEG_TO_RAD, script.end.z * DEG_TO_RAD) : script.end;
                break;
            case 1:
                script.end = (script.type == 2) ? quat.fromEulerVec(script.to.uniformScale(DEG_TO_RAD)) : new vec3(script.to.x, script.to.y, script.to.z);
                break;
            case 2:
                script.end = (script.type == 2) ? transformParameter : new vec3(transformParameter.x, transformParameter.y, transformParameter.z);
                break;
            case 3:
                script.end = (script.type == 2) ? transformParameter.multiply(quat.angleAxis(script.offset.x * DEG_TO_RAD, vec3.right())).multiply(quat.angleAxis(script.offset.y * DEG_TO_RAD, vec3.up()))
                    .multiply(quat.angleAxis(script.offset.z * DEG_TO_RAD, vec3.forward())) : new vec3(transformParameter.x + script.offset.x, transformParameter.y + script.offset.y, transformParameter.z + script.offset.z);
                break;
        }
    }

    startValue = (script.type == 2) ? {
        x: 0
    } : {
        x: script.start.x,
        y: script.start.y,
        z: script.start.z
    };

    endValue = (script.type == 2) ? {
        x: 1
    } : {
        x: script.end.x,
        y: script.end.y,
        z: script.end.z
    };

    // Reset object to start
    resetObject();

    // Create the tween
    tween = new global.TWEEN.Tween(startValue)
        .to(endValue, script.time * 1000.0)
        .delay(script.delay * 1000.0)
        .easing(global.tweenManager.getTweenEasingType(script.easingFunction, script.easingType))
        .onUpdate(updateValue)
        .onComplete((script.movementType == 3 && script.additive && script.loopType == 1) ? startTween : null);

    if (tween) {
        // Configure the type of looping based on the inputted parameters
        if (script.movementType == 3 && script.additive && script.loopType == 1) {
            global.tweenManager.setTweenLoopType(tween, 0);
        } else {
            global.tweenManager.setTweenLoopType(tween, script.loopType);
        }

        // Save reference to tween
        script.tween = tween;

        return tween;
    }
}

// Resets the object to its start
function resetObject() {
    if (script.start == null) {
        setupTween();
    }

    const startValue = (script.type == 2) ? {
        x: 0
    } : {
        x: script.start.x,
        y: script.start.y,
        z: script.start.z
    };

    // Initialize transform to start value
    updateValue(startValue);
}

// Create a new tween with swapped start and end parameters
function setupTweenBackwards() {
    // Switch the order of the start and end parameters when creating the backwards Tween
    const startValue = (script.type == 2) ? {
        x: (script.loopType == 3) ? 0 : 1
    } : {
        x: (script.loopType == 3) ? script.start.x : script.end.x,
        y: (script.loopType == 3) ? script.start.y : script.end.y,
        z: (script.loopType == 3) ? script.start.z : script.end.z
    };

    const endValue = (script.type == 2) ? {
        x: (script.loopType == 3) ? 1 : 0

    } : {
        x: (script.loopType == 3) ? script.end.x : script.start.x,
        y: (script.loopType == 3) ? script.end.y : script.start.y,
        z: (script.loopType == 3) ? script.end.z : script.start.z
    };

    let tween = null;

    // Change easing type
    const easingType = global.tweenManager.getSwitchedEasingType(script.easingType);

    // Create the tween
    tween = new global.TWEEN.Tween(startValue)
        .to(endValue, script.time * 1000.0)
        .delay(script.delay * 1000.0)
        .easing(global.tweenManager.getTweenEasingType(script.easingFunction, easingType))
        .onUpdate(updateValue);

    if (tween) {
        // Configure the type of looping based on the inputted parameters
        global.tweenManager.setTweenLoopType(tween, script.loopType);

        return tween;
    }
}

// Here's were the values returned by the tween are used
// to drive the transform of the SceneObject
function updateValue(value) {
    const transform = script.sceneObject.getTransform();
    const local = script.isLocal ? 'Local' : 'World';
    let type = null;
    let newValue = null;
    if (script.type == 0) {
        type = 'Position';
        newValue = new vec3(value.x, value.y, value.z);
    } else if (script.type == 1) {
        type = 'Scale';
        newValue = new vec3(value.x, value.y, value.z);
    } else if (script.type == 2) {
        type = 'Rotation';
        newValue = quat.slerp(script.start, script.end, value.x);
        newValue.normalize();
    }
    transform['set' + local + type](newValue);
}
