"use strict";
var _a;
var Paint = /** @class */ (function () {
    function Paint(canvas, colorPalette, lines) {
        this.drawn = false;
        this.color = "black";
        this.lineWidth = 1;
        this.canvas = canvas;
        this.colorPalette = colorPalette;
        this.lines = lines;
        var context = this.canvas.getContext("2d");
        if (context == null) {
            throw "Canvas null";
        }
        this.context = context;
        var self = this;
        // set canvas event
        this.canvas.addEventListener("mousedown", function (evt) {
            self.onMouseDown(evt);
        });
        this.canvas.addEventListener("mousemove", function (evt) {
            self.onMouseMove(evt);
        });
        this.canvas.addEventListener("mouseup", function (evt) {
            self.onMouseUp(evt);
        });
        var _loop_1 = function (i) {
            colorPalette[i].addEventListener("click", function (evt) {
                var color = colorPalette[i].style.backgroundColor;
                if (color != null) {
                    self.changeCurrentColor(color);
                }
            });
        };
        for (var i = 0; i < this.colorPalette.length; i++) {
            _loop_1(i);
        }
        var _loop_2 = function (i) {
            this_1.lines[i].addEventListener("click", function (evt) {
                var lineWidth = lines[i].getAttribute("lineWidth");
                if (lineWidth != null) {
                    self.changeWithLine(parseInt(lineWidth));
                }
                // set selection
                for (var j = 0; j < lines.length; j++) {
                    lines[j].classList.remove("active-line");
                }
                lines[i].classList.add("active-line");
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.lines.length; i++) {
            _loop_2(i);
        }
    }
    Paint.prototype.changeWithLine = function (lineWidth) {
        this.lineWidth = lineWidth;
    };
    Paint.prototype.changeCurrentColor = function (color) {
        var primaryColor = document.getElementById("primary-color");
        if (primaryColor != null) {
            primaryColor.style.backgroundColor = color;
        }
        this.color = color;
    };
    Paint.prototype.onMouseDown = function (evt) {
        var _a, _b;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.beginPath();
        (_b = this.context) === null || _b === void 0 ? void 0 : _b.moveTo(evt.clientX - this.canvas.offsetLeft, evt.clientY - this.canvas.offsetTop);
        this.drawn = true;
    };
    Paint.prototype.onMouseMove = function (evt) {
        var _a, _b;
        if (this.drawn) {
            (_a = this.context) === null || _a === void 0 ? void 0 : _a.lineTo(evt.clientX - this.canvas.offsetLeft, evt.clientY - this.canvas.offsetTop);
            this.context.strokeStyle = "" + this.color;
            this.context.lineWidth = this.lineWidth;
            (_b = this.context) === null || _b === void 0 ? void 0 : _b.stroke();
        }
    };
    Paint.prototype.onMouseUp = function (evt) {
        this.drawn = false;
    };
    return Paint;
}());
var lines = (_a = document.getElementById("line-option")) === null || _a === void 0 ? void 0 : _a.children;
var colorPick = document.getElementsByClassName("color");
var canvas = document.getElementById("canvas");
var app = new Paint(canvas, colorPick, lines);
