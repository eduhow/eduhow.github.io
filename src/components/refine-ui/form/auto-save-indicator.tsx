"use client";

import { useState, useEffect } from "react";
import { useTranslate, type AutoSaveIndicatorProps } from "@refinedev/core";
import { AlertTriangle, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = AutoSaveIndicatorProps;

/**
 * AutoSaveIndicator - A visual indicator that displays the current state of auto-save operations
 *
 * This component provides real-time feedback to users about the auto-save status of their form data.
 * It displays different visual states (loading, success, error, idle) with appropriate icons and colors.
 * The success state includes a fade-out animation after 1 second to provide subtle feedback without
 * being distracting.
 *
 * @param {Object} props - The component props from Refine's autoSaveProps
 * @param {('loading' | 'success' | 'error' | 'idle')} props.status - Current auto-save status
 *
 * @example
 * ```tsx
 * import { useForm } from "@refinedev/react-hook-form";
 *
 * export default function EditPost() {
 *   const {
 *     refineCore: { autoSaveProps, query },
 *     ...form
 *   } = useForm({
 *     refineCoreProps: {
 *       autoSave: {
 *         enabled: true,
 *         debounce: 1000,
 *       },
 *     },
 *   });
 *
 *
 *   return (
 *     <EditView>
 *       <EditViewHeader title="Edit Post" actionsSlot={<AutoSaveIndicator {...autoSaveProps} />} />
 *         {/* Your form content *\/}
 *     </EditView>
 *   );
 * }
 * ```
 *
 * @returns {JSX.Element} The rendered auto-save indicator component
 */
export function AutoSaveIndicator({
  status,
  elements: elementsFromProps,
}: Props) {
  const t = useTranslate();
  const [shouldFadeSuccess, setShouldFadeSuccess] = useState(false);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setShouldFadeSuccess(true);
      }, 1000);

      return () => {
        clearTimeout(timer);
        setShouldFadeSuccess(false);
      };
    }
    setShouldFadeSuccess(false);
  }, [status]);

  const elements = {
    pending: elementsFromProps?.loading ?? (
      <div
        className={cn(
          "flex",
          "items-center",
          "h-9",
          "text-sm",
          "text-sky-600",
          "px-3",
        )}
      >
        <Loader2 className={cn("h-4", "w-4", "mr-2", "animate-spin")} />
        <span className={cn("font-medium")}>
          {t("autoSave.saving", "Saving")}
        </span>
      </div>
    ),
    success: elementsFromProps?.success ?? (
      <div
        className={cn(
          "flex",
          "items-center",
          "h-9",
          "text-sm",
          "text-emerald-500",
          "transition-opacity",
          "duration-500",
          "px-3",
          {
            "opacity-50": shouldFadeSuccess,
          },
        )}
      >
        <CheckCircle2 className={cn("h-4", "w-4", "mr-2")} />
        <span className={cn("font-medium")}>
          {t("autoSave.saved", "Saved")}
        </span>
      </div>
    ),
    error: elementsFromProps?.error ?? (
      <div
        className={cn(
          "flex",
          "items-center",
          "h-9",
          "text-sm",
          "text-rose-400",
          "px-3",
        )}
      >
        <AlertTriangle className={cn("h-4", "w-4", "mr-2")} />
        <span className={cn("font-medium")}>
          {t("autoSave.failed", "Failed")}
        </span>
      </div>
    ),
    idle: elementsFromProps?.idle ?? (
      <div
        className={cn(
          "flex",
          "items-center",
          "h-9",
          "text-sm",
          "text-slate-500",
          "px-3",
        )}
      >
        <Clock className={cn("h-4", "w-4", "mr-2")} />
        <span>{t("autoSave.idle", "Idle")} </span>
      </div>
    ),
  };

  return <div className={cn("flex")}>{elements[status]}</div>;
}

AutoSaveIndicator.displayName = "AutoSaveIndicator";
