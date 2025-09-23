import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Bookmark, 
  BookmarkCheck, 
  Play, 
  CheckCircle2, 
  X,
  Calendar
} from "lucide-react";
import { useStrategyProgress, useUpdateProgress, useDeleteProgress } from "@/hooks/useUserProgress";
import type { UserProgress } from "@shared/schema";

interface ProgressTrackerProps {
  strategyId: string;
  strategyTitle: string;
}

const statusConfig = {
  interested: {
    label: "Interested",
    icon: Bookmark,
    variant: "outline" as const,
    color: "text-muted-foreground",
  },
  started: {
    label: "Started",
    icon: Play,
    variant: "secondary" as const,
    color: "text-blue-600",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    variant: "default" as const,
    color: "text-green-600",
  },
};

export default function ProgressTracker({ strategyId, strategyTitle }: ProgressTrackerProps) {
  const { data: progress, isLoading } = useStrategyProgress(strategyId);
  const updateProgress = useUpdateProgress();
  const deleteProgress = useDeleteProgress();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [results, setResults] = useState("");

  // Sync local state with fetched progress data
  useEffect(() => {
    if (progress) {
      setNotes(progress.notes || "");
      setResults(progress.results || "");
    }
  }, [progress]);

  const currentStatus = progress?.status || null;
  const StatusIcon = currentStatus ? statusConfig[currentStatus as keyof typeof statusConfig]?.icon : Bookmark;
  const statusLabel = currentStatus ? statusConfig[currentStatus as keyof typeof statusConfig]?.label : "Track Progress";
  const statusVariant = currentStatus ? statusConfig[currentStatus as keyof typeof statusConfig]?.variant : "outline";

  const handleStatusChange = async (newStatus: string) => {
    const now = new Date().toISOString();
    const progressData: Partial<UserProgress> = {
      status: newStatus,
      notes: notes || undefined,
      results: results || undefined,
    };

    if (newStatus === "started" && !progress?.startedAt) {
      progressData.startedAt = now;
    }
    if (newStatus === "completed") {
      progressData.completedAt = now;
      if (!progress?.startedAt) {
        progressData.startedAt = now;
      }
    }

    try {
      await updateProgress.mutateAsync({ strategyId, progressData });
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProgress.mutateAsync(strategyId);
      setNotes("");
      setResults("");
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete progress:", error);
    }
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-24 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant={statusVariant} 
            size="sm" 
            className="gap-1"
            data-testid={`button-progress-${strategyId}`}
          >
            <StatusIcon className="h-4 w-4" />
            {statusLabel}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Track Progress</DialogTitle>
            <DialogDescription>
              Update your progress for: <strong>{strategyTitle}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Status Timeline */}
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-2">
                <Button
                  variant={currentStatus === "interested" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange("interested")}
                  data-testid="status-interested"
                >
                  <Bookmark className="h-4 w-4 mr-1" />
                  Interested
                </Button>
                <Button
                  variant={currentStatus === "started" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange("started")}
                  data-testid="status-started"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Started
                </Button>
                <Button
                  variant={currentStatus === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange("completed")}
                  data-testid="status-completed"
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Completed
                </Button>
              </div>
            </div>

            {/* Timeline */}
            {progress && (
              <div className="space-y-2">
                <Label>Timeline</Label>
                <div className="text-sm text-muted-foreground space-y-1">
                  {progress.startedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      Started: {formatDate(progress.startedAt)}
                    </div>
                  )}
                  {progress.completedAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed: {formatDate(progress.completedAt)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add your thoughts, challenges, or insights..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                data-testid="input-notes"
              />
            </div>

            {/* Results (for completed strategies) */}
            {(currentStatus === "completed" || progress?.results) && (
              <div className="space-y-2">
                <Label htmlFor="results">Results</Label>
                <Textarea
                  id="results"
                  placeholder="What did you achieve? Income earned, lessons learned..."
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                  data-testid="input-results"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <div>
                {progress && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDelete}
                    data-testid="button-delete-progress"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // If no status selected, default to interested, otherwise update current status
                    const statusToSave = currentStatus || "interested";
                    handleStatusChange(statusToSave);
                  }}
                  disabled={updateProgress.isPending}
                  data-testid="button-save"
                >
                  {updateProgress.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}