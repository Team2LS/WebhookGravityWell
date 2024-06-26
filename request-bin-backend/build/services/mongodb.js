"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayloads = exports.getPayloadById = exports.savePayload = void 0;
const mongoose = __importStar(require("mongoose"));
const payloadSchema = new mongoose.Schema({ payloadData: {}, headers: {} });
const Payload = mongoose.model('Payload', payloadSchema);
mongoose.connect('mongodb://127.0.0.1:27017/rhh?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.3');
function savePayload(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = new Payload({ "payloadData": req.body, "headers": req.headers });
        return payload.save().then((result) => {
            console.log('payload saved!');
            return result._id.toString();
        });
    });
}
exports.savePayload = savePayload;
function getPayloadById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Payload.findById(id);
        if (result === null) {
            return null;
        }
        return {
            headers: result.headers,
            payload: result.payloadData
        };
    });
}
exports.getPayloadById = getPayloadById;
function getAllPayloads() {
    return __awaiter(this, void 0, void 0, function* () {
        const requests = yield Payload.find({});
        return requests;
    });
}
exports.getAllPayloads = getAllPayloads;
