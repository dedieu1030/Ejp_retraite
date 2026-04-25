import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Submission {
  id: string;
  providerId: string;
  name: string;
  age: string;
  city: string;
  serviceType: string;
  description: string;
  price: string;
  totalAmountRetirement: string;
  availableAmount: string;
  remainingAmount: string;
  availability: string;
  contact: string;
  createdAt: number;
}

interface DataState {
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, 'id' | 'createdAt'>) => void;
  updateSubmission: (id: string, submission: Partial<Submission>) => void;
  deleteSubmission: (id: string) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      submissions: [],
      addSubmission: (submission) => set((state) => ({
        submissions: [
          ...state.submissions,
          { 
            ...submission, 
            id: Math.random().toString(36).substring(7),
            createdAt: Date.now()
          }
        ]
      })),
      updateSubmission: (id, updated) => set((state) => ({
        submissions: state.submissions.map(sub => sub.id === id ? { ...sub, ...updated } : sub)
      })),
      deleteSubmission: (id) => set((state) => ({
        submissions: state.submissions.filter(sub => sub.id !== id)
      })),
    }),
    {
      name: 'data-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
