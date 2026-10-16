// MHT-CET syllabus: 12th std ≈ 80% weightage, 11th std ≈ 20%.
// `weight` is an approximate priority (1–3) from PYQ trends, used to order the planner.
export type Subject = "Physics" | "Chemistry" | "Maths" | "Biology";
export type Chapter = { id: string; subject: Subject; name: string; std: 11 | 12; weight: 1 | 2 | 3 };

const mk = (subject: Subject, std: 11 | 12, list: [string, 1 | 2 | 3][]): Chapter[] =>
  list.map(([name, weight]) => ({
    id: `${subject[0]}${std}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    subject,
    name,
    std,
    weight,
  }));

export const CHAPTERS: Chapter[] = [
  ...mk("Physics", 12, [
    ["Rotational Dynamics", 3], ["Mechanical Properties of Fluids", 2], ["Kinetic Theory of Gases & Radiation", 2],
    ["Thermodynamics", 2], ["Oscillations", 3], ["Superposition of Waves", 2], ["Wave Optics", 2],
    ["Electrostatics", 3], ["Current Electricity", 3], ["Magnetic Fields due to Electric Current", 2],
    ["Magnetic Materials", 1], ["Electromagnetic Induction", 3], ["AC Circuits", 2],
    ["Dual Nature of Radiation & Matter", 2], ["Structure of Atoms & Nuclei", 2], ["Semiconductor Devices", 3],
  ]),
  ...mk("Physics", 11, [["Motion in a Plane", 1], ["Laws of Motion", 1], ["Gravitation", 2], ["Thermal Properties of Matter", 1], ["Sound", 1], ["Optics", 2], ["Electrostatics (11th)", 1], ["Semiconductors (11th)", 1]]),
  ...mk("Chemistry", 12, [
    ["Solid State", 2], ["Solutions", 3], ["Ionic Equilibria", 2], ["Chemical Thermodynamics", 3],
    ["Electrochemistry", 3], ["Chemical Kinetics", 2], ["Elements of Groups 16, 17 & 18", 2],
    ["Transition & Inner Transition Elements", 2], ["Coordination Compounds", 3], ["Halogen Derivatives", 2],
    ["Alcohols, Phenols & Ethers", 3], ["Aldehydes, Ketones & Carboxylic Acids", 3], ["Amines", 2],
    ["Biomolecules", 2], ["Introduction to Polymer Chemistry", 1], ["Green Chemistry & Nanochemistry", 1],
  ]),
  ...mk("Chemistry", 11, [["Basic Concepts of Chemistry", 1], ["Structure of Atom", 1], ["Chemical Bonding", 2], ["Redox Reactions", 1], ["Elements of Group 1 & 2", 1], ["States of Matter", 1], ["Adsorption & Colloids", 1], ["Hydrocarbons", 2], ["Basic Principles of Organic Chemistry", 2]]),
  ...mk("Maths", 12, [
    ["Mathematical Logic", 2], ["Matrices", 2], ["Trigonometric Functions", 3], ["Pair of Straight Lines", 2],
    ["Vectors", 3], ["Line & Plane", 3], ["Linear Programming", 2], ["Differentiation", 3],
    ["Applications of Derivatives", 2], ["Indefinite Integration", 3], ["Definite Integration", 3],
    ["Application of Definite Integration", 2], ["Differential Equations", 2], ["Probability Distribution", 2],
    ["Binomial Distribution", 2],
  ]),
  ...mk("Maths", 11, [["Trigonometry II", 1], ["Straight Line", 1], ["Circle", 2], ["Conic Sections", 2], ["Measures of Dispersion", 1], ["Probability", 2], ["Complex Numbers", 1], ["Permutations & Combinations", 2], ["Functions", 1], ["Limits", 1], ["Continuity", 1]]),
  ...mk("Biology", 12, [
    ["Reproduction in Lower & Higher Plants", 3], ["Reproduction in Lower & Higher Animals", 3], ["Inheritance & Variation", 3],
    ["Molecular Basis of Inheritance", 3], ["Origin & Evolution of Life", 2], ["Plant Water Relation", 2],
    ["Plant Growth & Mineral Nutrition", 2], ["Respiration & Circulation", 3], ["Control & Coordination", 3],
    ["Human Health & Diseases", 2], ["Enhancement of Food Production", 2], ["Biotechnology", 3],
    ["Organisms & Populations", 2], ["Ecosystems & Energy Flow", 2], ["Biodiversity, Conservation & Environmental Issues", 2],
  ]),
  ...mk("Biology", 11, [["Biomolecules (11th)", 1], ["Respiration & Energy Transfer", 1], ["Human Nutrition", 2], ["Excretion & Osmoregulation", 2], ["Skeleton & Movement", 1], ["Cell Division", 2], ["Plant Tissues & Anatomy", 1]]),
];

export type Stream = "PCM" | "PCB";
export const subjectsFor = (s: Stream): Subject[] =>
  s === "PCM" ? ["Physics", "Chemistry", "Maths"] : ["Physics", "Chemistry", "Biology"];
