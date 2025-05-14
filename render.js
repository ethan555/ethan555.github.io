var width, height;
var renderer;
var stage;
var eclipse;
var uniforms;
var shaderCode;
var simpleShader;
Init();

function Init() {
    var scale = .98;
    // Get the screen width and height
    width = window.innerWidth - 18.0;//Math.floor(window.innerWidth * scale);
    height = window.innerHeight;
    // Chooses either WebGL if supported or falls back to Canvas rendering
    renderer = new PIXI.autoDetectRenderer(width, height);
    // Add the render view object into the page
    document.body.appendChild(renderer.view);

    // The stage is the root container that will hold everything in our scene
    stage = new PIXI.Container();

    // Load an image and create an object
    eclipse = new PIXI.Graphics();//"https://image.shutterstock.com/image-photo/austin-texas-usa-sunrise-skyline-260nw-681676399.jpg");
    // Set it at the center of the screen
    eclipse.x = width / 2;
    eclipse.y = height / 2;
    // Make sure the center point of the image is at its center, instead of the default top left
    //eclipse.anchor.set(0.5);
    eclipse.drawRect(-width / 2, -height / 2, width, height);
    // Add it to the screen
    stage.addChild(eclipse);

    uniforms = {}
    uniforms.time = {
        type: "f",
        value: 0
    }
    uniforms.resolution_x = {
        type: "f",
        value: width
    }
    uniforms.resolution_y = {
        type: "f",
        value: height
    }

    function animate() {
        // start the timer for the next animation loop
        // this is the main render call that makes pixi draw your container and its children.
        renderer.render(stage);
        uniforms.time.value += 0.02;
        requestAnimationFrame(animate);
    };

    animate();

    //Get shader code as a string
    shaderCode = document.getElementById("aurorashader").innerHTML;
    //Create our Pixi filter using our custom shader code
    simpleShader = new PIXI.AbstractFilter('', shaderCode, uniforms);
    //Apply it to our object
    eclipse.filters = [simpleShader];
};

addEventListener("resize", (event) => {
    width = window.innerWidth;
    height = window.innerHeight;
    uniforms.resolution_x = {
        type: "f",
        value: width
    };
    uniforms.resolution_y = {
        type: "f",
        value: height
    };
    //eclipse.drawRect(-width/2, -width/2, width, height);
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.style.position = "fixed";
    renderer.width = width;
    renderer.height = height;
    renderer.resize(width, height);

});
