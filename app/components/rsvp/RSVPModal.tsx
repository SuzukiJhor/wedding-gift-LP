"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Check, Loader2, Users, Minus, Plus, UserPlus, Baby } from "lucide-react";

type FormState = "form" | "loading" | "success";

export function RSVPModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("form");
  const [hasChildren, setHasChildren] = useState(false);
  const [formData, setFormData] = useState({
    confirmationCode: "",
    mainGuestName: "",
    guestCount: 1,
    additionalGuests: [] as string[],
    childrenCount: 0,
    childrenNames: [] as string[],
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setFormState("form"), 500);
  };

  const updateGuestCount = (delta: number) => {
    const newCount = Math.max(1, Math.min(10, formData.guestCount + delta));
    setFormData((prev) => ({
      ...prev,
      guestCount: newCount,
      additionalGuests: Array(newCount - 1).fill("").map((_, i) => prev.additionalGuests[i] || ""),
    }));
  };

  const updateChildrenCount = (delta: number) => {
    const newCount = Math.max(0, Math.min(5, formData.childrenCount + delta));
    setFormData((prev) => ({
      ...prev,
      childrenCount: newCount,
      childrenNames: Array(newCount).fill("").map((_, i) => prev.childrenNames[i] || ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormState("success");
    setTimeout(handleClose, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-border"
          >
            {/* Header */}
            <div className="bg-secondary px-6 py-5 text-center relative shrink-0">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="divider-ornament mb-3">
                <Heart className="h-5 w-5 text-accent" fill="currentColor" />
              </div>

              <h2 className="font-display text-2xl text-foreground">
                Confirmação de Presença
              </h2>
              <p className="font-body text-sm text-muted-foreground mt-2 italic">
                &quot;Sua presença é nosso maior presente&quot;
              </p>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <AnimatePresence mode="wait">
                {formState === "form" && (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">

                    {/* Código e Nome Principal */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Código de Confirmação</label>
                        <input required className="w-full px-4 py-2 bg-secondary border border-border rounded-md outline-none uppercase text-foreground" placeholder="Ex: ABC123" value={formData.confirmationCode} onChange={(e) => setFormData({ ...formData, confirmationCode: e.target.value.toUpperCase() })} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Seu Nome</label>
                        <input required className="w-full px-4 py-2 bg-secondary border border-border rounded-md outline-none text-foreground" placeholder="Nome completo" value={formData.mainGuestName} onChange={(e) => setFormData({ ...formData, mainGuestName: e.target.value })} />
                      </div>
                    </div>

                    {/* Seletor de Adultos */}
                    <div className="p-4 bg-secondary/50 rounded-xl border border-border space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-foreground text-sm font-medium">
                          <Users size={18} className="text-accent" /> Quantos acompanhantes?
                        </div>
                        <div className="flex items-center gap-3 bg-background rounded-full p-1 border border-border">
                          <button type="button" onClick={() => updateGuestCount(-1)} className="p-1 text-accent disabled:opacity-20" disabled={formData.guestCount <= 1}><Minus size={16} /></button>
                          <span className="font-bold text-sm w-4 text-center">{formData.guestCount - 1}</span>
                          <button type="button" onClick={() => updateGuestCount(1)} className="p-1 text-accent disabled:opacity-20" disabled={formData.guestCount >= 6}><Plus size={16} /></button>
                        </div>
                      </div>

                      {/* Nomes dos Acompanhantes (Adultos) */}
                      <AnimatePresence>
                        {formData.guestCount > 1 && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-2 pt-2">
                            {formData.additionalGuests.map((guest, index) => (
                              <input key={index} required className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm" placeholder={`Nome do acompanhante ${index + 1}`} value={guest} onChange={(e) => {
                                const newGuests = [...formData.additionalGuests];
                                newGuests[index] = e.target.value;
                                setFormData({ ...formData, additionalGuests: newGuests });
                              }} />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Seção de Filhos */}
                    <div className="p-4 bg-secondary/30 rounded-xl border border-dashed border-border space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-border text-accent focus:ring-accent" checked={hasChildren} onChange={(e) => {
                          setHasChildren(e.target.checked);
                          if (!e.target.checked) setFormData(p => ({ ...p, childrenCount: 0, childrenNames: [] }));
                        }} />
                        <span className="text-sm font-medium text-foreground">Levarei filhos</span>
                      </label>

                      <AnimatePresence>
                        {hasChildren && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 pt-2">
                            <div className="flex items-center justify-between bg-background p-2 rounded-lg border border-border">
                              <span className="text-xs font-medium px-2">Quantidade de filhos</span>
                              <div className="flex items-center gap-3">
                                <button type="button" onClick={() => updateChildrenCount(-1)} className="text-accent disabled:opacity-20" disabled={formData.childrenCount <= 0}><Minus size={14} /></button>
                                <span className="text-sm font-bold">{formData.childrenCount}</span>
                                <button type="button" onClick={() => updateChildrenCount(1)} className="text-accent disabled:opacity-20" disabled={formData.childrenCount >= 5}><Plus size={14} /></button>
                              </div>
                            </div>
                            {formData.childrenNames.map((name, index) => (
                              <input key={index} required className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm" placeholder={`Nome do filho(a) ${index + 1}`} value={name} onChange={(e) => {
                                const newNames = [...formData.childrenNames];
                                newNames[index] = e.target.value;
                                setFormData({ ...formData, childrenNames: newNames });
                              }} />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
                      <Heart size={18} fill="currentColor" /> Confirmar Presença
                    </button>
                  </motion.form>
                )}

                {/* Loading e Success seguem o mesmo padrão... */}
                {formState === "loading" && (
                  <div className="py-12 flex flex-col items-center"><Loader2 className="h-12 w-12 text-accent animate-spin" /><p className="mt-4 text-muted-foreground">Confirmando...</p></div>
                )}

                {formState === "success" && (
                  <div className="py-12 text-center">
                    <div className="h-16 w-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} strokeWidth={3} /></div>
                    <h3 className="text-lg font-bold">Tudo certo!</h3>
                    <p className="text-sm text-muted-foreground mt-2">Sua presença foi confirmada com sucesso.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}