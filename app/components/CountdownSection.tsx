"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
    weddingDate?: string;
}

export function CountdownSection({
    weddingDate = "2026-06-20T16:00:00"
}: CountdownProps) {

    const calculateTimeLeft = () => {
        const difference = +new Date(weddingDate) - +new Date();

        if (difference <= 0) return null;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        return (
            <section className="py-16 text-center">
                <h2 className="text-2xl font-semibold">
                    💍 O grande dia chegou!
                </h2>
            </section>
        );
    }

    return (
        <section className="relative py-16 md:py-24 overflow-hidden">

            {/* Background suave */}
            <div className="absolute inset-0 bg-linear-to-b from-pink-50 to-white blur-3xl opacity-60" />

            <div className="relative z-10 max-w-6xl mx-auto px-4">

                <h2 className="text-center text-xl md:text-4xl font-semibold mb-8 md:mb-12">
                    Contagem Regressiva 💖
                </h2>

                {/* MOBILE = FLEX | DESKTOP = GRID */}
                <div
                    className="
                        flex
                        justify-between
                        gap-2
                        md:grid
                        md:grid-cols-4
                        md:gap-6
                        "
                >
                    <TimeBox label="Dias" value={timeLeft.days} />
                    <TimeBox label="Horas" value={timeLeft.hours} />
                    <TimeBox label="Minutos" value={timeLeft.minutes} />
                    <TimeBox label="Segundos" value={timeLeft.seconds} />
                </div>

            </div>
        </section>
    );
}


function TimeBox({ label, value }: { label: string; value: number }) {

    return (
        <div
            className="
      flex-1
      bg-white/70 backdrop-blur-lg
      rounded-xl
      shadow-sm

      p-3 md:p-6

      flex
      flex-col
      items-center
      justify-center

      transition-transform
      duration-300
      hover:scale-105
    "
        >
            <span
                className="
        text-2xl
        md:text-5xl
        font-bold
        leading-none
      "
            >
                {String(value).padStart(2, "0")}
            </span>

            <span
                className="
        text-[10px]
        md:text-sm
        mt-1 md:mt-2
        uppercase
        tracking-widest
        text-muted-foreground
      "
            >
                {label}
            </span>
        </div>
    );
}
