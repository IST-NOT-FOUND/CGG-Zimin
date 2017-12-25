var gl;
var shaderProgram;
var vertexBuffer;
var colorBuffer;
var v1r = 1.0, v1g = 0.0, v1b = 0.0,
    v2r = 0.0, v2g = 1.0, v2b = 0.0,
    v3r = 0.0, v3g = 0.0, v3b = 1.0

function initShaders() {
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'varying highp vec4 vColor;void main(void) {gl_FragColor = vColor;}');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'attribute vec3 aVertexPosition;attribute vec3 aVertexColor;varying highp vec4 vColor;void main(void) {gl_Position = vec4(aVertexPosition, 1.0);vColor = vec4(aVertexColor, 1.0);}');

    shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("РќРµ СѓРґР°Р»РѕСЃСЊ СѓСЃС‚Р°РЅРѕРІРёС‚СЊ С€РµР№РґРµСЂС‹");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
}

function getShader(type, shader) {
    var source = shader;

    var shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("смена цветов: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initBuffers() {

var vertices = [
        0.0,  0.5,  0.0,
        -0.5, -0.5,  0.0,
         0.5, -0.5,  0.0
  ];

  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  vertexBuffer.itemSize = 3;
  vertexBuffer.numberOfItems = 3;
  var СЃolors = [
        v1r, v1g, v1b,
        v2r, v2g, v2b,
        v3r, v3g, v3b
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(СЃolors), gl.STATIC_DRAW);
}
function draw() {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                         vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
                        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}

window.onload=function(){

    var canvas = document.getElementById("canvas3D");
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

      if (!gl) {
        alert("Р’Р°С€ Р±СЂР°СѓР·РµСЂ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚ WebGL");
      }
    if(gl){
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        initShaders();

        initBuffers();

        draw();
    }
}
function colorReplacement(){
	var vtr = v3r;
	var vtg = v3g;
	var vtb = v3b;
	v3r = v2r;
	v3g = v2g;
	v3b = v2b;
	v2r = v1r;
	v2g = v1g;
	v2b = v1b;
	v1r = vtr;
	v1g = vtg;
	v1b = vtb;

        initShaders();

        initBuffers();

        draw();
}
