import React, { useState, useRef } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";

interface ImageCropperModalProps {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedBase64: string, croppedWidth?: number, croppedHeight?: number) => void;
}

// Kaliteyi arttırmak için resmi önce orjinal boyutlarında tutuyoruz
function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): { base64: string; width: number; height: number } {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const pixelRatio = window.devicePixelRatio || 1;

  const croppedWidth = Math.floor(crop.width * scaleX * pixelRatio);
  const croppedHeight = Math.floor(crop.height * scaleY * pixelRatio);

  canvas.width = croppedWidth;
  canvas.height = croppedHeight;

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.drawImage(
    image,
    cropX,
    cropY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );

  const base64 = canvas.toDataURL("image/jpeg", 0.95);
  // Gerçek boyutlar: pixelRatio'ya bölünmüş hali
  const actualWidth = Math.round(croppedWidth / pixelRatio);
  const actualHeight = Math.round(croppedHeight / pixelRatio);
  return { base64, width: actualWidth, height: actualHeight };
}

export function ImageCropperModal({ open, imageSrc, onClose, onCropComplete }: ImageCropperModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleConfirm = () => {
    if (imgRef.current) {
      try {
        let base64 = imageSrc;
        let width = 342;
        let height = 160;

        if (completedCrop) {
          // Kırpma yapıldı
          const result = getCroppedImg(imgRef.current, completedCrop);
          base64 = result.base64;
          width = result.width;
          height = result.height;
        } else {
          // Kırpma yapılmadı - orijinal resmin boyutlarını hesapla
          width = imgRef.current.naturalWidth;
          height = imgRef.current.naturalHeight;
        }

        onCropComplete(base64, width, height);
        onClose();
      } catch (e) {
        console.error("Resim kesme hatası", e);
        onCropComplete(imageSrc, 342, 160);
        onClose();
      }
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const initialCrop: Crop = {
      unit: '%',
      x: 10,
      y: 10,
      width: 80,
      height: 80
    };
    setCrop(initialCrop);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl rounded-none">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-zinc-800">Resmi Hazırla (Sadece İstenen Alanı Seçin)</DialogTitle>
          <DialogDescription className="sr-only">
            Resimi kırpmak için istenen alanı seçin ve Kırp ve Ekle butonuna tıklayın.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center bg-zinc-50 border border-zinc-200 rounded-none p-4 max-h-[60vh] overflow-auto">
          {imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={(c: Crop) => setCrop(c)}
              onComplete={(c: PixelCrop) => setCompletedCrop(c)}
              className="max-h-full"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Düzenlenecek resim"
                onLoad={onImageLoad}
                className="max-h-[50vh] w-auto object-contain"
              />
            </ReactCrop>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer border-slate-600 text-slate-700 hover:bg-slate-700 hover:text-white rounded-none"
          >
            İptal
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-slate-700 hover:bg-slate-800 text-white cursor-pointer rounded-none"
          >
            Kırp ve Ekle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
