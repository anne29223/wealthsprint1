import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { UserBookmark } from "@shared/schema";

// API functions
const fetchUserBookmarks = async (): Promise<UserBookmark[]> => {
  const response = await fetch("/api/bookmarks", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch bookmarks");
  }
  return response.json();
};

const checkBookmarkStatus = async (strategyId: string): Promise<{ isBookmarked: boolean }> => {
  const response = await fetch(`/api/bookmarks/${strategyId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to check bookmark status");
  }
  return response.json();
};

const addBookmark = async (strategyId: string): Promise<UserBookmark> => {
  const response = await apiRequest("POST", `/api/bookmarks/${strategyId}`);
  return response.json();
};

const removeBookmark = async (strategyId: string): Promise<void> => {
  await apiRequest("DELETE", `/api/bookmarks/${strategyId}`);
};

// Custom hooks
export function useUserBookmarks() {
  return useQuery({
    queryKey: ["/api/bookmarks"],
    queryFn: fetchUserBookmarks,
  });
}

export function useBookmarkStatus(strategyId: string) {
  return useQuery({
    queryKey: ["/api/bookmarks", strategyId],
    queryFn: () => checkBookmarkStatus(strategyId),
    enabled: !!strategyId,
  });
}

export function useAddBookmark() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addBookmark,
    onSuccess: (_, strategyId) => {
      // Invalidate both the bookmarks list and individual bookmark status
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks", strategyId] });
    },
  });
}

export function useRemoveBookmark() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeBookmark,
    onSuccess: (_, strategyId) => {
      // Invalidate both the bookmarks list and individual bookmark status
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks", strategyId] });
    },
  });
}