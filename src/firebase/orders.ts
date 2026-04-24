import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  type Timestamp,
  query,
  where,
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
  const ordersQuery = query(ordersCollection, where("userId", "==", userId));

  const snapshot = await getDocs(ordersQuery);

  const orders = snapshot.docs.map((orderDoc) => ({
    id: orderDoc.id,
    ...orderDoc.data(),
  })) as Order[];

  return orders.sort((firstOrder, secondOrder) => {
    const firstSeconds = firstOrder.createdAt?.seconds ?? 0;
    const secondSeconds = secondOrder.createdAt?.seconds ?? 0;

    return secondSeconds - firstSeconds;
  });
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
