"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Check, Loader2, Users, CalendarCheck, MessageSquare, Edit3, Trash2 } from "lucide-react";
import { findGuestByCode, submitRSVP } from "@/app/rsvp/actions";
import { toast } from "sonner";

type FormState = "form" | "loading" | "success";

export function RSVPModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formState, setFormState] = useState<FormState>("form");
  const [guest, setGuest] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    confirmationCode: "",
    mainGuestName: "",
    companionNames: [] as string[],
    childrenNames: [] as string[],
    specialNotes: "",
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
        companionNames: [],
        childrenNames: [],
        specialNotes: "",
      });
    }, 500);
  };

  // Funções para remover convidados
  const removeCompanion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      companionNames: prev.companionNames.filter((_, i) => i !== index)
    }));
  };

  const removeChild = (index: number) => {
    setFormData(prev => ({
      ...prev,
      childrenNames: prev.childrenNames.filter((_, i) => i !== index)
    }));
  };

  const handleValidateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    const res = await findGuestByCode(formData.confirmationCode);

    if (res?.error) {
      setFormState("form");
      toast.error(res.error, { description: "Verifique seu código." });
      setErrorMessage(res.error);
      return;
    }

    if (res.guest.confirmed) {
      setFormState("form");
      setErrorMessage("Este convite já foi confirmado!");
      return;
    }

    setGuest(res.guest);
    setFormData(prev => ({
      ...prev,
      mainGuestName: res.guest.name,
      companionNames: res.guest.companion_names || [],
      childrenNames: res.guest.children_names || []
    }));
    setFormState("form");
  };

  const handleConfirmRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    // O novo count é: 1 (principal) + acompanhantes + crianças
    const totalCount = 1 + formData.companionNames.length + formData.childrenNames.length;

    const res = await submitRSVP({
      guest_id: guest.id,
      name: formData.mainGuestName,
      will_attend: true,
      companions_count: totalCount, // Enviando o total atualizado após deleções
      companion_names: formData.companionNames,
      children_names: formData.childrenNames,
      special_notes: formData.specialNotes
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
                  <motion.form key="form" onSubmit={guest ? handleConfirmRSVP : handleValidateCode} className="space-y-5">
                    {errorMessage && <p className="text-red-500 text-sm text-center font-medium">{errorMessage}</p>}


                    {!guest ? (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Código do Convite</label>
                        <input
                          required
                          className="w-full px-4 py-2 bg-secondary border border-border rounded-md outline-none uppercase"
                          placeholder="EX: HTJLF"
                          value={formData.confirmationCode}
                          onChange={(e) => setFormData({ ...formData, confirmationCode: e.target.value.toUpperCase() })}
                        />
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                        <div className="p-4 bg-secondary/50 rounded-xl border border-border space-y-4">
                          <span className="text-sm font-medium flex items-center gap-2 mb-1 text-muted-foreground">
                            <Edit3 size={18} className="text-accent" /> Quem irá comparecer?
                          </span>

                          <div className="space-y-3">
                            {/* Convidado Principal (Não deletável para evitar convite vazio) */}
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-accent ml-1">Principal</label>
                              <input
                                required
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none"
                                value={formData.mainGuestName}
                                onChange={(e) => setFormData({ ...formData, mainGuestName: e.target.value })}
                              />
                            </div>

                            {/* Acompanhantes com Botão Deletar */}
                            {formData.companionNames.length > 0 && (
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Acompanhantes</label>
                                {formData.companionNames.map((name, index) => (
                                  <div key={index} className="flex gap-2">
                                    <input
                                      required
                                      className="flex-1 px-4 py-2 bg-background/50 border border-border rounded-lg text-sm outline-none focus:border-accent"
                                      value={name}
                                      onChange={(e) => {
                                        const newC = [...formData.companionNames];
                                        newC[index] = e.target.value;
                                        setFormData({ ...formData, companionNames: newC });
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeCompanion(index)}
                                      className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                                      title="Remover acompanhante"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Crianças com Botão Deletar */}
                            {formData.childrenNames.length > 0 && (
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-pink-400 ml-1">Crianças</label>
                                {formData.childrenNames.map((name, index) => (
                                  <div key={index} className="flex gap-2">
                                    <input
                                      required
                                      className="flex-1 px-4 py-2 bg-background/50 border border-pink-100 rounded-lg text-sm outline-none"
                                      value={name}
                                      onChange={(e) => {
                                        const newChild = [...formData.childrenNames];
                                        newChild[index] = e.target.value;
                                        setFormData({ ...formData, childrenNames: newChild });
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeChild(index)}
                                      className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Campo de Observações */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <MessageSquare size={16} className="text-accent" /> Alguma observação?
                          </label>
                          <textarea
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-md outline-none text-sm min-h-20"
                            placeholder="Ex: Restrição alimentar..."
                            value={formData.specialNotes}
                            onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                          />
                        </div>
                      </motion.div>
                    )}

                    <button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-full font-bold shadow-lg flex items-center justify-center gap-2">
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