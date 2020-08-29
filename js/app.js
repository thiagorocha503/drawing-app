"use strict";
var Paint = /** @class */ (function () {
    function Paint(canvas) {
        this.drawn = false;
        this.color = "black";
        this.lineWidth = 1;
        this.canvas = canvas;
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
    }
    Paint.prototype.onMouseDown = function (evt) {
        var _a;
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.moveTo(evt.clientX - this.canvas.offsetLeft, evt.clientY - this.canvas.offsetTop);
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
var canvas = document.getElementById("canvas");
var app = new Paint(canvas);
