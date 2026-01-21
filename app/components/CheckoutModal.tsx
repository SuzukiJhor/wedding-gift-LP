import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '../stores/cartStore';
import { createAbacatePayBilling } from '../checkout/actions';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    taxId: '',
    message: '',
  });

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || formData.taxId.length < 14) {
      toast.error('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await createAbacatePayBilling({
        name: formData.name,
        message: formData.message,
        email: formData.email,
        taxId: formData.taxId.replace(/\D/g, ''),
        items: items
      });

      if (result.error || !result.url) {
        toast.error(result.error || 'Erro ao processar pagamento. Tente novamente.');
        setIsLoading(false);
        return;
      }

      toast.success('Redirecionando para o pagamento...');

      setTimeout(() => {
        clearCart();
        window.location.href = result.url;
      }, 1000);
    } catch (error) {
      toast.error('Ocorreu um erro inesperado.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">

      {isOpen && (
        <motion.div
          key="checkout-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            key="checkout-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-background rounded-3xl shadow-2xl overflow-hidden"
          >
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  key="loading-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md"
                >
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-accent" />
                    <Heart className="h-4 w-4 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="currentColor" />
                  </div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 font-display text-lg text-foreground"
                  >
                    Preparando seu presente...
                  </motion.p>
                  <p className="text-sm text-muted-foreground font-body text-center px-4">Você será redirecionado para o pagamento seguro.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleClose}
              disabled={isLoading}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {isSuccess ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage mb-6">
                  <CheckCircle className="h-10 w-10 text-foreground" />
                </div>
                <h2 className="font-display text-2xl text-foreground mb-2">Obrigado pelo Carinho!</h2>
              </div>
            ) : (
              <>
                <div className="p-8 bg-secondary/50 text-center">
                  <div className="divider-ornament mb-3">
                    <Heart className="h-4 w-4 text-accent" fill="currentColor" />
                  </div>
                  <h2 className="font-display text-2xl text-foreground">Finalizar Presente</h2>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    Total: {formatPrice(getTotalPrice())}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block font-body text-xs uppercase tracking-widest text-muted-foreground ml-1">Seu Nome *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl font-body text-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        placeholder="Nome Completo"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="taxId" className="block font-body text-xs uppercase tracking-widest text-muted-foreground ml-1">CPF *</label>
                      <input
                        id="taxId"
                        type="text"
                        required
                        value={formData.taxId}
                        onChange={(e) => setFormData({ ...formData, taxId: formatCPF(e.target.value) })}
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl font-body text-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block font-body text-xs uppercase tracking-widest text-muted-foreground ml-1">Seu E-mail *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl font-body text-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block font-body text-xs uppercase tracking-widest text-muted-foreground ml-1">Mensagem (opcional)</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl font-body text-sm focus:ring-2 focus:ring-accent/20 outline-none resize-none transition-all"
                      placeholder="Deixe um recado especial para os noivos..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full py-4 bg-accent text-accent-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-2"
                  >
                    <Heart className="h-4 w-4" />
                    Confirmar Presente
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}