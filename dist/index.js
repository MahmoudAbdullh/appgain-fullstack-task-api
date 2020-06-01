"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  run server  class
 */
var app_1 = __importDefault(require("./app"));
var database_1 = __importDefault(require("./database"));
var app = new app_1.default();
database_1.default();
app.start();
