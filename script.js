// ============================================================
// QUANTUM LOVE
// Versão Web do projeto original em Python + Turtle
// HTML + CSS + JavaScript + Canvas
// ============================================================


const canvas =
    document.getElementById("quantumCanvas");

const ctx =
    canvas.getContext("2d");


// ============================================================
// CONFIGURAÇÃO
// ============================================================

let heartBeatSpeed = 3.0;

let numRings = 18;

let twistFactor = 1.2;

let manifoldMode = 0;

let paletteIdx = 0;

let cameraDistance = 420.0;

let masterTime = 0.0;

let rotX = 0.0;

let rotY = 0.0;

let rotZ = 0.0;

let isPaused = false;


// ============================================================
// MODOS
// ============================================================

const modes = [

    "Quantum Beat Tunnel (Concentric Depth Singularity)",

    "Double Heart Möbius Ring (Torus Knot Alignment)",

    "Hyper-Cardioid Vortex (Rotational Gravity Fields)",

    "Infinite Love Waveform (Transverse Spatial Propagation)"

];


const palettes = [

    "Valentine Neon",

    "Rose Quartz Aurora",

    "Cyber Cupid",

    "Amethyst Glow"

];


// ============================================================
// TAMANHO DA TELA
// ============================================================

let width = window.innerWidth;

let height = window.innerHeight;


function resizeCanvas() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;


    const ratio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;


    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


// ============================================================
// CORES HOLOGRÁFICAS
// ============================================================

function hsvToRgb(h, s, v) {

    let r;
    let g;
    let b;


    const i =
        Math.floor(h * 6);

    const f =
        h * 6 - i;

    const p =
        v * (1 - s);

    const q =
        v * (1 - f * s);

    const t =
        v * (1 - (1 - f) * s);


    switch (i % 6) {

        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }


    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}


function getHolographicLoveColor(
    paletteIndex,
    zDepth,
    cycleShift
) {

    let depthRatio =
        (zDepth + 160) / 320;


    depthRatio =
        Math.max(
            0.15,
            Math.min(1.0, depthRatio)
        );


    let h;
    let s;
    let v = 1.0;


    if (paletteIndex === 0) {

        h =
            (
                0.92 +
                depthRatio * 0.14 -
                cycleShift * 0.05
            ) % 1;

        s = 0.95;
    }


    else if (paletteIndex === 1) {

        h =
            (
                0.86 +
                depthRatio * 0.22 +
                cycleShift * 0.03
            ) % 1;

        s = 0.65;
    }


    else if (paletteIndex === 2) {

        h =
            (
                0.98 +
                depthRatio * 0.30 +
                cycleShift * 0.08
            ) % 1;

        s = 0.90;
    }


    else {

        h =
            (
                0.76 +
                depthRatio * 0.18 -
                cycleShift * 0.04
            ) % 1;

        s = 1.0;
    }


    if (h < 0) {
        h += 1;
    }


    const intensity =
        Math.min(
            1.0,
            depthRatio * 1.35
        );


    const rgb =
        hsvToRgb(
            h,
            s,
            v
        );


    return {
        r: rgb.r * intensity,
        g: rgb.g * intensity,
        b: rgb.b * intensity
    };
}


// ============================================================
// PONTO DO CORAÇÃO
// ============================================================

function calculate3DHeartPoint(
    theta,
    ringIdx,
    timeStep
) {

    const sin =
        Math.sin(theta);

    const cos =
        Math.cos(theta);


    let xRaw =
        16 *
        Math.pow(sin, 3);


    let yRaw =
        13 * cos -
        5 * Math.cos(2 * theta) -
        2 * Math.cos(3 * theta) -
        Math.cos(4 * theta);


    yRaw += 1.5;


    const xNorm =
        xRaw * 0.062;


    const yNorm =
        yRaw * 0.062;


    let x;
    let y;
    let z;


    // ========================================================
    // MODO 0
    // ========================================================

    if (manifoldMode === 0) {

        const ratio =
            ringIdx / numRings;


        const pulse =
            1 +
            0.16 *
            Math.sin(
                timeStep * 0.15
            );


        const scale =
            (
                20 +
                ratio * 240
            ) *
            pulse;


        z =
            (
                ratio - 0.5
            ) *
            320;


        const twist =
            ratio *
            twistFactor *
            1.6;


        const cosT =
            Math.cos(twist);

        const sinT =
            Math.sin(twist);


        x =
            (
                xNorm * cosT -
                yNorm * sinT
            ) *
            scale;


        y =
            (
                xNorm * sinT +
                yNorm * cosT
            ) *
            scale;
    }


    // ========================================================
    // MODO 1
    // ========================================================

    else if (manifoldMode === 1) {

        const majorRadius =
            145;


        const orbitalAngle =
            (
                ringIdx /
                numRings
            ) *
            Math.PI *
            2;


        const localSpin =
            orbitalAngle *
            twistFactor +
            timeStep * 0.02;


        const cosS =
            Math.cos(localSpin);

        const sinS =
            Math.sin(localSpin);


        const localScale =
            55 *
            (
                1 +
                0.15 *
                Math.sin(
                    timeStep * 0.1 +
                    orbitalAngle * 2
                )
            );


        const lx =
            (
                xNorm * cosS -
                yNorm * sinS
            ) *
            localScale;


        const ly =
            (
                xNorm * sinS +
                yNorm * cosS
            ) *
            localScale;


        x =
            (
                majorRadius +
                lx
            ) *
            Math.cos(
                orbitalAngle
            );


        y =
            (
                majorRadius +
                lx
            ) *
            Math.sin(
                orbitalAngle
            );


        z = ly;
    }


    // ========================================================
    // MODO 2
    // ========================================================

    else if (manifoldMode === 2) {

        const ratio =
            ringIdx / numRings;


        const orbitAngle =
            ratio *
            Math.PI *
            2 *
            3 +
            timeStep * 0.04;


        const distance =
            45 +
            ratio * 210;


        const hScale =
            12 +
            ratio * 45;


        const wave =
            35 *
            Math.sin(
                timeStep * 0.08 +
                ratio * Math.PI
            );


        x =
            distance *
            Math.cos(orbitAngle) +
            xNorm * hScale;


        y =
            distance *
            Math.sin(orbitAngle) +
            yNorm * hScale;


        z =
            wave +
            (
                ratio - 0.5
            ) *
            160;
    }


    // ========================================================
    // MODO 3
    // ========================================================

    else {

        const ratio =
            ringIdx / numRings;


        const wavePhase =
            ratio *
            Math.PI *
            2 *
            1.8 -
            timeStep * 0.08;


        const hScale =
            44 *
            (
                1.1 +
                0.3 *
                Math.sin(wavePhase)
            );


        x =
            (
                ratio - 0.5
            ) *
            520;


        y =
            130 *
            Math.sin(wavePhase) +
            yNorm * hScale;


        z =
            xNorm * hScale;
    }


    return {
        x,
        y,
        z
    };
}


// ============================================================
// ROTAÇÃO 3D + PROJEÇÃO
// ============================================================

function rotateAndProject3D(
    x,
    y,
    z,
    ax,
    ay,
    az
) {

    // YAW

    const cosY =
        Math.cos(ay);

    const sinY =
        Math.sin(ay);


    const x1 =
        x * cosY -
        z * sinY;


    const z1 =
        x * sinY +
        z * cosY;


    // PITCH

    const cosX =
        Math.cos(ax);

    const sinX =
        Math.sin(ax);


    const y2 =
        y * cosX -
        z1 * sinX;


    const z2 =
        y * sinX +
        z1 * cosX;


    // ROLL

    const cosZ =
        Math.cos(az);

    const sinZ =
        Math.sin(az);


    const x3 =
        x1 * cosZ -
        y2 * sinZ;


    const y3 =
        x1 * sinZ +
        y2 * cosZ;


    const clipPlane =
        320;


    const denominator =
        z2 + clipPlane;


    if (denominator <= 5) {

        return null;
    }


    const perspectiveFactor =
        cameraDistance /
        denominator;


    return {

        x:
            x3 *
            perspectiveFactor,

        y:
            y3 *
            perspectiveFactor,

        z:
            z2,

        scale:
            perspectiveFactor
    };
}


// ============================================================
// DESENHAR FUNDO
// ============================================================

function drawBackground() {

    ctx.fillStyle =
        "#040008";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );
}


// ============================================================
// EFEITO DE BRILHO
// ============================================================

function drawGlow() {

    const pulse =
        1 +
        Math.sin(
            masterTime *
            0.15
        ) *
        0.08;


    const radius =
        180 *
        pulse;


    const gradient =
        ctx.createRadialGradient(
            width / 2,
            height / 2,
            0,
            width / 2,
            height / 2,
            radius
        );


    gradient.addColorStop(
        0,
        "rgba(255, 10, 84, 0.055)"
    );


    gradient.addColorStop(
        0.35,
        "rgba(190, 20, 110, 0.025)"
    );


    gradient.addColorStop(
        1,
        "rgba(4, 0, 8, 0)"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );
}


// ============================================================
// CORAÇÃO
// ============================================================

function drawHeart() {

    const trailResolution =
        36;


    const centerX =
        width / 2;


    const centerY =
        height / 2;


    const rings = [];


    // --------------------------------------------------------
    // Primeiro calculamos todos os anéis
    // --------------------------------------------------------

    for (
        let ringIdx = 0;
        ringIdx < numRings;
        ringIdx++
    ) {

        const points = [];


        for (
            let i = 0;
            i <= trailResolution;
            i++
        ) {

            const theta =
                (
                    i *
                    Math.PI *
                    2
                ) /
                trailResolution;


            const point =
                calculate3DHeartPoint(
                    theta,
                    ringIdx,
                    masterTime
                );


            const projected =
                rotateAndProject3D(
                    point.x,
                    point.y,
                    point.z,
                    rotX,
                    rotY,
                    rotZ
                );


            if (projected) {

                points.push({
                    x:
                        projected.x +
                        centerX,

                    y:
                        projected.y +
                        centerY,

                    z:
                        projected.z,

                    scale:
                        projected.scale
                });
            }
        }


        rings.push(points);
    }


    // --------------------------------------------------------
    // Desenho dos anéis
    // --------------------------------------------------------

    for (
        let ringIdx = 0;
        ringIdx < rings.length;
        ringIdx++
    ) {

        const points =
            rings[ringIdx];


        if (
            points.length < 2
        ) {
            continue;
        }


        for (
            let i = 1;
            i < points.length;
            i++
        ) {

            const current =
                points[i];


            const previous =
                points[i - 1];


            // ------------------------------------------------
            // Limite de tela
            // ------------------------------------------------

            if (
                Math.abs(
                    current.x -
                    centerX
                ) > 500 ||
                Math.abs(
                    current.y -
                    centerY
                ) > 500 ||
                Math.abs(
                    previous.x -
                    centerX
                ) > 500 ||
                Math.abs(
                    previous.y -
                    centerY
                ) > 500
            ) {

                continue;
            }


            // ------------------------------------------------
            // Cor pela profundidade
            // ------------------------------------------------

            const color =
                getHolographicLoveColor(
                    paletteIdx,
                    current.z,
                    masterTime * 0.02
                );


            const normalizedDepth =
                (
                    current.z + 160
                ) /
                320;


            const depth =
                Math.max(
                    0.15,
                    Math.min(
                        1,
                        normalizedDepth
                    )
                );


            const lineWidth =
                Math.max(
                    0.6,
                    depth * 3.8
                );


            const alpha =
                0.35 +
                depth * 0.65;


            ctx.beginPath();


            ctx.moveTo(
                previous.x,
                previous.y
            );


            ctx.lineTo(
                current.x,
                current.y
            );


            ctx.strokeStyle =
                `rgba(
                    ${color.r},
                    ${color.g},
                    ${color.b},
                    ${alpha}
                )`;


            ctx.lineWidth =
                lineWidth;


            ctx.shadowBlur =
                depth > 0.65
                    ? 5
                    : 0;


            ctx.shadowColor =
                `rgb(
                    ${color.r},
                    ${color.g},
                    ${color.b}
                )`;


            ctx.stroke();
        }
    }


    ctx.shadowBlur = 0;
}


// ============================================================
// HUD
// ============================================================

function updateHUD() {

    document.getElementById(
        "modeText"
    ).textContent =
        modes[manifoldMode];


    document.getElementById(
        "ringsText"
    ).textContent =
        numRings;


    document.getElementById(
        "speedText"
    ).textContent =
        heartBeatSpeed.toFixed(1);


    document.getElementById(
        "twistText"
    ).textContent =
        twistFactor.toFixed(2);


    document.getElementById(
        "paletteText"
    ).textContent =
        palettes[paletteIdx];


    document.getElementById(
        "pitchText"
    ).textContent =
        radiansToDegrees(rotX).toFixed(1)
        + "°";


    document.getElementById(
        "yawText"
    ).textContent =
        radiansToDegrees(rotY).toFixed(1)
        + "°";


    document.getElementById(
        "rollText"
    ).textContent =
        radiansToDegrees(rotZ).toFixed(1)
        + "°";
}


function radiansToDegrees(
    radians
) {

    return radians *
        180 /
        Math.PI;
}


// ============================================================
// PAUSA
// ============================================================

function togglePause() {

    isPaused =
        !isPaused;


    const indicator =
        document.getElementById(
            "pauseIndicator"
        );


    const statusText =
        document.getElementById(
            "statusText"
        );


    const statusLight =
        document.getElementById(
            "statusLight"
        );


    if (isPaused) {

        indicator.classList.remove(
            "hidden"
        );


        statusText.textContent =
            "QUANTUM CORE HALTED";


        statusLight.style.background =
            "#555";


        statusLight.style.boxShadow =
            "none";
    }


    else {

        indicator.classList.add(
            "hidden"
        );


        statusText.textContent =
            "QUANTUM CORE ONLINE";


        statusLight.style.background =
            "#ff0a54";


        statusLight.style.boxShadow =
            `
                0 0 5px #ff0a54,
                0 0 15px #ff0a54
            `;
    }
}


// ============================================================
// TECLADO
// ============================================================

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();


        // ---------------------------------------------
        // SPACE
        // ---------------------------------------------

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            togglePause();

            return;
        }


        // ---------------------------------------------
        // ESC
        // ---------------------------------------------

        if (
            event.key ===
            "Escape"
        ) {

            togglePause();

            return;
        }


        // ---------------------------------------------
        // NÃO ALTERAR PARÂMETROS PAUSADO
        // ---------------------------------------------

        if (isPaused) {
            return;
        }


        // ---------------------------------------------
        // VELOCIDADE
        // ---------------------------------------------

        if (
            event.key ===
            "ArrowUp"
        ) {

            heartBeatSpeed =
                Math.min(
                    10.0,
                    heartBeatSpeed +
                    0.2
                );
        }


        if (
            event.key ===
            "ArrowDown"
        ) {

            heartBeatSpeed =
                Math.max(
                    0.2,
                    heartBeatSpeed -
                    0.2
                );
        }


        // ---------------------------------------------
        // ANÉIS
        // ---------------------------------------------

        if (
            event.key ===
            "ArrowRight"
        ) {

            numRings =
                Math.min(
                    35,
                    numRings + 1
                );
        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            numRings =
                Math.max(
                    5,
                    numRings - 1
                );
        }


        // ---------------------------------------------
        // TWIST
        // ---------------------------------------------

        if (
            key === "w"
        ) {

            twistFactor =
                Math.min(
                    4.0,
                    twistFactor + 0.1
                );
        }


        if (
            key === "s"
        ) {

            twistFactor =
                Math.max(
                    0.0,
                    twistFactor - 0.1
                );
        }


        // ---------------------------------------------
        // MODO
        // ---------------------------------------------

        if (
            key === "m"
        ) {

            manifoldMode =
                (
                    manifoldMode + 1
                ) % 4;
        }


        // ---------------------------------------------
        // PALETA
        // ---------------------------------------------

        if (
            key === "c"
        ) {

            paletteIdx =
                (
                    paletteIdx + 1
                ) % 4;
        }


        updateHUD();
    }
);


// ============================================================
// ANIMAÇÃO
// ============================================================

let previousTime =
    performance.now();


function animationLoop(
    currentTime
) {

    requestAnimationFrame(
        animationLoop
    );


    if (isPaused) {

        previousTime =
            currentTime;

        return;
    }


    const delta =
        Math.min(
            50,
            currentTime -
            previousTime
        );


    previousTime =
        currentTime;


    // --------------------------------------------------------
    // ROTAÇÃO
    // --------------------------------------------------------

    rotX +=
        0.009 *
        (delta / 16.666);


    rotY +=
        0.013 *
        (delta / 16.666);


    rotZ +=
        0.007 *
        (delta / 16.666);


    // --------------------------------------------------------
    // TEMPO
    // --------------------------------------------------------

    masterTime +=
        heartBeatSpeed *
        (delta / 16.666);


    // --------------------------------------------------------
    // DESENHO
    // --------------------------------------------------------

    drawBackground();

    drawGlow();

    drawHeart();

    updateHUD();
}


// ============================================================
// INICIAR
// ============================================================

updateHUD();

requestAnimationFrame(
    animationLoop
);
