import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { CartItem } from "../store/cartSlice";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalProducts: number;
  totalPrice: number;
  createdAt?: Timestamp | null;
}

interface CreateOrderInput {
  userId: string;
  items: CartItem[];
  totalProducts: number;
  totalPrice: number;
}

const ordersCollection = collection(db, "orders");

export async function createOrder(order: CreateOrderInput) {
  await addDoc(ordersCollection, {
    ...order,
    createdAt: serverTimestamp(),
  });
}

export async function getUserOrders(userId: string) {
  const ordersQuery = query(
    ordersCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((orderDoc) => ({
    id: orderDoc.id,
    ...orderDoc.data(),
  })) as Order[];
}

export async function getOrderById(orderId: string) {
  const orderDoc = await getDoc(doc(db, "orders", orderId));

  if (!orderDoc.exists()) {
    throw new Error("Order not found.");
  }

  return {
    id: orderDoc.id,
    ...orderDoc.data(),
  } as Order;
}
