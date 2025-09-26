import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { UserProgress } from "@shared/schema";

// API functions for user progress
const fetchUserProgress = async (): Promise<UserProgress[]> => {
  const response = await fetch("/api/progress");
  if (!response.ok) {
    throw new Error("Failed to fetch user progress");
  }
  return response.json();
};

const fetchStrategyProgress = async (strategyId: string): Promise<UserProgress | null> => {
  const response = await fetch(`/api/progress/${strategyId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch strategy progress");
  }
  return response.json();
};

const updateStrategyProgress = async (strategyId: string, progressData: Partial<UserProgress>) => {
  // Strip undefined values before sending to server
  const cleanData = Object.fromEntries(
    Object.entries(progressData).filter(([_, value]) => value !== undefined)
  );
  
  const response = await apiRequest("POST", `/api/progress/${strategyId}`, cleanData);
  return response.json();
};

const deleteStrategyProgress = async (strategyId: string) => {
  await apiRequest("DELETE", `/api/progress/${strategyId}`);
};

// Custom hooks
export function useUserProgress() {
  return useQuery({
    queryKey: ["/api/progress"],
    queryFn: fetchUserProgress,
  });
}

export function useStrategyProgress(strategyId: string) {
  return useQuery({
    queryKey: ["/api/progress", strategyId],
    queryFn: () => fetchStrategyProgress(strategyId),
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ strategyId, progressData }: { strategyId: string; progressData: Partial<UserProgress> }) =>
      updateStrategyProgress(strategyId, progressData),
    onSuccess: (_, { strategyId }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/progress", strategyId] });
    },
  });
}

export function useDeleteProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteStrategyProgress,
    onSuccess: (_, strategyId) => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/progress", strategyId] });
    },
  });
}