"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var layout_controller_1 = require("../controller/Layout/layout.controller");
var Validations_1 = require("../controller/Layout/Validations");
var router = express_1.Router();
router.route('/')
    .get(layout_controller_1.InitLayout)
    .put(Validations_1.LayoutValidation, layout_controller_1.UpdateLayout);
exports.default = router;
