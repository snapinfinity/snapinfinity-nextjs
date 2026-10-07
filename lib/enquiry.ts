// Client-side enquiry delivery. Keeps the previous site's pipeline so the team's
// existing inbox keeps working: a Firestore document in `request` (same shape)
// plus an EmailJS notification. Both SDKs load only when someone submits.

export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  message: string;
  connectWith: string;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

async function saveToFirestore(data: Enquiry) {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) throw new Error("Firebase is not configured");
  const [{ initializeApp, getApps }, { getFirestore, collection, addDoc, updateDoc, Timestamp }] = await Promise.all([
    import("firebase/app"),
    import("firebase/firestore/lite"),
  ]);
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const ref = await addDoc(collection(db, "request"), {
    ...data,
    createdOn: Timestamp.now(),
    isSolved: false,
    isViewed: false,
  });
  await updateDoc(ref, { docId: ref.id });
}

async function sendEmail(data: Enquiry) {
  const { serviceId, templateId, publicKey } = emailjsConfig;
  if (!serviceId || !templateId || !publicKey) throw new Error("EmailJS is not configured");
  const emailjs = (await import("@emailjs/browser")).default;
  await emailjs.send(serviceId, templateId, { ...data }, { publicKey });
}

/** Resolves if at least one channel delivered the enquiry. */
export async function submitEnquiry(data: Enquiry) {
  const [saved, emailed] = await Promise.allSettled([saveToFirestore(data), sendEmail(data)]);
  if (saved.status === "rejected") console.error("Enquiry not saved:", saved.reason);
  if (emailed.status === "rejected") console.error("Enquiry email not sent:", emailed.reason);
  if (saved.status === "rejected" && emailed.status === "rejected") throw new Error("delivery-failed");
}
