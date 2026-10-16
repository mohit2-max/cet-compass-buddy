export type Formula = { id: string; subject: "Physics" | "Chemistry" | "Maths" | "Biology"; chapter: string; title: string; expr: string; note: string; stars: 1 | 2 | 3 | 4 | 5 };

export const FORMULAS: Formula[] = [
  { id: "m-skew", subject: "Maths", chapter: "Vectors & 3D", title: "Shortest distance between skew lines", expr: "d = | (a₂ − a₁) · (b₁ × b₂) | / | b₁ × b₂ |", note: "Asked almost every shift. If lines intersect, d = 0.", stars: 5 },
  { id: "m-plane", subject: "Maths", chapter: "Line & Plane", title: "Distance of a point from a plane", expr: "d = | ax₁ + by₁ + cz₁ + d | / √(a² + b² + c²)", note: "Direct 2-mark question. Memorise the sign-free form.", stars: 5 },
  { id: "m-pair", subject: "Maths", chapter: "Pair of Straight Lines", title: "Angle between lines ax² + 2hxy + by² = 0", expr: "tan θ = | 2√(h² − ab) / (a + b) |", note: "a + b = 0 ⇒ perpendicular. h² = ab ⇒ coincident.", stars: 4 },
  { id: "m-binom", subject: "Maths", chapter: "Binomial Distribution", title: "Mean & variance", expr: "μ = np,   σ² = npq,   P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ", note: "Variance is always less than mean (q < 1).", stars: 4 },
  { id: "m-byparts", subject: "Maths", chapter: "Integration", title: "Integration by parts (ILATE)", expr: "∫ u v dx = u ∫v dx − ∫ ( u′ ∫v dx ) dx", note: "∫ eˣ [ f(x) + f′(x) ] dx = eˣ f(x) + c — a CET favourite.", stars: 5 },
  { id: "m-king", subject: "Maths", chapter: "Definite Integration", title: "King's property", expr: "∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b − x) dx", note: "Use when the integrand has sin/cos or x and (a+b−x) symmetry.", stars: 5 },
  { id: "p-rot", subject: "Physics", chapter: "Rotational Dynamics", title: "Banking of roads", expr: "v_max = √( rg (μ + tan θ) / (1 − μ tan θ) )", note: "Without friction: tan θ = v² / rg.", stars: 5 },
  { id: "p-ydse", subject: "Physics", chapter: "Wave Optics", title: "YDSE fringe width", expr: "β = λD / d", note: "In a medium of index μ, β′ = β / μ.", stars: 4 },
  { id: "p-shm", subject: "Physics", chapter: "Oscillations", title: "SHM velocity & energy", expr: "v = ω√(A² − x²),   E = ½ m ω² A²", note: "KE = PE at x = A/√2.", stars: 4 },
  { id: "p-wheat", subject: "Physics", chapter: "Current Electricity", title: "Wheatstone / Meter bridge", expr: "P/Q = R/S,   X = R (100 − l) / l", note: "Galvanometer and cell positions can be swapped.", stars: 4 },
  { id: "p-photo", subject: "Physics", chapter: "Dual Nature", title: "Photoelectric equation", expr: "hν = φ₀ + ½ m v²max,   eV₀ = hν − φ₀", note: "Stopping potential doesn't depend on intensity.", stars: 5 },
  { id: "p-gauss", subject: "Physics", chapter: "Electrostatics", title: "Capacitor energy", expr: "U = ½ CV² = Q² / 2C,   C = Kε₀A / d", note: "Battery removed ⇒ Q constant. Connected ⇒ V constant.", stars: 4 },
  { id: "c-nernst", subject: "Chemistry", chapter: "Electrochemistry", title: "Nernst equation (298 K)", expr: "E = E° − (0.0592 / n) log Q", note: "ΔG° = −nFE°. Positive E° ⇒ spontaneous cell.", stars: 5 },
  { id: "c-first", subject: "Chemistry", chapter: "Chemical Kinetics", title: "First-order rate constant", expr: "k = (2.303 / t) log ( [A]₀ / [A] ),   t½ = 0.693 / k", note: "t₉₉.₉% ≈ 10 × t½.", stars: 5 },
  { id: "c-colli", subject: "Chemistry", chapter: "Solutions", title: "Colligative properties", expr: "ΔT_b = i K_b m,   π = i CRT", note: "i > 1 for dissociation, i < 1 for association.", stars: 4 },
  { id: "c-gibbs", subject: "Chemistry", chapter: "Thermodynamics", title: "Gibbs free energy", expr: "ΔG = ΔH − TΔS,   ΔG° = −2.303 RT log K", note: "ΔG < 0 ⇒ spontaneous.", stars: 4 },
  { id: "c-solid", subject: "Chemistry", chapter: "Solid State", title: "Density of unit cell", expr: "ρ = z M / (a³ Nₐ)", note: "z: sc = 1, bcc = 2, fcc = 4.", stars: 4 },
  { id: "b-hardy", subject: "Biology", chapter: "Origin & Evolution", title: "Hardy–Weinberg", expr: "p² + 2pq + q² = 1,   p + q = 1", note: "Assumes no mutation, migration, selection or drift.", stars: 4 },
  { id: "b-pop", subject: "Biology", chapter: "Organisms & Populations", title: "Logistic growth", expr: "dN/dt = rN ( (K − N) / K )", note: "Exponential: dN/dt = rN.", stars: 3 },
];

export const formulaOfDay = (): Formula => {
  const d = new Date();
  const n = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate();
  return FORMULAS[n % FORMULAS.length]!;
};
