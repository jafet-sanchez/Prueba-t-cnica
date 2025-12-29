import { Toast } from './Toast';
import { useToastStore } from '../../context/toast.store';


export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={0} // La duración ya se maneja en el store
          onClose={() => removeToast(toast.id)}
          closable
        />
      ))}
    </div>
  );
};

export default ToastContainer;
