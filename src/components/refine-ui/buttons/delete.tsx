"use client";

import React from "react";
import { type BaseKey, useDeleteButton } from "@refinedev/core";
import { Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DeleteButtonProps = {
  /**
   * Resource name for API data interactions. `identifier` of the resource can be used instead of the `name` of the resource.
   * @default Inferred resource name from the route
   */
  resource?: string;
  /**
   * Data item identifier for the actions with the API
   * @default Reads `:id` from the URL
   */
  recordItemId?: BaseKey;
  /**
   * Access Control configuration for the button
   * @default `{ enabled: true, hideIfUnauthorized: false }`
   */
  accessControl?: {
    enabled?: boolean;
    hideIfUnauthorized?: boolean;
  };
  /**
   * `meta` property is used when creating the URL for the related action and path.
   */
  meta?: Record<string, unknown>;
} & React.ComponentProps<typeof Button>;

export const DeleteButton = React.forwardRef<
  React.ComponentRef<typeof Button>,
  DeleteButtonProps
>(({ resource, recordItemId, accessControl, meta, children, ...rest }, ref) => {
  const {
    hidden,
    disabled,
    loading,
    onConfirm,
    label,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel: defaultConfirmOkLabel,
    cancelLabel: defaultCancelLabel,
  } = useDeleteButton({
    resource,
    id: recordItemId,
    accessControl,
    meta,
  });
  const [open, setOpen] = React.useState(false);

  const isDisabled = disabled || rest.disabled || loading;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  const confirmCancelText = defaultCancelLabel;
  const confirmOkText = defaultConfirmOkLabel;
  const confirmTitle = defaultConfirmTitle;

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      onConfirm();
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        {...rest}
        ref={ref}
        disabled={isDisabled}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
          if (rest.onClick) rest.onClick(e);
        }}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children ?? (
          <div className="flex items-center gap-2 font-semibold">
            <Trash className="h-4 w-4" />
            <span>{label}</span>
          </div>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{confirmTitle}</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this{" "}
              {resource ? resource.slice(0, -1) : "item"}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              {confirmCancelText}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {confirmOkText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

DeleteButton.displayName = "DeleteButton";
