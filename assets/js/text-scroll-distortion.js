window.addEventListener('load', () => {
    // Setup vertex shader with RGB split effect
    const vertexShader = `
        precision mediump float;
        
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;
        
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMousePosition;
        uniform float uMouseMoveStrength;
        
        varying vec2 vTextureCoord;
        varying vec2 vDeformedTextureCoord;
        
        void main() {
            vec3 vertexPosition = aVertexPosition;
            
            float distanceFromMouse = distance(vertexPosition.xy, vec2(uMousePosition.x, -uMousePosition.y));
            
            float waveSinusoid = cos(5.0 * (distanceFromMouse - uTime * 0.75));
            float distortionEffect = (waveSinusoid * 0.05) * max(0.0, 1.0 - distanceFromMouse * 1.0);
            
            vertexPosition.z += distortionEffect * uMouseMoveStrength;
            
            gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
            
            // Get the texture coordinates
            vTextureCoord = aTextureCoord;
            // Get the deformed texture coordinates based on mouse position and time
            vDeformedTextureCoord = aTextureCoord;
            vDeformedTextureCoord.x += distortionEffect * 0.3;
            vDeformedTextureCoord.y += distortionEffect * 0.3;
        }
    `;

    const fragmentShader = `
        precision mediump float;
        
        varying vec2 vTextureCoord;
        varying vec2 vDeformedTextureCoord;
        uniform sampler2D uSampler;
        
        void main() {
            // Create RGB split effect
            vec4 redChannel = texture2D(uSampler, vec2(vDeformedTextureCoord.x, vTextureCoord.y));
            vec4 greenChannel = texture2D(uSampler, vTextureCoord);
            vec4 blueChannel = texture2D(uSampler, vec2(vDeformedTextureCoord.x - 0.01, vTextureCoord.y));
            
            gl_FragColor = vec4(redChannel.r, greenChannel.g, blueChannel.b, greenChannel.a);
        }
    `;

    // Initialize curtains
    const curtains = new Curtains({
        container: 'main',
        pixelRatio: Math.min(1.5, window.devicePixelRatio),
        watchScroll: false,
    });

    let mousePosition = {
        x: 0,
        y: 0,
    };
    
    let mouseLastPosition = {
        x: 0,
        y: 0,
    };
    
    let mouseMoveStrength = 0;

    // Handle mouse/touch movement
    function handleMovement(e) {
        if(e.targetTouches) {
            mousePosition.x = e.targetTouches[0].clientX;
            mousePosition.y = e.targetTouches[0].clientY;
        }
        else {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        }
    }

    window.addEventListener("mousemove", handleMovement);
    window.addEventListener("touchmove", handleMovement, { passive: true });

    // Find all headings with the RGB split style
    const headings = document.querySelectorAll('.is-style-rgb-split-animation');
    
    headings.forEach(heading => {
        // Create canvas wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'rgb-split-wrapper';
        heading.parentNode.insertBefore(wrapper, heading);
        wrapper.appendChild(heading);
        
        const params = {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                time: {
                    name: "uTime",
                    type: "1f",
                    value: 0
                },
                resolution: {
                    name: "uResolution",
                    type: "2f",
                    value: [wrapper.clientWidth, wrapper.clientHeight]
                },
                mousePosition: {
                    name: "uMousePosition",
                    type: "2f",
                    value: [0, 0]
                },
                mouseMoveStrength: {
                    name: "uMouseMoveStrength",
                    type: "1f",
                    value: 0
                }
            }
        };

        const plane = new Plane(curtains, wrapper, params);

        plane.onRender(() => {
            // Update time
            plane.uniforms.time.value++;

            // Get mouse move strength
            mouseMoveStrength = Math.max(0, Math.min(1, mouseMoveStrength));
            plane.uniforms.mouseMoveStrength.value = mouseMoveStrength;

            // Update mouse position
            const mouseCoords = plane.mouseToPlaneCoords(mousePosition.x, mousePosition.y);
            plane.uniforms.mousePosition.value = [mouseCoords.x, mouseCoords.y];

            // Update mouse move strength
            mouseLastPosition.x = lerp(mouseLastPosition.x, mousePosition.x, 0.1);
            mouseLastPosition.y = lerp(mouseLastPosition.y, mousePosition.y, 0.1);

            const delta = Math.sqrt(
                Math.pow(mousePosition.x - mouseLastPosition.x, 2) +
                Math.pow(mousePosition.y - mouseLastPosition.y, 2)
            );

            mouseMoveStrength = lerp(mouseMoveStrength, Math.min(1, delta / 30), 0.1);
        });

        // Handle resize
        window.addEventListener("resize", () => {
            plane.uniforms.resolution.value = [wrapper.clientWidth, wrapper.clientHeight];
        });
    });
});

// Helper function for linear interpolation
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}