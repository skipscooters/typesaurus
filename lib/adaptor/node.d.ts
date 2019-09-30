/**
 * Node.js Firestore adaptor.
 */
import * as firestore from '@google-cloud/firestore'
import * as admin from 'firebase-admin'
export default function store(): firestore.Firestore
export declare type FirestoreQuery = admin.firestore.Query
export declare type FirestoreDocumentReference = admin.firestore.DocumentReference
export declare const FirestoreDocumentReference: typeof firestore.DocumentReference
export declare type FirestoreDocumentData = admin.firestore.DocumentData
export declare type FirestoreTimestamp = admin.firestore.Timestamp
export declare const FirestoreTimestamp: typeof firestore.Timestamp
export declare const FirestoreFieldValue: typeof firestore.FieldValue
export declare type FirebaseWriteBatch = admin.firestore.WriteBatch
export declare type FirestoreCollectionReference = admin.firestore.CollectionReference
export declare type FirestoreTransaction = admin.firestore.Transaction
export declare type FirestoreOrderByDirection = firestore.OrderByDirection
export declare type FirestoreWhereFilterOp = firestore.WhereFilterOp
