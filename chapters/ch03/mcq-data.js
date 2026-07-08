const MCQs = [
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.1 Why Do We Need to Classify Elements?",
    page: 74,
    qNum: 1,
    text: "Why do we need to classify elements?",
    options: [
      "To calculate entropy change",
      "To make an easy and systematic way to study about the elements.",
      "To calculate enthalpy change",
      "To determine activation energy of elements."
    ],
    correctOption: 1,
    explanation: "Classification of elements organizes them into groups with similar properties, which makes their study much easier and more systematic compared to studying them individually."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.2 Genesis of Periodic Classification",
    page: 75,
    qNum: 2,
    text: "According to the law of triads,",
    options: [
      "the properties of the middle element were in between those of the other two members",
      "three elements arranged according to increasing weights have similar properties",
      "the elements can be grouped in the groups of six elements",
      "every third element resembles the first element in periodic table."
    ],
    correctOption: 0,
    explanation: "Johann Dobereiner noted that in a triad of elements with similar properties, the atomic weight and the properties of the middle element were approximately midway between those of the other two members."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.2 Genesis of Periodic Classification",
    page: 75,
    qNum: 3,
    text: "Law of octaves stated,",
    options: [
      "every eighth element had properties similar to the first element",
      "every third element had properties similar to the first element",
      "the properties of the middle element were in between the other two members",
      "the properties of the elements were repeated after regular intervals of 3, 4 or 8 elements."
    ],
    correctOption: 0,
    explanation: "John Newlands' Law of Octaves states that when elements are arranged in increasing order of their atomic weights, every eighth element has properties similar to the first element, much like musical octaves."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.2 Genesis of Periodic Classification",
    page: 76,
    qNum: 4,
    text: "The first periodic law stated by Mendeleev was",
    options: [
      "there is no correlation in the properties and atomic weights of the elements",
      "the properties of the elements are a periodic function of their atomic numbers",
      "the properties of the elements are a periodic function of their atomic weights",
      "the properties of the elements are a periodic function of their empirical formula."
    ],
    correctOption: 2,
    explanation: "Mendeleev's Periodic Law states that the properties of the elements are a periodic function of their atomic weights (masses)."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.2 Genesis of Periodic Classification",
    page: 76,
    qNum: 5,
    text: "Which of the following is/are merits of Mendeleev's periodic table?<br>A. It helped in correcting the atomic masses of some of the elements.<br>B. He predicted the properties of some undiscovered elements and left gaps for them.<br>C. He framed the periodic table with vertical and horizontal columns and gave shape to it.<br>D. He gave separate places to isotopes in his periodic table.<br>E. He ignored the order of atomic weights at few places.",
    options: [
      "A, B and D",
      "B, C and D",
      "A and E",
      "A, B, C and E"
    ],
    correctOption: 3,
    explanation: "Mendeleev did not give separate places to isotopes (which was a demerit, not a merit). Statements A, B, C, and E are true merits: he corrected masses, left gaps for elements like Gallium, structured the table into rows and columns, and famously ignored strict atomic weight order (like Te and I) to group elements with similar properties."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.2 Genesis of Periodic Classification",
    page: 76,
    qNum: 6,
    text: "What were the main demerits of Mendeleev's periodic table?<br>(i) Hydrogen has been placed in group I though it resembles to group VII as well.<br>(ii) Positions of some elements were not justified.<br>(iii) Isotopes were not given separate places.<br>(iv) Lanthanides and actinides were not included in the table.",
    options: [
      "(i), (ii) and (iii)",
      "(i), (ii), (iii) and (iv)",
      "(ii) and (iv)",
      "(i), (iii) and (iv)"
    ],
    correctOption: 1,
    explanation: "All the listed points are known demerits of Mendeleev's periodic table. He couldn't assign a fixed position to Hydrogen, could not justify all elemental positions (like anomalous pairs), had no place for isotopes since they have different masses but same properties, and lanthanides/actinides were not accommodated in the main table framework."
  },
  {
    category: "Assertion & Reason Questions",
    topic: "3.2 Genesis of Periodic Classification",
    page: 72, // Assuming page 72 from pdf screenshot 11 is where A&R start
    qNum: 1,
    text: "<b>Assertion :</b> According to Mendeleev, the properties of elements are a periodic function of their atomic weights.<br><b>Reason :</b> Mendeleev left the gap under aluminium and a gap under silicon, and called these elements Eka-Aluminium and Eka-Silicon.",
    options: [
      "If both assertion and reason are true and reason is the correct explanation of assertion.",
      "If both assertion and reason are true but reason is not the correct explanation of assertion.",
      "If assertion is true but reason is false.",
      "If both assertion and reason are false."
    ],
    correctOption: 1,
    explanation: "Both statements are factually true. Mendeleev's periodic law states that properties depend on atomic weight. He also left predictive gaps (like Eka-Aluminium). However, the reason is not the fundamental explanation for the assertion. The assertion is the fundamental law itself."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.3 Modern Periodic Law, Present Periodic Table",
    page: 78,
    qNum: 7,
    text: "The statements that are true for the long form of the periodic table are<br>A. it reflects the sequence of filling the electrons in the order of sub-energy level s, p, d and f.<br>B. it helps to predict the stable valence states of the elements<br>C. it reflects trends in physical and chemical properties of the elements<br>D. it helps to predict the relative ionicity of the bond between any two elements.",
    options: ["A, B and C", "B, C and D", "A, C and D", "B and D"],
    correctOption: 1,
    explanation: "Statements B, C, and D are true. It does not perfectly reflect the exact energy sequence for all elements due to anomalies in electron filling."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.3 Modern Periodic Law, Present Periodic Table",
    page: 78,
    qNum: 8,
    text: "Mosely observed regularities in the characteristic X-ray spectra of elements. When frequency to the power 'n' i.e. ν^n of X-rays emitted is plotted against atomic number 'Z', following graph is obtained. The value of 'n' is",
    options: ["2", "3", "1", "1/2"],
    correctOption: 3,
    explanation: "Henry Moseley plotted the square root of frequency (\\(\\sqrt{\\nu}\\) or \\(\\nu^{1/2}\\)) against atomic number (Z) and got a straight line, proving atomic number is a more fundamental property."
  },
  {
    category: "Assertion & Reason Questions",
    topic: "3.3 Modern Periodic Law, Present Periodic Table",
    page: 72,
    qNum: 2,
    text: "<b>Assertion :</b> Atomic number is a more fundamental property of an element than its atomic mass.<br><b>Reason :</b> Atomic number is equal to number of protons in an atom.",
    options: [
      "If both assertion and reason are true and reason is the correct explanation of assertion.",
      "If both assertion and reason are true but reason is not the correct explanation of assertion.",
      "If assertion is true but reason is false.",
      "If both assertion and reason are false."
    ],
    correctOption: 1,
    explanation: "Both statements are true. However, the reason it's more fundamental is based on Moseley's X-ray experiment, not simply because it equals the proton count."
  },
  {
    category: "Assertion & Reason Questions",
    topic: "3.3 Modern Periodic Law, Present Periodic Table",
    page: 72,
    qNum: 3,
    text: "<b>Assertion :</b> In the present form of periodic table, the period number corresponds to the highest principal quantum number of the elements in the period.<br><b>Reason :</b> Elements having similar outer electronic configurations in their atoms belong to same period.",
    options: [
      "If both assertion and reason are true and reason is the correct explanation of assertion.",
      "If both assertion and reason are true but reason is not the correct explanation of assertion.",
      "If assertion is true but reason is false.",
      "If both assertion and reason are false."
    ],
    correctOption: 2,
    explanation: "The assertion is true, but the reason is false. Elements with similar outer electronic configurations belong to the same GROUP, not the same period."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.4-3.5 Nomenclature of Elements Z>100, Electronic Configuration",
    page: 80,
    qNum: 9,
    text: "An element with atomic number 117 is known as",
    options: ["Nihonium", "Flerovium", "Tennessine", "Roentgenium"],
    correctOption: 2,
    explanation: "Z=117 is Tennessine (Ts)."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.4-3.5 Nomenclature of Elements Z>100, Electronic Configuration",
    page: 80,
    qNum: 10,
    text: "Meitnerium is the IUPAC official name of an element with atomic number",
    options: ["113", "118", "104", "109"],
    correctOption: 3,
    explanation: "Z=109 is Meitnerium (Mt)."
  },
  {
    category: "Exam Archive",
    topic: "3.4-3.5 Nomenclature of Elements Z>100, Electronic Configuration",
    page: 78,
    qNum: 9,
    text: "The IUPAC name of an element with atomic number 119 is",
    options: ["ununennium", "unnilennium", "unununnium", "ununoctium"],
    correctOption: 0,
    explanation: "1 = un, 1 = un, 9 = enn. Thus un-un-ennium."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.4-3.5 Nomenclature of Elements Z>100, Electronic Configuration",
    page: 81,
    qNum: 11,
    text: "The period to which an element belongs to in the long form of periodic table represents",
    options: ["atomic mass", "atomic number", "principal quantum number", "azimuthal quantum number"],
    correctOption: 2,
    explanation: "The period number indicates the highest principal quantum number (n) of the element's atoms."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.4-3.5 Nomenclature of Elements Z>100, Electronic Configuration",
    page: 81,
    qNum: 14,
    text: "The number of elements in the 4th period of periodic table is",
    options: ["8", "10", "18", "32"],
    correctOption: 2,
    explanation: "The 4th period fills the 4s, 3d, and 4p orbitals: 2 + 10 + 6 = 18 elements."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.6-3.7 s,p,d,f Blocks, Atomic Radius (completes Ch3)",
    page: 82,
    qNum: 20,
    text: "Atomic numbers of few elements are given below. Which of the pairs belongs to s-block?",
    options: ["7, 14", "3, 20", "8, 15", "9, 17"],
    correctOption: 1,
    explanation: "Z=3 is Lithium (Group 1) and Z=20 is Calcium (Group 2), both belong to the s-block."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.6-3.7 s,p,d,f Blocks, Atomic Radius (completes Ch3)",
    page: 84,
    qNum: 22,
    text: "Find the incorrect match.",
    options: ["Pnictogen - Mc", "Chalcogen - Og", "Halogen - Ts", "Alkali metal - Fr"],
    correctOption: 1,
    explanation: "Og is Oganesson (Z=118), which is a noble gas, not a chalcogen (Group 16)."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.6-3.7 s,p,d,f Blocks, Atomic Radius (completes Ch3)",
    page: 85,
    qNum: 39,
    text: "Which of the following is not a periodic property for the elements?",
    options: ["Electronegativity", "Atomic size", "Occurrence in nature", "Ionization energy"],
    correctOption: 2,
    explanation: "Occurrence in nature depends on geochemical and astrophysical processes, not purely periodic properties like size and energy."
  },
  {
    category: "NCERT Extract (MCQs CORNER)",
    topic: "3.6-3.7 s,p,d,f Blocks, Atomic Radius (completes Ch3)",
    page: 87,
    qNum: 43,
    text: "Ionic radius in a group while moving down",
    options: ["remains same from top to bottom", "decreases from top to bottom", "increases from top to bottom", "first increases and then decreases"],
    correctOption: 2,
    explanation: "As we move down a group, new electron shells are added, which increases the overall ionic radius."
  }
];
