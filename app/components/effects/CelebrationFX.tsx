"use client";

import { useEffect, useRef } from "react";

type Props = {
    intensity?: number;
    trigger?: boolean;
};

export function CelebrationFX({ intensity = 12, trigger = false }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const slowMotion = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let animationId: number;

        // ============================
        // RETINA SAFE CANVAS
        // ============================

        const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

        function resize() {
            canvas.width = window.innerWidth * DPR;
            canvas.height = window.innerHeight * DPR;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        }

        resize();

        const balloons: Balloon[] = [];
        const hearts: Heart[] = [];
        const particles: Particle[] = [];

        const mouse = { x: 0, y: 0 };

        // ============================
        // HEART SPRITE (OFFSCREEN)
        // ============================

        function createHeartSprite(size = 64) {
            const c = document.createElement("canvas");
            const cctx = c.getContext("2d")!;

            c.width = size;
            c.height = size;

            cctx.translate(size / 2, size / 2);
            cctx.fillStyle = "rgba(255,140,160,0.85)";

            const s = size * 0.25;

            cctx.beginPath();
            cctx.moveTo(0, s);
            cctx.bezierCurveTo(0, -s, -s * 2, -s, -s * 2, s * 0.4);
            cctx.bezierCurveTo(-s * 2, s * 2, 0, s * 2.5, 0, s * 3);
            cctx.bezierCurveTo(0, s * 2.5, s * 2, s * 2, s * 2, s * 0.4);
            cctx.bezierCurveTo(s * 2, -s, 0, -s, 0, s);
            cctx.fill();

            return c;
        }

        const heartSprite = createHeartSprite();

        // ============================
        // BALLOON
        // ============================

        class Balloon {
            x!: number;
            y!: number;
            radius!: number;
            speed!: number;
            opacity!: number;
            angle!: number;

            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * window.innerWidth;
                this.y = window.innerHeight + Math.random() * 200;
                this.radius = 12 + Math.random() * 8;
                this.speed = 0.15 + Math.random() * 0.4;
                this.opacity = 0.18 + Math.random() * 0.25;
                this.angle = Math.random() * Math.PI * 2;
            }

            update(dt: number) {
                const factor = slowMotion.current ? 0.3 : 1;

                this.y -= this.speed * dt * factor;
                this.angle += 0.003 * dt;
                this.x += Math.sin(this.angle) * 0.12;

                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;

                // sqrt-free collision
                if (dx * dx + dy * dy < this.radius * this.radius * 1.2) {
                    this.x += dx * 0.01;
                    this.y += dy * 0.01;
                }

                if (this.y < -60) this.reset();
            }

            draw() {
                const g = ctx.createRadialGradient(
                    this.x - this.radius / 3,
                    this.y - this.radius / 3,
                    this.radius / 4,
                    this.x,
                    this.y,
                    this.radius
                );

                g.addColorStop(0, "rgba(255,235,180,0.6)");
                g.addColorStop(0.5, "rgba(212,175,55,0.55)");
                g.addColorStop(1, "rgba(150,110,30,0.6)");

                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.fillStyle = g;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();

                // highlight
                ctx.beginPath();
                ctx.fillStyle = "rgba(255,255,255,0.12)";
                ctx.arc(
                    this.x - this.radius / 3,
                    this.y - this.radius / 3,
                    this.radius / 3,
                    0,
                    Math.PI * 2
                );
                ctx.fill();

                ctx.globalAlpha = 1;
            }

            pop() {
                for (let i = 0; i < 6; i++) {
                    particles.push(new Particle(this.x, this.y));
                }

                this.reset();
            }
        }

        // ============================
        // HEART (SPRITE BASED)
        // ============================

        class Heart {
            x!: number;
            y!: number;
            size!: number;
            vx!: number;
            vy!: number;
            rotation!: number;
            rotateSpeed!: number;
            opacity!: number;

            constructor() {
                this.reset();
            }

            reset() {
                const side = Math.floor(Math.random() * 3);

                if (side === 0) {
                    this.x = -60;
                    this.y = Math.random() * window.innerHeight;
                } else if (side === 1) {
                    this.x = window.innerWidth + 60;
                    this.y = Math.random() * window.innerHeight;
                } else {
                    this.x = Math.random() * window.innerWidth;
                    this.y = -60;
                }

                this.size = 18 + Math.random() * 12;
                this.vx = 0.25 + Math.random() * 0.4;
                this.vy = 0.2 + Math.random() * 0.35;
                this.rotation = Math.random() * Math.PI;
                this.rotateSpeed = (Math.random() - 0.5) * 0.01;
                this.opacity = 0.12 + Math.random() * 0.25;
            }

            update(dt: number) {
                const factor = slowMotion.current ? 0.35 : 1;

                this.x += this.vx * dt * factor;
                this.y += this.vy * dt * factor;
                this.rotation += this.rotateSpeed * dt;

                if (
                    this.x > window.innerWidth + 80 ||
                    this.y > window.innerHeight + 80
                ) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;

                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                ctx.drawImage(
                    heartSprite,
                    -this.size / 2,
                    -this.size / 2,
                    this.size,
                    this.size
                );

                ctx.restore();
            }
        }

        // ============================
        // CONFETTI
        // ============================

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            life: number;
            size: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 1.8;
                this.vy = (Math.random() - 0.5) * 1.8;
                this.life = 50 + Math.random() * 30;
                this.size = 1.5 + Math.random() * 2;
            }

            update(dt: number) {
                const factor = slowMotion.current ? 0.3 : 1;

                this.x += this.vx * dt * factor;
                this.y += this.vy * dt * factor;
                this.vy += 0.025 * dt;
                this.life--;
            }

            draw() {
                ctx.fillStyle = "rgba(212,175,55,0.6)";
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        }

        // ============================
        // INIT
        // ============================

        for (let i = 0; i < intensity; i++) balloons.push(new Balloon());
        for (let i = 0; i < intensity * 0.6; i++) hearts.push(new Heart());

        // ============================
        // LOOP (DeltaTime)
        // ============================

        let last = performance.now();

        function animate(now: number) {
            const dt = (now - last) * 0.06;
            last = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            hearts.forEach(h => {
                h.update(dt);
                h.draw();
            });

            balloons.forEach(b => {
                b.update(dt);
                b.draw();
            });

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update(dt);
                p.draw();
                if (p.life <= 0) particles.splice(i, 1);
            }

            animationId = requestAnimationFrame(animate);
        }

        animate(last);

        // ============================
        // EVENTS
        // ============================

        const move = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const click = (e: MouseEvent) => {
            balloons.forEach(b => {
                const dx = b.x - e.clientX;
                const dy = b.y - e.clientY;

                if (dx * dx + dy * dy < b.radius * b.radius * 1.2) {
                    b.pop();
                }
            });
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", move);
        window.addEventListener("click", click);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", move);
            window.removeEventListener("click", click);
        };
    }, [intensity]);

    // ============================
    // TRIGGER SLOW MOTION
    // ============================

    useEffect(() => {
        if (!trigger) return;

        slowMotion.current = true;

        const event = new MouseEvent("click", {
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2
        });

        window.dispatchEvent(event);

        setTimeout(() => {
            slowMotion.current = false;
        }, 2600);
    }, [trigger]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
