"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryUploader = exports.MulterUploader = void 0;
var multer_1 = __importDefault(require("multer"));
var cloudinary_1 = __importDefault(require("cloudinary"));
var MulterUploader = /** @class */ (function () {
    function MulterUploader(fieldName) {
        this.fieldName = fieldName || 'files';
    }
    MulterUploader.prototype.storage = function () {
        return multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                var ext = file.originalname.split(".").pop();
                cb(null, file.fieldname + '-' + Date.now() + "." + ext);
            }
        });
    };
    MulterUploader.prototype.Upload = function () {
        return multer_1.default({ storage: this.storage(), preservePath: true }).fields([{ name: this.fieldName }, { name: "logo" }]); //(this.fieldName)
    };
    return MulterUploader;
}());
exports.MulterUploader = MulterUploader;
var CloudinaryUploader = /** @class */ (function () {
    function CloudinaryUploader(config, upload_preset) {
        this.config = config;
        this.cloudinary = cloudinary_1.default.v2;
        this.upload_preset = upload_preset || "appgain_task";
        this.Setup();
    }
    CloudinaryUploader.prototype.Setup = function () {
        this.cloudinary.config(this.config);
    };
    /**
     *
     */
    CloudinaryUploader.prototype.UploadArray = function (files) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var length = files.length;
            var uploadedFiles = [];
            files.map(function (file, idx) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.cloudinary.uploader.upload(file.path, { upload_preset: this.upload_preset
                            }).then(function (result) {
                                uploadedFiles.push({
                                    src: result.secure_url,
                                    altText: file.originalname
                                });
                                if (idx + 1 === length) {
                                    //return result
                                    return resolve(uploadedFiles);
                                }
                            }).catch(function (error) {
                                return reject(error);
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        })
            .then(function (result) { return result; })
            .catch(function (error) { return error; });
    };
    /**
     *
     */
    CloudinaryUploader.prototype.UploadSingle = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cloudinary.uploader.upload(file.path, { upload_preset: _this.upload_preset }, function (error, result) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (result) {
                        return [2 /*return*/, resolve(result.secure_url)];
                    }
                    if (error) {
                        return [2 /*return*/, reject(error)];
                    }
                    return [2 /*return*/];
                });
            }); }).catch(function (error) {
                return reject(error);
            });
        })
            .then(function (result) { return result; })
            .catch(function (error) { return error; });
    };
    return CloudinaryUploader;
}());
exports.CloudinaryUploader = CloudinaryUploader;
