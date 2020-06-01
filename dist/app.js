"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var dotEnvConfig_1 = __importDefault(require("./dotEnvConfig"));
/**
 *
 */
var index_1 = __importDefault(require("./routes/index"));
var Application = /** @class */ (function () {
    function Application() {
        this.app = express_1.default();
        this.setting();
        this.middleWares();
        this.routes();
    }
    /**
     * Settings
     */
    Application.prototype.setting = function () {
        dotEnvConfig_1.default();
        this.app.set('port', process.env.PORT || 3000);
    };
    /**
     * middle wares
     */
    Application.prototype.middleWares = function () {
        this.app.use(cors_1.default());
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    };
    /**
     * routes
     */
    Application.prototype.routes = function () {
        this.app.use('/api/', index_1.default);
        /**
         * error handling
         */
    };
    /**
     * run
     */
    Application.prototype.start = function () {
        var _this = this;
        try {
            this.app.listen(this.app.get('port'), function () {
                console.log("<< server runing >> ", _this.app.get('port'));
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    return Application;
}());
exports.default = Application;
