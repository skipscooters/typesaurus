"use strict";
/**
 * Node.js Firestore adaptor.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
function store() {
    return admin.firestore();
}
exports.default = store;
exports.FirestoreDocumentReference = admin.firestore.DocumentReference;
exports.FirestoreTimestamp = admin.firestore.Timestamp;
exports.FirestoreFieldValue = admin.firestore.FieldValue;
//# sourceMappingURL=node.js.map