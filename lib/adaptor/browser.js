"use strict";
/**
 * Browser Firestore adaptor.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = __importStar(require("firebase/app"));
require("firebase/firestore");
function store() {
    return firebase.firestore();
}
exports.default = store;
exports.FirestoreDocumentReference = firebase.firestore.DocumentReference;
exports.FirestoreTimestamp = firebase.firestore.Timestamp;
exports.FirestoreFieldValue = firebase.firestore.FieldValue;
//# sourceMappingURL=browser.js.map