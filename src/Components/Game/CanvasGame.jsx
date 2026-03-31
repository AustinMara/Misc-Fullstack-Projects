import { useEffect, useRef, useState, useCallback } from "react";

// ─── Game constants ────────────────────────────────────────────────────────────
const FPS = 60;
const FRAME_DURATION = 1000 / FPS;

// ─── Initial game state ────────────────────────────────────────────────────────
const createInitialState = () => ({
  player: { x: 200, y: 200, vx: 0, vy: 0, radius: 16 },
  score: 0,
  lives: 3,
  time:40,
  phase: "idle", // "idle" | "playing" | "paused" | "gameover"
});

// ─── Main component ────────────────────────────────────────────────────────────
export default function CanvasGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(createInitialState());
  const keysRef = useRef({});
  const animRef = useRef(null);
  const lastTimeRef = useRef(null);
  const accRef = useRef(0);

  const [ui, setUi] = useState({ score: 0, lives: 3, phase: "idle" });

  // ─── Sync UI from game state (call after mutations) ──────────────────────────
  const syncUi = useCallback(() => {
    const s = stateRef.current;
    setUi({ score: s.score, lives: s.lives, phase: s.phase });
  }, []);

  // ─── Input ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onDown = (e) => { keysRef.current[e.key] = true; };
    const onUp   = (e) => { keysRef.current[e.key] = false; };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup",   onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup",   onUp);
    };
  }, []);

  // ─── Canvas resize ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const observer = new ResizeObserver(() => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
    observer.observe(canvas);
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    return () => observer.disconnect();
  }, []);

  // ─── update(dt) — pure game logic, no drawing ────────────────────────────────
  const update = useCallback((dt) => {
    const s    = stateRef.current;
    const keys = keysRef.current;
    if (s.phase !== "playing") return;

    const SPEED = 200; // px / second
    const canvas = canvasRef.current;
    const p = s.player;

    // Apply input
    p.vx = 0; p.vy = 0;
    if (keys["ArrowLeft"]  || keys["a"]) p.vx = -SPEED;
    if (keys["ArrowRight"] || keys["d"]) p.vx =  SPEED;
    if (keys["ArrowUp"]    || keys["w"]) p.vy = -SPEED;
    if (keys["ArrowDown"]  || keys["s"]) p.vy =  SPEED;

    // Move & clamp
    p.x = Math.max(p.radius, Math.min(canvas.width  - p.radius, p.x + p.vx * dt));
    p.y = Math.max(p.radius, Math.min(canvas.height - p.radius, p.y + p.vy * dt));

    // ─── TODO: add entities, collisions, scoring, win/lose checks here ──────────
  }, []);

  // ─── draw() — reads state, draws one frame ───────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const { width: W, height: H } = canvas;
    const s = stateRef.current;

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // Grid overlay (optional visual)
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    const GRID = 40;
    for (let x = 0; x < W; x += GRID) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += GRID) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    if (s.phase === "idle") {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 28px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Press Space to start", W / 2, H / 2);
      return;
    }

    if (s.phase === "paused") {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 28px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Paused — press P to resume", W / 2, H / 2);
      return;
    }

    if (s.phase === "gameover") {
      ctx.fillStyle = "#f87171";
      ctx.font = "bold 36px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", W / 2, H / 2 - 20);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "18px monospace";
      ctx.fillText(`Score: ${s.score}`, W / 2, H / 2 + 20);
      ctx.fillText("Press R to restart", W / 2, H / 2 + 50);
      return;
    }

    // ─── Player ───────────────────────────────────────────────────────────────
    const p = s.player;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // ─── TODO: draw entities, particles, HUD elements here ───────────────────
  }, []);

  // ─── Game loop ────────────────────────────────────────────────────────────────
  const loop = useCallback((timestamp) => {
    if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
    const elapsed = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    accRef.current += elapsed;
    while (accRef.current >= FRAME_DURATION) {
      update(FRAME_DURATION / 1000);
      accRef.current -= FRAME_DURATION;
    }

    draw();
    animRef.current = requestAnimationFrame(loop);
  }, [update, draw]);

  // ─── Start / stop loop ────────────────────────────────────────────────────────
  useEffect(() => {
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [loop]);

  // ─── Keyboard shortcuts for game phase ───────────────────────────────────────
  useEffect(() => {
    const handlePhase = (e) => {
      const s = stateRef.current;
      if (e.key === " " && s.phase === "idle") {
        s.phase = "playing";
        syncUi();
      } else if (e.key === "p" || e.key === "P") {
        if (s.phase === "playing") { s.phase = "paused"; syncUi(); }
        else if (s.phase === "paused") { s.phase = "playing"; lastTimeRef.current = null; syncUi(); }
      } else if ((e.key === "r" || e.key === "R") && s.phase === "gameover") {
        stateRef.current = createInitialState();
        stateRef.current.phase = "playing";
        syncUi();
      }
    };
    window.addEventListener("keydown", handlePhase);
    return () => window.removeEventListener("keydown", handlePhase);
  }, [syncUi]);

  // ─── UI helpers ───────────────────────────────────────────────────────────────
  const handleStart = () => {
    stateRef.current.phase = "playing";
    syncUi();
  };

  const handlePause = () => {
    const s = stateRef.current;
    s.phase = s.phase === "paused" ? "playing" : "paused";
    if (s.phase === "playing") lastTimeRef.current = null;
    syncUi();
  };

  const handleRestart = () => {
    stateRef.current = createInitialState();
    stateRef.current.phase = "playing";
    syncUi();
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={styles.wrapper}>
      {/* HUD */}
      <div style={styles.hud}>
        <span style={styles.hudItem}>Score: <strong>{ui.score}</strong></span>
        <span style={styles.hudItem}>Lives: <strong>{ui.lives}</strong></span>
        <span style={styles.hudPhase}>{ui.phase.toUpperCase()}</span>
        <div style={styles.hudControls}>
          {ui.phase === "idle" && (
            <button style={styles.btn} onClick={handleStart}>Start</button>
          )}
          {(ui.phase === "playing" || ui.phase === "paused") && (
            <button style={styles.btn} onClick={handlePause}>
              {ui.phase === "paused" ? "Resume" : "Pause"}
            </button>
          )}
          {ui.phase === "gameover" && (
            <button style={styles.btn} onClick={handleRestart}>Restart</button>
          )}
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} style={styles.canvas} />

      {/* Key legend */}
      <div style={styles.legend}>
        WASD / Arrow keys to move · P to pause · Space to start
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    background: "#020617",
    fontFamily: "monospace",
    color: "#e2e8f0",
    userSelect: "none",
  },
  hud: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    padding: "0.75rem 1.25rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "#0f172a",
    flexShrink: 0,
  },
  hudItem: {
    fontSize: "14px",
    color: "#94a3b8",
  },
  hudPhase: {
    fontSize: "11px",
    letterSpacing: "0.1em",
    color: "#38bdf8",
    marginLeft: "auto",
  },
  hudControls: {
    display: "flex",
    gap: "8px",
  },
  btn: {
    padding: "4px 14px",
    fontSize: "13px",
    fontFamily: "monospace",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "6px",
    background: "transparent",
    color: "#e2e8f0",
    cursor: "pointer",
  },
  canvas: {
    flex: 1,
    width: "100%",
    display: "block",
    outline: "none",
  },
  legend: {
    padding: "6px 1.25rem",
    fontSize: "11px",
    color: "#475569",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    flexShrink: 0,
  },
};
