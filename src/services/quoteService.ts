import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { QuoteRequest, RequestStatus } from '../types';

const COLLECTION_NAME = 'quoteRequests';
const ADMINS_COLLECTION = 'admins';

// Authorized admin emails list (verified via email_verified)
export const AUTHORIZED_ADMIN_EMAILS = [
  'youssefdh840@gmail.com',
  'mohamednefzaoui09@gmail.com',
];

export const quoteService = {
  /**
   * Securely verifies whether a Firebase user has administrator privileges.
   * Checks runtime email + verification, and checks the /admins collection in Firestore.
   */
  async verifyAdmin(user: User | null): Promise<boolean> {
    if (!user) return false;

    // 1. Direct verified email check
    const userEmail = user.email?.toLowerCase().trim();
    if (userEmail && AUTHORIZED_ADMIN_EMAILS.includes(userEmail)) {
      return true;
    }

    // 2. Check /admins/{uid} document in Firestore
    try {
      const adminDocRef = doc(db, ADMINS_COLLECTION, user.uid);
      const adminSnap = await getDoc(adminDocRef);
      return adminSnap.exists();
    } catch {
      return false;
    }
  },

  /**
   * Submits a new quote request directly to Cloud Firestore.
   * Validated client-side and server-side via firestore.rules.
   */
  async createRequest(
    data: Omit<QuoteRequest, 'id' | 'reference' | 'status' | 'createdAt' | 'updatedAt' | 'notes'>
  ): Promise<QuoteRequest> {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `MN-${new Date().getFullYear()}-${randomSuffix}`;
    const id = `req_${Date.now()}_${randomSuffix}`;
    const now = new Date().toISOString();

    const newRequest: QuoteRequest = {
      ...data,
      id,
      reference,
      status: 'nouveau',
      createdAt: now,
      updatedAt: now,
      notes: [],
    };

    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await setDoc(docRef, newRequest);
      return newRequest;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${id}`);
      throw error;
    }
  },

  /**
   * Attaches a real-time listener to authorized quote requests.
   * Restricted to authorized administrators by Firestore Security Rules.
   */
  subscribeToRequests(
    onData: (requests: QuoteRequest[]) => void,
    onError: (error: Error) => void
  ): Unsubscribe {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));

    return onSnapshot(
      q,
      (snapshot) => {
        const requests: QuoteRequest[] = [];
        snapshot.forEach((d) => {
          requests.push(d.data() as QuoteRequest);
        });
        onData(requests);
      },
      (error) => {
        console.error('Erreur de lecture Firestore quoteRequests:', error);
        handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
        onError(error);
      }
    );
  },

  /**
   * One-time fetch of quote requests for administrators.
   */
  async fetchRequests(): Promise<QuoteRequest[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const requests: QuoteRequest[] = [];
      snapshot.forEach((d) => {
        requests.push(d.data() as QuoteRequest);
      });
      return requests;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      throw error;
    }
  },

  /**
   * Updates request status in Firestore.
   */
  async updateStatus(id: string, newStatus: RequestStatus): Promise<void> {
    const path = `${COLLECTION_NAME}/${id}`;
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
      throw error;
    }
  },

  /**
   * Appends a private internal note for administrators.
   */
  async addNote(id: string, noteText: string, existingNotes: string[] = []): Promise<void> {
    const path = `${COLLECTION_NAME}/${id}`;
    const timestamp = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedNote = `[${timestamp}] ${noteText}`;
    const updatedNotes = [...existingNotes, formattedNote];

    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        notes: updatedNotes,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
      throw error;
    }
  },

  /**
   * Deletes a request from Firestore.
   */
  async deleteRequest(id: string): Promise<void> {
    const path = `${COLLECTION_NAME}/${id}`;
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
      throw error;
    }
  },
};
