// MHT-CET pattern: Physics & Chemistry 1 mark each, Maths 2 marks, Biology 1 mark. No negative marking.
export type Question = { subject: "Physics" | "Chemistry" | "Maths" | "Biology"; q: string; options: string[]; answer: number; explain: string };
export type MockTest = { id: string; title: string; kind: string; minutes: number; premium: boolean; questions: Question[] };

export const MARKS: Record<Question["subject"], number> = { Physics: 1, Chemistry: 1, Maths: 2, Biology: 1 };

const pcmMini: Question[] = [
  { subject: "Physics", q: "A disc of moment of inertia I rotates with angular speed ω. If its radius of gyration doubles keeping mass constant, its new moment of inertia is:", options: ["I/2", "2I", "4I", "I/4"], answer: 2, explain: "I = MK². Doubling K multiplies I by 4." },
  { subject: "Physics", q: "The period of a simple pendulum on a planet where g is one-fourth of Earth's becomes:", options: ["Half", "Double", "Four times", "Unchanged"], answer: 1, explain: "T ∝ 1/√g. g/4 → T × 2." },
  { subject: "Physics", q: "In a p-n junction diode under forward bias, the depletion region:", options: ["Widens", "Narrows", "Stays same", "Disappears permanently"], answer: 1, explain: "Forward bias pushes majority carriers toward the junction, narrowing the depletion layer." },
  { subject: "Physics", q: "Two resistors of 6 Ω and 3 Ω in parallel give an equivalent resistance of:", options: ["9 Ω", "2 Ω", "4.5 Ω", "18 Ω"], answer: 1, explain: "6×3 / (6+3) = 2 Ω." },
  { subject: "Chemistry", q: "The coordination number of Co in [Co(en)₃]³⁺ is:", options: ["3", "4", "6", "9"], answer: 2, explain: "en is bidentate: 3 × 2 = 6." },
  { subject: "Chemistry", q: "Which is the strongest acid?", options: ["CH₃COOH", "ClCH₂COOH", "Cl₂CHCOOH", "Cl₃CCOOH"], answer: 3, explain: "More –I effect from Cl atoms stabilises the conjugate base." },
  { subject: "Chemistry", q: "For a first-order reaction, half-life is:", options: ["Proportional to [A]₀", "Independent of [A]₀", "Inversely proportional to [A]₀", "Proportional to [A]₀²"], answer: 1, explain: "t½ = 0.693/k, no concentration term." },
  { subject: "Chemistry", q: "Elevation in boiling point is a ____ property.", options: ["Additive", "Constitutive", "Colligative", "Intensive only"], answer: 2, explain: "It depends on the number of solute particles — colligative." },
  { subject: "Maths", q: "The negation of 'p ∧ q' is:", options: ["~p ∧ ~q", "~p ∨ ~q", "p ∨ q", "~p → q"], answer: 1, explain: "De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q." },
  { subject: "Maths", q: "∫ eˣ (sin x + cos x) dx =", options: ["eˣ cos x + c", "eˣ sin x + c", "−eˣ sin x + c", "eˣ (sin x − cos x) + c"], answer: 1, explain: "∫eˣ(f + f′)dx = eˣ f + c with f = sin x." },
  { subject: "Maths", q: "If X ~ B(n = 10, p = 0.4), then Var(X) =", options: ["4", "2.4", "6", "1.6"], answer: 1, explain: "npq = 10 × 0.4 × 0.6 = 2.4." },
  { subject: "Maths", q: "The angle between the lines represented by x² − y² = 0 is:", options: ["0°", "45°", "90°", "60°"], answer: 2, explain: "a + b = 1 − 1 = 0, so the lines are perpendicular." },
];

const pcbMini: Question[] = [
  ...pcmMini.slice(0, 8),
  { subject: "Biology", q: "The triploid tissue in angiosperms is:", options: ["Nucellus", "Endosperm", "Integument", "Embryo"], answer: 1, explain: "Endosperm forms by triple fusion (3n)." },
  { subject: "Biology", q: "Okazaki fragments are formed on the:", options: ["Leading strand", "Lagging strand", "mRNA", "tRNA"], answer: 1, explain: "Discontinuous synthesis happens on the lagging strand." },
  { subject: "Biology", q: "Restriction enzyme EcoRI is obtained from:", options: ["Bacillus", "E. coli", "Agrobacterium", "Streptomyces"], answer: 1, explain: "Eco = Escherichia coli, R = strain RY13." },
  { subject: "Biology", q: "The pacemaker of the human heart is the:", options: ["AV node", "SA node", "Bundle of His", "Purkinje fibres"], answer: 1, explain: "SA node initiates each heartbeat." },
];

export const TESTS: MockTest[] = [
  { id: "pcm-starter", title: "PCM Starter Mock", kind: "Mixed · 12 Qs", minutes: 20, premium: false, questions: pcmMini },
  { id: "pcb-starter", title: "PCB Starter Mock", kind: "Mixed · 12 Qs", minutes: 20, premium: false, questions: pcbMini },
  { id: "pyq-2025-s1", title: "PYQ 2025 · Shift 1 (memory-based)", kind: "Full · 150 Qs", minutes: 180, premium: true, questions: [] },
  { id: "pyq-2024-s2", title: "PYQ 2024 · Shift 2 (memory-based)", kind: "Full · 150 Qs", minutes: 180, premium: true, questions: [] },
  { id: "full-mock-01", title: "CET-Level Full Mock #01", kind: "Full · 150 Qs", minutes: 180, premium: true, questions: [] },
  { id: "full-mock-02", title: "CET-Level Full Mock #02", kind: "Full · 150 Qs", minutes: 180, premium: true, questions: [] },
  { id: "chapter-maths-calculus", title: "Chapter Test · Integration", kind: "Chapter · 25 Qs", minutes: 45, premium: true, questions: [] },
  { id: "chapter-chem-organic", title: "Chapter Test · Organic Named Reactions", kind: "Chapter · 25 Qs", minutes: 30, premium: true, questions: [] },
];
