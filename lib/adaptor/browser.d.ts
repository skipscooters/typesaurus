/**
 * Browser Firestore adaptor.
 */
import * as firebase from 'firebase/app'
import 'firebase/firestore'
export default function store(): firebase.firestore.Firestore
export declare type FirestoreQuery = firebase.firestore.Query
export declare type FirestoreDocumentReference = firebase.firestore.DocumentReference
export declare const FirestoreDocumentReference: typeof firebase.firestore.DocumentReference
export declare type FirestoreDocumentData = firebase.firestore.DocumentData
export declare type FirestoreTimestamp = firebase.firestore.Timestamp
export declare const FirestoreTimestamp: typeof firebase.firestore.Timestamp
export declare type FirestoreCollectionReference = firebase.firestore.CollectionReference
export declare type FirestoreOrderByDirection = firebase.firestore.OrderByDirection
export declare type FirestoreWhereFilterOp = firebase.firestore.WhereFilterOp
export declare type FirestoreTransaction = firebase.firestore.Transaction
export declare const FirestoreFieldValue: typeof firebase.firestore.FieldValue
export declare type FirebaseWriteBatch = firebase.firestore.WriteBatch
