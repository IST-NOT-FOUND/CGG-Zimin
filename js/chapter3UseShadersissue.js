var gl;
var shaderProgram; // программа шейдеров
var vertexBuffer; // буфер вершин
var indexBuffer; //буфер индексов
// установка шейдеров
function initShaders() {
    // получаем скрипты вершинного и фрагментного шейдеров
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');

    // создаем программу шейдеров
    shaderProgram = gl.createProgram();

    // прикрепляем к этой программе шейдеры
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    //связываем контекст WebGL с программой шейдеров
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Не удалось установить шейдеры");
    }
     // начинаем использовать программу шейдеров
    gl.useProgram(shaderProgram);

    // установка атрибута позиции вершин
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
}
// Функция создания шейдера - запускается для обоих шейдеров
function getShader(type,id) {
    // получаем текст программы
    var source = document.getElementById(id).innerHTML;
    // создаем шейдер
    var shader = gl.createShader(type);
    // связываем шейдер с текстом
    gl.shaderSource(shader, source);
    // компилируем шейдер
    gl.compileShader(shader);

    // если все скомпилировалось, возвращаем из функции шейдер
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
 // установка буферов вершин и индексов
function initBuffers() {

    vertices =[
            -0.8, 0.5, 0.0,
            -0.3,0.5,0.0,
            -0.8, 0.0, 0.0,
            -0.3, 0.0, 0.0,
            -0.8, -0.5,0.0,
            -0.3,-0.5,0.0,

             -0.2, -0.5, 0.0,
             -0.2,0.5,0.0,
             0.05, -0.05, 0.0,
             0.3, 0.5, 0.0,
             0.3,-0.5,0.0,


             0.35, -0.5, 0.0,
             0.6, 0.5, 0.0,
             0.85, -0.5, 0.0,

             0.475, 0.0, 0.0,
             0.725, 0.0, 0.0

                 ];

    indices = [0, 1, 1, 2, 2, 3, 3, 4,6,7,7,8,8,9,9,10,11,12,12,13,14,15];

  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  vertexBuffer.itemSize = 3;

  indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    indexBuffer.numberOfItems = indices.length;
}

function draw() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                         vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.LINES, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT,0);
}

window.onload=function(){

    var canvas = document.getElementById("canvas3D");
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

      if (!gl) {
        alert("Ваш браузер не поддерживает WebGL");
      }
    if(gl){
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        initShaders();

        initBuffers();

        draw();
    }
}
