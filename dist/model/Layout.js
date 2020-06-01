"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var LayoutSchema = new mongoose_1.Schema({
    logo: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/appgain/image/upload/v1534373384/appgain/logo.png"
    },
    logoStyle: {
        type: String,
        required: true,
        default: "flexible"
    },
    title: {
        type: String,
        required: true,
        default: "Appgain Blog"
    },
    titleColor: {
        type: String,
        required: true,
        default: "red"
    },
    titleBgColor: {
        type: String,
        required: true,
        default: "#ddd"
    },
    slides: {
        type: Array,
        required: true,
        default: []
    }
});
var LayoutModel = mongoose_1.model('Layout', LayoutSchema);
// LayoutModel.find((err,docs)=>{
//     if(docs && docs.length < 1){
//         let seed:ILayout  = new LayoutModel({
//             logo:"https://res.cloudinary.com/appgain/image/upload/v1534373384/appgain/logo.png",
//             logoStyle: "flexible",
//             title: "Appgain Blog",
//             titleColor:"red",
//             titleBgColor:"#ddd",
//             slides: [
//                 {
//                     src: "/slider/hongkonga1280x800.jpg",
//                     altText: "hongkonga1280x800.jpg"
//                 },
//                 {
//                     src: "/slider/nyc1280x800.jpg",
//                     altText: "nyc1280x800.jpg"
//                 }
//             ]
//         })
//         seed.save()
//     }
// });
exports.default = LayoutModel;
