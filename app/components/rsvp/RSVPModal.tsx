"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Check, Loader2, Users, Minus, Plus, CalendarCheck, MessageSquare } from "lucide-react";
import { findGuestByCode, submitRSVP } from "@/app/rsvp/actions";
import { toast } from "sonner";

type FormState = "form" | "loading" | "success";

export function RSVPModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formState, setFormState] = useState<FormState>("form");
  const [hasChildren, setHasChildren] = useState(false);
  const [guest, setGuest] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    confirmationCode: "",
    mainGuestName: "",    // Mapeia para 'name'
    guestCount: 1,        // Baseado em 'guests_count'
    additionalGuests: [] as string[],
    childrenCount: 0,
    childrenNames: [] as string[],
    specialNotes: "",     // Mapeia para 'special_notes'
  });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormState("form");
      setGuest(null);
      setErrorMessage("");
      setFormData({
        confirmationCode: "",
        mainGuestName: "",
        guestCount: 1,
        additionalGuests: [],
        childrenCount: 0,
        childrenNames: [],
        specialNotes: "",
      });
      setHasChildren(false);
    }, 500);
  };

  const updateGuestCount = (delta: number) => {
    // Ajustado para 'guests_count' que vem do banco
    const maxAllowed = (guest?.guests_count || 0) + 1;
    const newCount = Math.max(1, Math.min(maxAllowed, formData.guestCount + delta));

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

  const handleValidateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    const res = await findGuestByCode(formData.confirmationCode);

    if (res?.error) {
      setFormState("form");
      toast.error(res.error, {
        description: "Verifique Seu código e tente novamente."
      });
      setErrorMessage(res.error);
      return;
    }

    if (res.guest.confirmed) {
      setFormState("form");
      setErrorMessage("Este convite já foi confirmado!");
      return;
    }

    setGuest(res.guest);
    // Ajustado para res.guest.name conforme seu banco
    setFormData(prev => ({ ...prev, mainGuestName: res.guest.name }));
    setFormState("form");
  };

  const handleConfirmRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    const res = await submitRSVP({
      guest_id: guest.id,
      name: formData.mainGuestName,
      will_attend: true,
      companions_count: formData.additionalGuests.length,
      companion_names: formData.additionalGuests,
      children_names: formData.childrenNames,
      special_notes: formData.specialNotes // Enviando o campo de observações
    });

    if (res?.error) {
      setFormState("form");
      setErrorMessage(res.error);
      return;
    }

    setFormState("success");
    setTimeout(handleClose, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-border"
          >
            {/* Header */}
            <div className="bg-secondary px-6 py-5 text-center relative shrink-0">
              <button onClick={handleClose} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="divider-ornament mb-3">
                <Heart className="h-5 w-5 text-accent" fill="currentColor" />
              </div>
              <h2 className="font-display text-2xl text-foreground">Confirmação de Presença</h2>

              {guest && (
                <p className="font-body text-sm text-muted-foreground mt-2 italic">
                  &quot;Sua presença é nosso maior presente&quot;
                </p>
              )}

            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <AnimatePresence mode="wait">
                {formState === "form" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={guest ? handleConfirmRSVP : handleValidateCode}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Código do Convite</label>
                      <input
                        required
                        disabled={!!guest}
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-md outline-none uppercase disabled:opacity-50"
                        placeholder="EX: CASAL10"
                        value={formData.confirmationCode}
                        onChange={(e) => setFormData({ ...formData, confirmationCode: e.target.value.toUpperCase() })}
                      />
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm text-center font-medium">{errorMessage}</p>}

                    {guest && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Seu Nome</label>
                          <input
                            required
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/20"
                            value={formData.mainGuestName}
                            onChange={(e) => setFormData({ ...formData, mainGuestName: e.target.value })}
                          />
                        </div>

                        {/* Acompanhantes Adultos */}
                        <div className="p-4 bg-secondary/50 rounded-xl border border-border space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <Users size={18} className="text-accent" /> Acompanhantes Adultos
                            </span>
                            <div className="flex items-center gap-3 bg-background rounded-full p-1 border border-border">
                              <button type="button" onClick={() => updateGuestCount(-1)} disabled={formData.guestCount <= 1} className="p-1 hover:text-accent"><Minus size={16} /></button>
                              <span className="font-bold text-sm w-4 text-center">{formData.guestCount - 1}</span>
                              <button type="button" onClick={() => updateGuestCount(1)} disabled={formData.guestCount >= (guest.guests_count + 1)} className="p-1 hover:text-accent"><Plus size={16} /></button>
                            </div>
                          </div>
                          {formData.additionalGuests.map((name, index) => (
                            <input
                              key={index} required
                              className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm outline-none focus:border-accent"
                              placeholder={`Nome do acompanhante ${index + 1}`}
                              value={name}
                              onChange={(e) => {
                                const newNames = [...formData.additionalGuests];
                                newNames[index] = e.target.value;
                                setFormData({ ...formData, additionalGuests: newNames });
                              }}
                            />
                          ))}
                        </div>

                        {/* Seção de Filhos */}
                        <div className="p-4 bg-secondary/30 rounded-xl border border-dashed border-border space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                              checked={hasChildren}
                              onChange={(e) => setHasChildren(e.target.checked)}
                            />
                            <span className="text-sm font-medium group-hover:text-accent transition-colors">Levaremos crianças</span>
                          </label>
                          {hasChildren && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                              <div className="flex items-center justify-between bg-background p-2 rounded-lg border border-border">
                                <span className="text-xs font-medium px-2">Quantidade</span>
                                <div className="flex items-center gap-3">
                                  <button type="button" onClick={() => updateChildrenCount(-1)} className="p-1"><Minus size={14} /></button>
                                  <span className="text-sm font-bold">{formData.childrenCount}</span>
                                  <button type="button" onClick={() => updateChildrenCount(1)} className="p-1"><Plus size={14} /></button>
                                </div>
                              </div>
                              {formData.childrenNames.map((name, index) => (
                                <input
                                  key={index} required
                                  className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm"
                                  placeholder="Nome e idade da criança"
                                  value={name}
                                  onChange={(e) => {
                                    const newNames = [...formData.childrenNames];
                                    newNames[index] = e.target.value;
                                    setFormData({ ...formData, childrenNames: newNames });
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Campo de Observações (Special Notes) */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <MessageSquare size={16} className="text-accent" /> Alguma observação?
                          </label>
                          <textarea
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-md outline-none text-sm min-h-[80px] resize-none focus:ring-2 focus:ring-accent/20"
                            placeholder="Ex: Restrições alimentares, alergias ou uma mensagem para os noivos..."
                            value={formData.specialNotes}
                            onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                          />
                        </div>
                      </motion.div>
                    )}

                    <button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
                      {guest ? <><CalendarCheck size={18} /> Confirmar Presença</> : "Verificar Código"}
                    </button>
                  </motion.form>
                )}

                {formState === "loading" && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center">
                    <Loader2 className="h-12 w-12 text-accent animate-spin" />
                    <p className="mt-4 text-muted-foreground font-medium">Salvando sua confirmação...</p>
                  </motion.div>
                )}

                {formState === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                    <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={40} strokeWidth={3} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Presença Confirmada!</h3>
                    <p className="text-muted-foreground mt-2 px-6">Mal podemos esperar para celebrar este dia com você.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}