import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '../stores/cartStore';

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
    message: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsSuccess(true);

    // Show success message
    toast.success('Presente confirmado com sucesso!', {
      description: 'O casal receberá sua mensagem carinhosa.',
    });

    // Reset after delay
    setTimeout(() => {
      clearCart();
      setIsSuccess(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 z-10"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              {isSuccess ? (
                /* Success State */
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage mb-6"
                  >
                    <CheckCircle className="h-10 w-10 text-foreground" />
                  </motion.div>
                  <h2 className="font-display text-2xl text-foreground mb-2">
                    Obrigado pelo Carinho!
                  </h2>
                  <p className="font-body text-muted-foreground">
                    Seu presente foi registrado com sucesso. Ana & Lucas agradecem
                    de coração!
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="p-6 bg-secondary text-center">
                    <div className="divider-ornament mb-3">
                      <Heart className="h-4 w-4 text-accent" fill="currentColor" />
                    </div>
                    <h2 className="font-display text-2xl text-foreground">
                      Finalizar Presente
                    </h2>
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      {items.length} {items.length === 1 ? 'item' : 'itens'} • Total:{' '}
                      {formatPrice(getTotalPrice())}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-body text-sm text-foreground mb-2"
                      >
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                        placeholder="Digite seu nome completo"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-body text-sm text-foreground mb-2"
                      >
                        Seu E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                        placeholder="seu@email.com"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block font-body text-sm text-foreground mb-2"
                      >
                        Mensagem para o Casal (opcional)
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                        placeholder="Deixe uma mensagem carinhosa..."
                        disabled={isLoading}
                      />
                    </div>

                    {/* Order Summary */}
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      {items.slice(0, 3).map((item) => (
                        <div
                          key={item.product.id}
                          className="flex justify-between font-body text-sm"
                        >
                          <span className="text-muted-foreground truncate flex-1 mr-2">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="text-foreground">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <p className="text-sm text-muted-foreground">
                          +{items.length - 3} outros itens
                        </p>
                      )}
                      <div className="border-t border-border pt-2 mt-2 flex justify-between font-display">
                        <span className="text-foreground">Total</span>
                        <span className="text-accent">{formatPrice(getTotalPrice())}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-accent text-accent-foreground font-body text-sm tracking-wider uppercase rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4" />
                          Confirmar Presente
                        </>
                      )}
                    </motion.button>

                    <p className="text-center font-body text-xs text-muted-foreground">
                      Pagamento seguro via integração com gateway de pagamento
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
