import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";
import type { Product } from "../types/product";

type ProductInput = Omit<Product, "id">;

const productsCollection = collection(db, "products");

export async function getProducts() {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((productDoc) => ({
    id: productDoc.id,
    ...productDoc.data(),
  })) as Product[];
}

export async function createProduct(product: ProductInput) {
  await addDoc(productsCollection, product);
}

export async function updateProduct(id: string, product: ProductInput) {
  await updateDoc(doc(db, "products", id), product);
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, "products", id));
}
