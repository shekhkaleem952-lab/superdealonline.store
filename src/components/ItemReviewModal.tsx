import React, { useState } from 'react';
import { X, Star, ThumbsUp, CheckCircle, MessageSquarePlus, MessageCircle, Sparkles } from 'lucide-react';
import { StarRating } from './StarRating';
import { useReviews } from '../context/ReviewContext';

interface ItemReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    nameArabic?: string;
    image: string;
    description?: string;
    category?: string;
    price?: number;
  } | null;
}

export const ItemReviewModal: React.FC<ItemReviewModalProps> = ({ isOpen, onClose, item }) => {
  const { getReviewsForItem, getItemRatingSummary, addReview, markHelpful } = useReviews();

  const [activeTab, setActiveTab] = useState<'reviews' | 'write'>('reviews');
  const [starFilter, setStarFilter] = useState<number | null>(null);

  // Form State
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen || !item) return null;

  const itemReviews = getReviewsForItem(item.id);
  const ratingSummary = getItemRatingSummary(item.id);

  const filteredReviews = starFilter
    ? itemReviews.filter((r) => Math.round(r.rating) === starFilter)
    : itemReviews;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    setSubmitting(true);

    setTimeout(() => {
      addReview({
        itemId: item.id,
        author: author.trim(),
        rating,
        comment: comment.trim(),
      });

      setSubmitting(false);
      setSubmittedSuccess(true);
      setAuthor('');
      setComment('');
      setRating(5);

      setTimeout(() => {
        setSubmittedSuccess(false);
        setActiveTab('reviews');
      }, 1500);
    }, 400);
  };

  const formattedPrice = item.price ? `${item.price} QAR` : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn font-sans">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0057FF] to-blue-900 text-white flex items-center justify-between border-b border-blue-400/30 relative">
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-sm bg-white"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-white leading-tight">
                  {item.name}
                </h3>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-blue-100">
                {formattedPrice && (
                  <span className="font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/20">
                    {formattedPrice}
                  </span>
                )}
                <StarRating rating={ratingSummary.average} size="xs" />
                <span>({ratingSummary.count} reviews)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switching Bar */}
        <div className="flex border-b border-gray-100 bg-gray-50/80 p-1">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-white text-[#0057FF] shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-[#0057FF]" />
            Customer Reviews ({ratingSummary.count})
          </button>
          <button
            onClick={() => setActiveTab('write')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'write'
                ? 'bg-[#0057FF] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#0057FF]'
            }`}
          >
            <MessageSquarePlus className="w-4 h-4" />
            Write a Review
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'reviews' ? (
            <>
              {/* Overall Rating & Breakdown Card */}
              <div className="p-5 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl border border-gray-200/80 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 text-center sm:text-left border-b sm:border-b-0 sm:border-r border-gray-200 pb-4 sm:pb-0 sm:pr-4">
                  <div className="text-4xl font-extrabold text-slate-900 font-playfair flex items-center justify-center sm:justify-start gap-2">
                    {ratingSummary.average.toFixed(1)}
                    <span className="text-base font-normal text-gray-400">/ 5</span>
                  </div>
                  <div className="mt-1">
                    <StarRating rating={ratingSummary.average} size="md" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    Based on {ratingSummary.count} verified ratings
                  </p>
                </div>

                <div className="sm:col-span-7 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const starCount = ratingSummary.distribution[star] || 0;
                    const percentage =
                      ratingSummary.count > 0
                        ? Math.round((starCount / ratingSummary.count) * 100)
                        : 0;

                    return (
                      <button
                        key={star}
                        onClick={() =>
                          setStarFilter(starFilter === star ? null : star)
                        }
                        className={`w-full flex items-center gap-2 text-xs transition-opacity cursor-pointer ${
                          starFilter === star ? 'opacity-100 font-bold' : 'hover:opacity-80'
                        }`}
                      >
                        <span className="w-6 text-right font-medium text-gray-700">
                          {star}★
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0057FF] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-gray-500 text-[11px]">
                          {starCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Notice */}
              {starFilter !== null && (
                <div className="flex items-center justify-between bg-blue-50 text-[#0057FF] px-3.5 py-2 rounded-xl text-xs font-semibold">
                  <span>Showing {starFilter}-star reviews</span>
                  <button
                    onClick={() => setStarFilter(null)}
                    className="underline hover:text-blue-800 cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Star className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-900">No reviews found</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Be the first customer to leave a review for this item!
                    </p>
                    <button
                      onClick={() => setActiveTab('write')}
                      className="mt-3 px-4 py-2 bg-[#0057FF] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Write First Review
                    </button>
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 shadow-2xs transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#0057FF] text-white font-bold text-xs flex items-center justify-center">
                            {rev.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-slate-900">
                                {rev.author}
                              </span>
                              {rev.verifiedPurchase && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-200">
                                  <CheckCircle className="w-2.5 h-2.5" /> Verified Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400">
                              {rev.date}
                            </span>
                          </div>
                        </div>

                        <StarRating rating={rev.rating} size="xs" />
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-1">
                        "{rev.comment}"
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-gray-50 text-[11px] text-gray-500">
                        <span>Was this review helpful?</span>
                        <button
                          onClick={() => markHelpful(rev.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-[#0057FF] transition-colors cursor-pointer font-medium"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          Helpful ({rev.helpfulCount || 0})
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            /* Write Review Form */
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {submittedSuccess ? (
                <div className="text-center py-12 space-y-3 bg-blue-50 rounded-2xl border border-blue-200 p-6 animate-fadeIn">
                  <div className="w-12 h-12 bg-[#0057FF] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 font-playfair">
                    Review Submitted Successfully!
                  </h4>
                  <p className="text-xs text-gray-600">
                    Thank you for sharing your experience with Super Deal Online.Store.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#0057FF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Share Your Review
                      </h4>
                      <p className="text-[11px] text-gray-600">
                        Your honest opinion helps shoppers across Qatar choose the right product.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700">
                      Overall Rating *
                    </label>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                      <StarRating
                        rating={rating}
                        interactive
                        size="lg"
                        onRatingChange={(newRating) => setRating(newRating)}
                      />
                      <span className="text-xs font-bold text-[#0057FF]">
                        {rating === 5 && '★★★★★ Excellent'}
                        {rating === 4 && '★★★★ Very Good'}
                        {rating === 3 && '★★★ Good'}
                        {rating === 2 && '★★ Fair'}
                        {rating === 1 && '★ Poor'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700">
                      Your Name / Nickname *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Tariq K. (Doha)"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF] bg-white shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700">
                      Your Review & Comments *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Describe build quality, delivery speed, battery life, or sound..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0057FF] bg-white shadow-2xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-[#0057FF] text-white font-extrabold text-xs rounded-xl shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Publishing Review...' : 'Post Customer Review'}
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
