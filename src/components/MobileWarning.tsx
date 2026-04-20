import { useState, useEffect, useRef } from "react";

export function MobileWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const hasChecked = useRef(false);

  useEffect(() => {
    // Daha önce kontrol edilmişse tekrar etme
    if (hasChecked.current) return;

    const lastDismissed = localStorage.getItem("mobile-warning-dismissed");
    if (lastDismissed) {
      const oneDay = 24 * 60 * 60 * 1000;
      const dismissedTime = parseInt(lastDismissed);
      if (Date.now() - dismissedTime < oneDay) {
        return;
      }
    }

    // İlk kontrolü işaretle
    hasChecked.current = true;

    // Sadece ilk yüklemede kontrol et
    if (window.innerWidth < 1024) {
      setShowWarning(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("mobile-warning-dismissed", Date.now().toString());
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
      style={{ overflow: 'auto' }}
    >
      <div 
        className="bg-white border-2 border-yellow-500 p-6 max-w-md text-center rounded-none shadow-2xl my-auto mx-auto"
        style={{ flexShrink: 0 }}
      >
        <h2 className="text-xl font-bold text-yellow-700 mb-4">Uyarı</h2>
        <p className="text-gray-700 mb-4">
          Bu web uygulaması bilgisayarlardan kullanım için tasarlanmıştır. 
          Bazı özellikleri küçük ekranlara uygun değildir.
        </p>
        <button 
          onClick={handleDismiss}
          className="px-4 py-2 bg-yellow-500 text-white rounded-none hover:bg-yellow-600 font-medium"
        >
          Sayfayı göster
        </button>
      </div>
    </div>
  );
}
