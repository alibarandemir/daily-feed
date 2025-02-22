import { toast, ToastContent, ToastOptions, Slide, Id } from "react-toastify";


export const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};
// Toast mesajlarını birleştirerek gösterme
const displayedToasts: Set<string> = new Set();
type ToastType = "success" | "error" | "info" | "warning" | "default";

/**
 * Display toast
 *
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id | undefined}
 */
export const showToast = (
  type: ToastType,
  content: ToastContent | null | undefined,
  options: Partial<ToastOptions> = {},
): Id | undefined => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  if (!content) {
    console.error("Toast içeriği geçersiz!");
    return;
  }

  // Her toast mesajına benzersiz bir ID atamak için içeriği kullan
  const toastId = content.toString();

  // Aynı mesaj daha önce gösterildiyse, tekrar gösterme
  if (displayedToasts.has(toastId)) {
    return;
  }

  // Önceki toast mesajlarını silme
  toast.dismiss();

  // Yeni toast mesajını göster
  displayedToasts.add(toastId);
  switch (type) {
    case "success":
      return toast.success(content, optionsToApply);
    case "error":
      return toast.error(content, optionsToApply);
    case "info":
      return toast.info(content, optionsToApply);
    case "warning":
      return toast.warn(content, optionsToApply);
    case "default":
      return toast(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};