'use client';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { Product } from '../data/products';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleCart } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    toggleCart();
    toast.success(`${product.name} adicionado ao carrinho!`, {
      description: 'Continue navegando ou finalize seu presente.',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-card rounded-lg overflow-hidden shadow-elegant card-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-display text-lg text-foreground line-clamp-1">
          {product.name}
        </h3>

        <p className="font-body text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="pt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span className="font-display text-xl text-accent text-center md:text-left">
            {formatPrice(product.price)}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 bg-accent text-accent-foreground text-sm font-body rounded-full hover:bg-accent/90 transition-colors"
          >
            <Gift className="h-4 w-4" />
            Presentear
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
