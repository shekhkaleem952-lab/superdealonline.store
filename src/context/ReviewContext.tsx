import React, { createContext, useContext, useState, useEffect } from 'react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data/storeData';

interface ReviewContextType {
  reviews: Review[];
  addReview: (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  getReviewsForItem: (itemId: string) => Review[];
  getItemRatingSummary: (itemId: string) => {
    average: number;
    count: number;
    distribution: { [key: number]: number };
  };
  markHelpful: (reviewId: string) => void;
}

const STORAGE_KEY = 'alnoor_customer_reviews_v1';

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse reviews from localStorage', e);
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      verifiedPurchase: true,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const getReviewsForItem = (itemId: string) => {
    return reviews.filter((r) => r.itemId === itemId);
  };

  const getItemRatingSummary = (itemId: string) => {
    const itemReviews = getReviewsForItem(itemId);
    if (itemReviews.length === 0) {
      // Default fallback rating if no reviews exist yet
      return {
        average: 4.8,
        count: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const totalScore = itemReviews.reduce((sum, r) => sum + r.rating, 0);
    const average = Math.round((totalScore / itemReviews.length) * 10) / 10;

    const distribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    itemReviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating)));
      distribution[star] = (distribution[star] || 0) + 1;
    });

    return {
      average,
      count: itemReviews.length,
      distribution,
    };
  };

  const markHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
      )
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getReviewsForItem,
        getItemRatingSummary,
        markHelpful,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};
