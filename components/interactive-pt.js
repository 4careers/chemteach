/**
 * InteractivePT - Modern Periodic Table visualization
 * Features touch-friendly UI, dynamic Info Panel, Orbital Diagrams, and Atom Sim
 */
window.InteractivePT = (() => {
  const ELEMENTS = [
    { z: 1, sym: 'H', group: 1, period: 1, block: 's' },
    { z: 2, sym: 'He', group: 18, period: 1, block: 's' },
    { z: 3, sym: 'Li', group: 1, period: 2, block: 's' },
    { z: 4, sym: 'Be', group: 2, period: 2, block: 's' },
    { z: 5, sym: 'B', group: 13, period: 2, block: 'p' },
    { z: 6, sym: 'C', group: 14, period: 2, block: 'p' },
    { z: 7, sym: 'N', group: 15, period: 2, block: 'p' },
    { z: 8, sym: 'O', group: 16, period: 2, block: 'p' },
    { z: 9, sym: 'F', group: 17, period: 2, block: 'p' },
    { z: 10, sym: 'Ne', group: 18, period: 2, block: 'p' },
    { z: 11, sym: 'Na', group: 1, period: 3, block: 's' },
    { z: 12, sym: 'Mg', group: 2, period: 3, block: 's' },
    { z: 13, sym: 'Al', group: 13, period: 3, block: 'p' },
    { z: 14, sym: 'Si', group: 14, period: 3, block: 'p' },
    { z: 15, sym: 'P', group: 15, period: 3, block: 'p' },
    { z: 16, sym: 'S', group: 16, period: 3, block: 'p' },
    { z: 17, sym: 'Cl', group: 17, period: 3, block: 'p' },
    { z: 18, sym: 'Ar', group: 18, period: 3, block: 'p' },
    { z: 19, sym: 'K', group: 1, period: 4, block: 's' },
    { z: 20, sym: 'Ca', group: 2, period: 4, block: 's' },
    { z: 21, sym: 'Sc', group: 3, period: 4, block: 'd' },
    { z: 22, sym: 'Ti', group: 4, period: 4, block: 'd' },
    { z: 23, sym: 'V', group: 5, period: 4, block: 'd' },
    { z: 24, sym: 'Cr', group: 6, period: 4, block: 'd' },
    { z: 25, sym: 'Mn', group: 7, period: 4, block: 'd' },
    { z: 26, sym: 'Fe', group: 8, period: 4, block: 'd' },
    { z: 27, sym: 'Co', group: 9, period: 4, block: 'd' },
    { z: 28, sym: 'Ni', group: 10, period: 4, block: 'd' },
    { z: 29, sym: 'Cu', group: 11, period: 4, block: 'd' },
    { z: 30, sym: 'Zn', group: 12, period: 4, block: 'd' },
    { z: 31, sym: 'Ga', group: 13, period: 4, block: 'p' },
    { z: 32, sym: 'Ge', group: 14, period: 4, block: 'p' },
    { z: 33, sym: 'As', group: 15, period: 4, block: 'p' },
    { z: 34, sym: 'Se', group: 16, period: 4, block: 'p' },
    { z: 35, sym: 'Br', group: 17, period: 4, block: 'p' },
    { z: 36, sym: 'Kr', group: 18, period: 4, block: 'p' },
    { z: 37, sym: 'Rb', group: 1, period: 5, block: 's' },
    { z: 38, sym: 'Sr', group: 2, period: 5, block: 's' },
    { z: 39, sym: 'Y', group: 3, period: 5, block: 'd' },
    { z: 40, sym: 'Zr', group: 4, period: 5, block: 'd' },
    { z: 41, sym: 'Nb', group: 5, period: 5, block: 'd' },
    { z: 42, sym: 'Mo', group: 6, period: 5, block: 'd' },
    { z: 43, sym: 'Tc', group: 7, period: 5, block: 'd' },
    { z: 44, sym: 'Ru', group: 8, period: 5, block: 'd' },
    { z: 45, sym: 'Rh', group: 9, period: 5, block: 'd' },
    { z: 46, sym: 'Pd', group: 10, period: 5, block: 'd' },
    { z: 47, sym: 'Ag', group: 11, period: 5, block: 'd' },
    { z: 48, sym: 'Cd', group: 12, period: 5, block: 'd' },
    { z: 49, sym: 'In', group: 13, period: 5, block: 'p' },
    { z: 50, sym: 'Sn', group: 14, period: 5, block: 'p' },
    { z: 51, sym: 'Sb', group: 15, period: 5, block: 'p' },
    { z: 52, sym: 'Te', group: 16, period: 5, block: 'p' },
    { z: 53, sym: 'I', group: 17, period: 5, block: 'p' },
    { z: 54, sym: 'Xe', group: 18, period: 5, block: 'p' },
    { z: 55, sym: 'Cs', group: 1, period: 6, block: 's' },
    { z: 56, sym: 'Ba', group: 2, period: 6, block: 's' },
    { z: 57, sym: 'La', group: 3, period: 6, block: 'd' },
    { z: 58, sym: 'Ce', group: null, period: 8, block: 'f' },
    { z: 59, sym: 'Pr', group: null, period: 8, block: 'f' },
    { z: 60, sym: 'Nd', group: null, period: 8, block: 'f' },
    { z: 61, sym: 'Pm', group: null, period: 8, block: 'f' },
    { z: 62, sym: 'Sm', group: null, period: 8, block: 'f' },
    { z: 63, sym: 'Eu', group: null, period: 8, block: 'f' },
    { z: 64, sym: 'Gd', group: null, period: 8, block: 'f' },
    { z: 65, sym: 'Tb', group: null, period: 8, block: 'f' },
    { z: 66, sym: 'Dy', group: null, period: 8, block: 'f' },
    { z: 67, sym: 'Ho', group: null, period: 8, block: 'f' },
    { z: 68, sym: 'Er', group: null, period: 8, block: 'f' },
    { z: 69, sym: 'Tm', group: null, period: 8, block: 'f' },
    { z: 70, sym: 'Yb', group: null, period: 8, block: 'f' },
    { z: 71, sym: 'Lu', group: null, period: 8, block: 'f' },
    { z: 72, sym: 'Hf', group: 4, period: 6, block: 'd' },
    { z: 73, sym: 'Ta', group: 5, period: 6, block: 'd' },
    { z: 74, sym: 'W', group: 6, period: 6, block: 'd' },
    { z: 75, sym: 'Re', group: 7, period: 6, block: 'd' },
    { z: 76, sym: 'Os', group: 8, period: 6, block: 'd' },
    { z: 77, sym: 'Ir', group: 9, period: 6, block: 'd' },
    { z: 78, sym: 'Pt', group: 10, period: 6, block: 'd' },
    { z: 79, sym: 'Au', group: 11, period: 6, block: 'd' },
    { z: 80, sym: 'Hg', group: 12, period: 6, block: 'd' },
    { z: 81, sym: 'Tl', group: 13, period: 6, block: 'p' },
    { z: 82, sym: 'Pb', group: 14, period: 6, block: 'p' },
    { z: 83, sym: 'Bi', group: 15, period: 6, block: 'p' },
    { z: 84, sym: 'Po', group: 16, period: 6, block: 'p' },
    { z: 85, sym: 'At', group: 17, period: 6, block: 'p' },
    { z: 86, sym: 'Rn', group: 18, period: 6, block: 'p' },
    { z: 87, sym: 'Fr', group: 1, period: 7, block: 's' },
    { z: 88, sym: 'Ra', group: 2, period: 7, block: 's' },
    { z: 89, sym: 'Ac', group: 3, period: 7, block: 'd' },
    { z: 90, sym: 'Th', group: null, period: 9, block: 'f' },
    { z: 91, sym: 'Pa', group: null, period: 9, block: 'f' },
    { z: 92, sym: 'U', group: null, period: 9, block: 'f' },
    { z: 93, sym: 'Np', group: null, period: 9, block: 'f' },
    { z: 94, sym: 'Pu', group: null, period: 9, block: 'f' },
    { z: 95, sym: 'Am', group: null, period: 9, block: 'f' },
    { z: 96, sym: 'Cm', group: null, period: 9, block: 'f' },
    { z: 97, sym: 'Bk', group: null, period: 9, block: 'f' },
    { z: 98, sym: 'Cf', group: null, period: 9, block: 'f' },
    { z: 99, sym: 'Es', group: null, period: 9, block: 'f' },
    { z: 100, sym: 'Fm', group: null, period: 9, block: 'f' },
    { z: 101, sym: 'Md', group: null, period: 9, block: 'f' },
    { z: 102, sym: 'No', group: null, period: 9, block: 'f' },
    { z: 103, sym: 'Lr', group: null, period: 9, block: 'f' },
    { z: 104, sym: 'Rf', group: 4, period: 7, block: 'd' },
    { z: 105, sym: 'Db', group: 5, period: 7, block: 'd' },
    { z: 106, sym: 'Sg', group: 6, period: 7, block: 'd' },
    { z: 107, sym: 'Bh', group: 7, period: 7, block: 'd' },
    { z: 108, sym: 'Hs', group: 8, period: 7, block: 'd' },
    { z: 109, sym: 'Mt', group: 9, period: 7, block: 'd' },
    { z: 110, sym: 'Ds', group: 10, period: 7, block: 'd' },
    { z: 111, sym: 'Rg', group: 11, period: 7, block: 'd' },
    { z: 112, sym: 'Cn', group: 12, period: 7, block: 'd' },
    { z: 113, sym: 'Nh', group: 13, period: 7, block: 'p' },
    { z: 114, sym: 'Fl', group: 14, period: 7, block: 'p' },
    { z: 115, sym: 'Mc', group: 15, period: 7, block: 'p' },
    { z: 116, sym: 'Lv', group: 16, period: 7, block: 'p' },
    { z: 117, sym: 'Ts', group: 17, period: 7, block: 'p' },
    { z: 118, sym: 'Og', group: 18, period: 7, block: 'p' }
  ];

  const ECONFS = {
  "1": {
    "name": "Hydrogen",
    "mass": 1.008,
    "html": "1s<sup>1</sup>",
    "valence": [
      {
        "subshell": "1s",
        "e": 1
      }
    ],
    "shells": [
      1
    ]
  },
  "2": {
    "name": "Helium",
    "mass": 4.003,
    "html": "1s<sup>2</sup>",
    "valence": [
      {
        "subshell": "1s",
        "e": 2
      }
    ],
    "shells": [
      2
    ]
  },
  "3": {
    "name": "Lithium",
    "mass": 6.94,
    "html": "[He] 2s<sup>1</sup>",
    "valence": [
      {
        "subshell": "2s",
        "e": 1
      }
    ],
    "shells": [
      2,
      1
    ]
  },
  "4": {
    "name": "Beryllium",
    "mass": 9.012,
    "html": "[He] 2s<sup>2</sup>",
    "valence": [
      {
        "subshell": "2s",
        "e": 2
      }
    ],
    "shells": [
      2,
      2
    ]
  },
  "5": {
    "name": "Boron",
    "mass": 10.81,
    "html": "[He] 2s<sup>2</sup> 2p<sup>1</sup>",
    "valence": [
      {
        "subshell": "2s",
        "e": 2
      },
      {
        "subshell": "2p",
        "e": 1
      }
    ],
    "shells": [
      2,
      3
    ]
  },
  "6": {
    "name": "Carbon",
    "mass": 12.011,
    "html": "[He] 2s<sup>2</sup> 2p<sup>2</sup>",
    "valence": [
      {
        "subshell": "2s",
        "e": 2
      },
      {
        "subshell": "2p",
        "e": 2
      }
    ],
    "shells": [
      2,
      4
    ]
  },
  "7": {
    "name": "Nitrogen",
    "mass": 14.007,
    "html": "[He] 2s<sup>2</sup> 2p<sup>3</sup>",
    "valence": [
      {
        "subshell": "2s",
        "e": 2
      },
      {
        "subshell": "2p",
        "e": 3
      }
    ],
    "shells": [
      2,
      5
    ]
  },
  "8": {
    "name": "Oxygen",
    "mass": 15.999,
    "html": "[He] 2s<sup>2</sup> 2p<sup>4</sup>",
    "valence": [
      {
        "subshell": "2s",
        "e": 2
      },
      {
        "subshell": "2p",
        "e": 4
      }
    ],
    "shells": [
      2,
      6
    ]
  },
  "9": {
    "name": "Fluorine",
    "mass": 18.998,
    "html": "[He] 2s<sup>2</sup> 2p<sup>5</sup>",
    "valence": [
      {
        "subshell": "2s",
        "e": 2
      },
      {
        "subshell": "2p",
        "e": 5
      }
    ],
    "shells": [
      2,
      7
    ]
  },
  "10": {
    "name": "Neon",
    "mass": 20.18,
    "html": "[He] 2s<sup>2</sup> 2p<sup>6</sup>",
    "valence": [
      {
        "subshell": "2s",
        "e": 2
      },
      {
        "subshell": "2p",
        "e": 6
      }
    ],
    "shells": [
      2,
      8
    ]
  },
  "11": {
    "name": "Sodium",
    "mass": 22.99,
    "html": "[Ne] 3s<sup>1</sup>",
    "valence": [
      {
        "subshell": "3s",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      1
    ]
  },
  "12": {
    "name": "Magnesium",
    "mass": 24.305,
    "html": "[Ne] 3s<sup>2</sup>",
    "valence": [
      {
        "subshell": "3s",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      2
    ]
  },
  "13": {
    "name": "Aluminum",
    "mass": 26.982,
    "html": "[Ne] 3s<sup>2</sup> 3p<sup>1</sup>",
    "valence": [
      {
        "subshell": "3s",
        "e": 2
      },
      {
        "subshell": "3p",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      3
    ]
  },
  "14": {
    "name": "Silicon",
    "mass": 28.085,
    "html": "[Ne] 3s<sup>2</sup> 3p<sup>2</sup>",
    "valence": [
      {
        "subshell": "3s",
        "e": 2
      },
      {
        "subshell": "3p",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      4
    ]
  },
  "15": {
    "name": "Phosphorus",
    "mass": 30.974,
    "html": "[Ne] 3s<sup>2</sup> 3p<sup>3</sup>",
    "valence": [
      {
        "subshell": "3s",
        "e": 2
      },
      {
        "subshell": "3p",
        "e": 3
      }
    ],
    "shells": [
      2,
      8,
      5
    ]
  },
  "16": {
    "name": "Sulfur",
    "mass": 32.06,
    "html": "[Ne] 3s<sup>2</sup> 3p<sup>4</sup>",
    "valence": [
      {
        "subshell": "3s",
        "e": 2
      },
      {
        "subshell": "3p",
        "e": 4
      }
    ],
    "shells": [
      2,
      8,
      6
    ]
  },
  "17": {
    "name": "Chlorine",
    "mass": 35.45,
    "html": "[Ne] 3s<sup>2</sup> 3p<sup>5</sup>",
    "valence": [
      {
        "subshell": "3s",
        "e": 2
      },
      {
        "subshell": "3p",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      7
    ]
  },
  "18": {
    "name": "Argon",
    "mass": 39.95,
    "html": "[Ne] 3s<sup>2</sup> 3p<sup>6</sup>",
    "valence": [
      {
        "subshell": "3s",
        "e": 2
      },
      {
        "subshell": "3p",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      8
    ]
  },
  "19": {
    "name": "Potassium",
    "mass": 39.1,
    "html": "[Ar] 4s<sup>1</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      8,
      1
    ]
  },
  "20": {
    "name": "Calcium",
    "mass": 40.08,
    "html": "[Ar] 4s<sup>2</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      8,
      2
    ]
  },
  "21": {
    "name": "Scandium",
    "mass": 44.96,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>1</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      9,
      2
    ]
  },
  "22": {
    "name": "Titanium",
    "mass": 47.87,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>2</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      10,
      2
    ]
  },
  "23": {
    "name": "Vanadium",
    "mass": 50.94,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>3</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 3
      }
    ],
    "shells": [
      2,
      8,
      11,
      2
    ]
  },
  "24": {
    "name": "Chromium",
    "mass": 52.0,
    "html": "[Ar] 4s<sup>1</sup> 3d<sup>5</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 1
      },
      {
        "subshell": "3d",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      13,
      1
    ]
  },
  "25": {
    "name": "Manganese",
    "mass": 54.94,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>5</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      13,
      2
    ]
  },
  "26": {
    "name": "Iron",
    "mass": 55.85,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>6</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      14,
      2
    ]
  },
  "27": {
    "name": "Cobalt",
    "mass": 58.93,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>7</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 7
      }
    ],
    "shells": [
      2,
      8,
      15,
      2
    ]
  },
  "28": {
    "name": "Nickel",
    "mass": 58.69,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>8</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 8
      }
    ],
    "shells": [
      2,
      8,
      16,
      2
    ]
  },
  "29": {
    "name": "Copper",
    "mass": 63.55,
    "html": "[Ar] 4s<sup>1</sup> 3d<sup>10</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 1
      },
      {
        "subshell": "3d",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      1
    ]
  },
  "30": {
    "name": "Zinc",
    "mass": 65.38,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      2
    ]
  },
  "31": {
    "name": "Gallium",
    "mass": 69.72,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>1</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 10
      },
      {
        "subshell": "4p",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      3
    ]
  },
  "32": {
    "name": "Germanium",
    "mass": 72.63,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>2</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 10
      },
      {
        "subshell": "4p",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      4
    ]
  },
  "33": {
    "name": "Arsenic",
    "mass": 74.92,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>3</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 10
      },
      {
        "subshell": "4p",
        "e": 3
      }
    ],
    "shells": [
      2,
      8,
      18,
      5
    ]
  },
  "34": {
    "name": "Selenium",
    "mass": 78.97,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>4</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 10
      },
      {
        "subshell": "4p",
        "e": 4
      }
    ],
    "shells": [
      2,
      8,
      18,
      6
    ]
  },
  "35": {
    "name": "Bromine",
    "mass": 79.9,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>5</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 10
      },
      {
        "subshell": "4p",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      18,
      7
    ]
  },
  "36": {
    "name": "Krypton",
    "mass": 83.8,
    "html": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>6</sup>",
    "valence": [
      {
        "subshell": "4s",
        "e": 2
      },
      {
        "subshell": "3d",
        "e": 10
      },
      {
        "subshell": "4p",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      18,
      8
    ]
  },
  "37": {
    "name": "Rubidium",
    "mass": 85.47,
    "html": "[Kr] 5s<sup>1</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      8,
      1
    ]
  },
  "38": {
    "name": "Strontium",
    "mass": 87.62,
    "html": "[Kr] 5s<sup>2</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      8,
      2
    ]
  },
  "39": {
    "name": "Yttrium",
    "mass": 88.91,
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>1</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      9,
      2
    ]
  },
  "40": {
    "name": "Zirconium",
    "mass": 91.22,
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>2</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      10,
      2
    ]
  },
  "41": {
    "name": "Niobium",
    "mass": 92.91,
    "html": "[Kr] 5s<sup>1</sup> 4d<sup>4</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 1
      },
      {
        "subshell": "4d",
        "e": 4
      }
    ],
    "shells": [
      2,
      8,
      18,
      12,
      1
    ]
  },
  "42": {
    "name": "Molybdenum",
    "mass": 95.95,
    "html": "[Kr] 5s<sup>1</sup> 4d<sup>5</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 1
      },
      {
        "subshell": "4d",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      18,
      13,
      1
    ]
  },
  "43": {
    "name": "Technetium",
    "mass": "(98)",
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>5</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      18,
      13,
      2
    ]
  },
  "44": {
    "name": "Ruthenium",
    "mass": 101.07,
    "html": "[Kr] 5s<sup>1</sup> 4d<sup>7</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 1
      },
      {
        "subshell": "4d",
        "e": 7
      }
    ],
    "shells": [
      2,
      8,
      18,
      15,
      1
    ]
  },
  "45": {
    "name": "Rhodium",
    "mass": 102.91,
    "html": "[Kr] 5s<sup>1</sup> 4d<sup>8</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 1
      },
      {
        "subshell": "4d",
        "e": 8
      }
    ],
    "shells": [
      2,
      8,
      18,
      16,
      1
    ]
  },
  "46": {
    "name": "Palladium",
    "mass": 106.42,
    "html": "[Kr] 4d<sup>10</sup>",
    "valence": [
      {
        "subshell": "4d",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      18
    ]
  },
  "47": {
    "name": "Silver",
    "mass": 107.87,
    "html": "[Kr] 5s<sup>1</sup> 4d<sup>10</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 1
      },
      {
        "subshell": "4d",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      1
    ]
  },
  "48": {
    "name": "Cadmium",
    "mass": 112.41,
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      2
    ]
  },
  "49": {
    "name": "Indium",
    "mass": 114.82,
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>1</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 10
      },
      {
        "subshell": "5p",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      3
    ]
  },
  "50": {
    "name": "Tin",
    "mass": 118.71,
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>2</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 10
      },
      {
        "subshell": "5p",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      4
    ]
  },
  "51": {
    "name": "Antimony",
    "mass": 121.76,
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>3</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 10
      },
      {
        "subshell": "5p",
        "e": 3
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      5
    ]
  },
  "52": {
    "name": "Tellurium",
    "mass": 127.6,
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>4</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 10
      },
      {
        "subshell": "5p",
        "e": 4
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      6
    ]
  },
  "53": {
    "name": "Iodine",
    "mass": 126.9,
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>5</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 10
      },
      {
        "subshell": "5p",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      7
    ]
  },
  "54": {
    "name": "Xenon",
    "mass": 131.29,
    "html": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>6</sup>",
    "valence": [
      {
        "subshell": "5s",
        "e": 2
      },
      {
        "subshell": "4d",
        "e": 10
      },
      {
        "subshell": "5p",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      8
    ]
  },
  "55": {
    "name": "Cesium",
    "mass": 132.91,
    "html": "[Xe] 6s<sup>1</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      8,
      1
    ]
  },
  "56": {
    "name": "Barium",
    "mass": 137.33,
    "html": "[Xe] 6s<sup>2</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      8,
      2
    ]
  },
  "57": {
    "name": "Lanthanum",
    "mass": 138.91,
    "html": "[Xe] 6s<sup>2</sup> 5d<sup>1</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "5d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      18,
      9,
      2
    ]
  },
  "58": {
    "name": "Cerium",
    "mass": 140.12,
    "html": "[Xe] 6s<sup>2</sup> 5d<sup>1</sup> 4f<sup>1</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "5d",
        "e": 1
      },
      {
        "subshell": "4f",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      19,
      9,
      2
    ]
  },
  "59": {
    "name": "Praseodymium",
    "mass": 140.91,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>3</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 3
      }
    ],
    "shells": [
      2,
      8,
      18,
      21,
      8,
      2
    ]
  },
  "60": {
    "name": "Neodymium",
    "mass": 144.24,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>4</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 4
      }
    ],
    "shells": [
      2,
      8,
      18,
      22,
      8,
      2
    ]
  },
  "61": {
    "name": "Promethium",
    "mass": "(145)",
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>5</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      18,
      23,
      8,
      2
    ]
  },
  "62": {
    "name": "Samarium",
    "mass": 150.36,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>6</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      18,
      24,
      8,
      2
    ]
  },
  "63": {
    "name": "Europium",
    "mass": 151.96,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>7</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 7
      }
    ],
    "shells": [
      2,
      8,
      18,
      25,
      8,
      2
    ]
  },
  "64": {
    "name": "Gadolinium",
    "mass": 157.25,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>7</sup> 5d<sup>1</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 7
      },
      {
        "subshell": "5d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      25,
      9,
      2
    ]
  },
  "65": {
    "name": "Terbium",
    "mass": 158.93,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>9</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 9
      }
    ],
    "shells": [
      2,
      8,
      18,
      27,
      8,
      2
    ]
  },
  "66": {
    "name": "Dysprosium",
    "mass": 162.5,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>10</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      28,
      8,
      2
    ]
  },
  "67": {
    "name": "Holmium",
    "mass": 164.93,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>11</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 11
      }
    ],
    "shells": [
      2,
      8,
      18,
      29,
      8,
      2
    ]
  },
  "68": {
    "name": "Erbium",
    "mass": 167.26,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>12</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 12
      }
    ],
    "shells": [
      2,
      8,
      18,
      30,
      8,
      2
    ]
  },
  "69": {
    "name": "Thulium",
    "mass": 168.93,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>13</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 13
      }
    ],
    "shells": [
      2,
      8,
      18,
      31,
      8,
      2
    ]
  },
  "70": {
    "name": "Ytterbium",
    "mass": 173.05,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      8,
      2
    ]
  },
  "71": {
    "name": "Lutetium",
    "mass": 174.97,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>1</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      9,
      2
    ]
  },
  "72": {
    "name": "Hafnium",
    "mass": 178.49,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>2</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      10,
      2
    ]
  },
  "73": {
    "name": "Tantalum",
    "mass": 180.95,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>3</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 3
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      11,
      2
    ]
  },
  "74": {
    "name": "Tungsten",
    "mass": 183.84,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>4</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 4
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      12,
      2
    ]
  },
  "75": {
    "name": "Rhenium",
    "mass": 186.21,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>5</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      13,
      2
    ]
  },
  "76": {
    "name": "Osmium",
    "mass": 190.23,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>6</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      14,
      2
    ]
  },
  "77": {
    "name": "Iridium",
    "mass": 192.22,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>7</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 7
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      15,
      2
    ]
  },
  "78": {
    "name": "Platinum",
    "mass": 195.08,
    "html": "[Xe] 6s<sup>1</sup> 4f<sup>14</sup> 5d<sup>9</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 1
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 9
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      17,
      1
    ]
  },
  "79": {
    "name": "Gold",
    "mass": 196.97,
    "html": "[Xe] 6s<sup>1</sup> 4f<sup>14</sup> 5d<sup>10</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 1
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      1
    ]
  },
  "80": {
    "name": "Mercury",
    "mass": 200.59,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      2
    ]
  },
  "81": {
    "name": "Thallium",
    "mass": 204.38,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>1</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 10
      },
      {
        "subshell": "6p",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      3
    ]
  },
  "82": {
    "name": "Lead",
    "mass": 207.2,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>2</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 10
      },
      {
        "subshell": "6p",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      4
    ]
  },
  "83": {
    "name": "Bismuth",
    "mass": 208.98,
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>3</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 10
      },
      {
        "subshell": "6p",
        "e": 3
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      5
    ]
  },
  "84": {
    "name": "Polonium",
    "mass": "(209)",
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>4</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 10
      },
      {
        "subshell": "6p",
        "e": 4
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      6
    ]
  },
  "85": {
    "name": "Astatine",
    "mass": "(210)",
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>5</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 10
      },
      {
        "subshell": "6p",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      7
    ]
  },
  "86": {
    "name": "Radon",
    "mass": "(222)",
    "html": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>6</sup>",
    "valence": [
      {
        "subshell": "6s",
        "e": 2
      },
      {
        "subshell": "4f",
        "e": 14
      },
      {
        "subshell": "5d",
        "e": 10
      },
      {
        "subshell": "6p",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      8
    ]
  },
  "87": {
    "name": "Francium",
    "mass": "(223)",
    "html": "[Rn] 7s<sup>1</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      8,
      1
    ]
  },
  "88": {
    "name": "Radium",
    "mass": "(226)",
    "html": "[Rn] 7s<sup>2</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      8,
      2
    ]
  },
  "89": {
    "name": "Actinium",
    "mass": "(227)",
    "html": "[Rn] 7s<sup>2</sup> 6d<sup>1</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "6d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      9,
      2
    ]
  },
  "90": {
    "name": "Thorium",
    "mass": 232.04,
    "html": "[Rn] 7s<sup>2</sup> 6d<sup>2</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "6d",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      18,
      10,
      2
    ]
  },
  "91": {
    "name": "Protactinium",
    "mass": 231.04,
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>2</sup> 6d<sup>1</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 2
      },
      {
        "subshell": "6d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      20,
      9,
      2
    ]
  },
  "92": {
    "name": "Uranium",
    "mass": 238.03,
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>3</sup> 6d<sup>1</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 3
      },
      {
        "subshell": "6d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      21,
      9,
      2
    ]
  },
  "93": {
    "name": "Neptunium",
    "mass": "(237)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>4</sup> 6d<sup>1</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 4
      },
      {
        "subshell": "6d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      22,
      9,
      2
    ]
  },
  "94": {
    "name": "Plutonium",
    "mass": "(244)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>6</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      24,
      8,
      2
    ]
  },
  "95": {
    "name": "Americium",
    "mass": "(243)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>7</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 7
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      25,
      8,
      2
    ]
  },
  "96": {
    "name": "Curium",
    "mass": "(247)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>7</sup> 6d<sup>1</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 7
      },
      {
        "subshell": "6d",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      25,
      9,
      2
    ]
  },
  "97": {
    "name": "Berkelium",
    "mass": "(247)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>9</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 9
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      27,
      8,
      2
    ]
  },
  "98": {
    "name": "Californium",
    "mass": "(251)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>10</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      28,
      8,
      2
    ]
  },
  "99": {
    "name": "Einsteinium",
    "mass": "(252)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>11</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 11
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      29,
      8,
      2
    ]
  },
  "100": {
    "name": "Fermium",
    "mass": "(257)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>12</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 12
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      30,
      8,
      2
    ]
  },
  "101": {
    "name": "Mendelevium",
    "mass": "(258)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>13</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 13
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      31,
      8,
      2
    ]
  },
  "102": {
    "name": "Nobelium",
    "mass": "(259)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      8,
      2
    ]
  },
  "103": {
    "name": "Lawrencium",
    "mass": "(262)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 7p<sup>1</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "7p",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      8,
      3
    ]
  },
  "104": {
    "name": "Rutherfordium",
    "mass": "(267)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>2</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      10,
      2
    ]
  },
  "105": {
    "name": "Dubnium",
    "mass": "(268)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>3</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 3
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      11,
      2
    ]
  },
  "106": {
    "name": "Seaborgium",
    "mass": "(269)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>4</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 4
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      12,
      2
    ]
  },
  "107": {
    "name": "Bohrium",
    "mass": "(270)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>5</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      13,
      2
    ]
  },
  "108": {
    "name": "Hassium",
    "mass": "(269)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>6</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      14,
      2
    ]
  },
  "109": {
    "name": "Meitnerium",
    "mass": "(278)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>7</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 7
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      15,
      2
    ]
  },
  "110": {
    "name": "Darmstadtium",
    "mass": "(281)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>8</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 8
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      16,
      2
    ]
  },
  "111": {
    "name": "Roentgenium",
    "mass": "(282)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>9</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 9
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      17,
      2
    ]
  },
  "112": {
    "name": "Copernicium",
    "mass": "(285)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 10
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      2
    ]
  },
  "113": {
    "name": "Nihonium",
    "mass": "(286)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>1</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 10
      },
      {
        "subshell": "7p",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      3
    ]
  },
  "114": {
    "name": "Flerovium",
    "mass": "(289)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>2</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 10
      },
      {
        "subshell": "7p",
        "e": 2
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      4
    ]
  },
  "115": {
    "name": "Moscovium",
    "mass": "(290)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>3</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 10
      },
      {
        "subshell": "7p",
        "e": 3
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      5
    ]
  },
  "116": {
    "name": "Livermorium",
    "mass": "(293)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>4</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 10
      },
      {
        "subshell": "7p",
        "e": 4
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      6
    ]
  },
  "117": {
    "name": "Tennessine",
    "mass": "(294)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>5</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 10
      },
      {
        "subshell": "7p",
        "e": 5
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      7
    ]
  },
  "118": {
    "name": "Oganesson",
    "mass": "(294)",
    "html": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>6</sup>",
    "valence": [
      {
        "subshell": "7s",
        "e": 2
      },
      {
        "subshell": "5f",
        "e": 14
      },
      {
        "subshell": "6d",
        "e": 10
      },
      {
        "subshell": "7p",
        "e": 6
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      8
    ]
  },
  "119": {
    "name": "Element 119",
    "mass": "(315)",
    "html": "[Og] 8s<sup>1</sup>",
    "valence": [
      {
        "subshell": "8s",
        "e": 1
      }
    ],
    "shells": [
      2,
      8,
      18,
      32,
      32,
      18,
      8,
      1
    ]
  }
};

  const GROUP_INFO = {
    1: { name: "Alkali Metals", outer: "ns¹", props: ["Highly reactive metals", "Low ionization enthalpy", "Readily lose 1 electron to form +1 ions", "Never found free in nature"] },
    2: { name: "Alkaline Earth Metals", outer: "ns²", props: ["Reactive metals, but less than Group 1", "Form basic oxides and hydroxides", "Readily lose 2 electrons to form +2 ions"] },
    13: { name: "Boron Family", outer: "ns²np¹", props: ["Shows non-metallic to metallic transition down the group", "Common oxidation states +3, +1"] },
    14: { name: "Carbon Family", outer: "ns²np²", props: ["Carbon shows high catenation", "Transition from non-metal to metal", "Common oxidation states +4, +2"] },
    15: { name: "Pnictogens (Nitrogen Family)", outer: "ns²np³", props: ["Extra stability due to exactly half-filled p-orbitals", "Shows variety of oxidation states from -3 to +5"] },
    16: { name: "Chalcogens (Oxygen Family)", outer: "ns²np⁴", props: ["Ore-forming elements", "High negative electron gain enthalpy", "Form -2 ions or covalent bonds"] },
    17: { name: "Halogens", outer: "ns²np⁵", props: ["Most reactive non-metals", "Highest negative electron gain enthalpy", "Readily form -1 ions (halides)"] },
    18: { name: "Noble Gases", outer: "ns²np⁶", props: ["Except He (1s²)", "Very stable, completely filled valence shells", "Extremely low reactivity", "Positive electron gain enthalpy"] },
  };

  const PERIOD_INFO = {
    1: { name: "1st Period", outer: "1s", props: ["Contains only 2 elements (H, He)", "Fills the K shell (n=1)"] },
    2: { name: "2nd Period", outer: "2s, 2p", props: ["Contains 8 elements (Li to Ne)", "Fills the L shell (n=2)", "Elements show anomalous properties due to small size"] },
    3: { name: "3rd Period", outer: "3s, 3p", props: ["Contains 8 elements (Na to Ar)", "Fills the M shell (n=3)"] },
    4: { name: "4th Period", outer: "4s, 3d, 4p", props: ["Contains 18 elements (K to Kr)", "First transition series (3d) starts here"] },
    5: { name: "5th Period", outer: "5s, 4d, 5p", props: ["Contains 18 elements (Rb to Xe)", "Second transition series (4d)"] },
    6: { name: "6th Period", outer: "6s, 4f, 5d, 6p", props: ["Contains 32 elements (Cs to Rn)", "Includes Lanthanoid series (4f)"] },
    7: { name: "7th Period", outer: "7s, 5f, 6d, 7p", props: ["Contains 32 elements (Fr to Og)", "Includes Actinoid series (5f)", "All elements beyond Uranium are man-made"] },
    8: { name: "Lanthanoids (4f Series)", outer: "4f, 5d, 6s", props: ["Inner transition metals", "Electrons fill the 4f subshell", "Lanthanoid contraction causes similar radii"] },
    9: { name: "Actinoids (5f Series)", outer: "5f, 6d, 7s", props: ["Inner transition metals", "Electrons fill the 5f subshell", "Radioactive, mostly synthetic elements"] }
  };

  const renderOrbitals = (valence) => {
      if (!valence || valence.length === 0) return '';
      let html = '<div style="display:flex; gap:15px; margin-top:10px; flex-wrap:wrap;">';
      
      const boxesCount = { 's': 1, 'p': 3, 'd': 5, 'f': 7 };
      
      valence.forEach(orb => {
          let type = orb.subshell[1];
          let maxBoxes = boxesCount[type];
          let e = orb.e;
          
          let boxes = Array(maxBoxes).fill('');
          // Fill up arrows
          for(let i=0; i<maxBoxes && e>0; i++) {
              boxes[i] = '↑';
              e--;
          }
          // Fill down arrows
          for(let i=0; i<maxBoxes && e>0; i++) {
              boxes[i] = '↑↓';
              e--;
          }
          
          html += '<div style="display:flex; flex-direction:column; align-items:center;">';
          html += `<div style="margin-bottom:4px; font-size:0.9rem; color:var(--color-text-muted); font-weight:bold;">${orb.subshell}</div>`;
          html += '<div style="display:flex; gap:2px;">';
          boxes.forEach(b => {
              html += `<div style="width:26px; height:26px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; color:var(--color-primary); border-radius:3px; font-family:monospace;">${b}</div>`;
          });
          html += '</div></div>';
      });
      
      html += '</div>';
      return html;
  };

  const renderAtomSimulation = (shells, color) => {
      const SVG_SIZE = 160;
      const CENTER = SVG_SIZE / 2;
      let html = `<div style="width:${SVG_SIZE}px; height:${SVG_SIZE}px; position:relative; display:flex; align-items:center; justify-content:center; flex-shrink:0;">`;
      html += `<svg width="${SVG_SIZE}" height="${SVG_SIZE}" viewBox="0 0 ${SVG_SIZE} ${SVG_SIZE}">`;
      
      // Nucleus
      html += `<circle cx="${CENTER}" cy="${CENTER}" r="6" fill="${color}" style="filter: drop-shadow(0 0 5px ${color});" />`;
      
      const maxShells = shells.length;
      const shellSpacing = (SVG_SIZE/2 - 10) / maxShells;
      
      shells.forEach((electrons, index) => {
          const n = index + 1;
          const r = 12 + index * shellSpacing;
          const duration = 12 + index * 4; // slower for outer shells
          
          // Draw orbit path
          html += `<circle cx="${CENTER}" cy="${CENTER}" r="${r}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />`;
          
          // Draw electrons on this orbit inside a rotating group
          html += `<g>`;
          html += `<animateTransform attributeName="transform" type="rotate" from="0 ${CENTER} ${CENTER}" to="360 ${CENTER} ${CENTER}" dur="${duration}s" repeatCount="indefinite" />`;
          
          for(let i=0; i<electrons; i++) {
              const angle = (i / electrons) * 2 * Math.PI;
              const x = CENTER + r * Math.cos(angle);
              const y = CENTER + r * Math.sin(angle);
              html += `<circle cx="${x}" cy="${y}" r="2.5" fill="#fff" />`;
          }
          
          html += `</g>`;
      });
      
      html += `</svg>`;
      html += `</div>`;
      return html;
  };

  const ELEMENT_COLORS = {};
  const cBLUE = '#99C7DF';
  const cGREEN = '#6AB683';
  const cORANGE = '#E49975';
  const cPINK = '#E4889F';
  const cTAN = '#D8C6A8';
  const cPURPLE = '#D9A9B9';
  
  const _assign = (list, color) => list.forEach(z => ELEMENT_COLORS[z] = color);
  _assign([3,4,11,12,19,20,37,38,55,56,87,88, 13,31,49,50,81,82,83,113,114,115,116,117], cBLUE);
  _assign([1, 5,6,7,8,9, 15,16,17, 34,35, 53, 85], cGREEN);
  _assign([14, 32,33, 51,52, 84], cORANGE);
  _assign([2,10,18,36,54,86,118], cPINK);
  
  let _tanEls = [];
  for(let i=21; i<=30; i++) _tanEls.push(i);
  for(let i=39; i<=48; i++) _tanEls.push(i);
  for(let i=57; i<=80; i++) _tanEls.push(i);
  _tanEls.push(89);
  for(let i=104; i<=112; i++) _tanEls.push(i);
  _assign(_tanEls, cTAN);
  
  let _purpEls = [];
  for(let i=90; i<=103; i++) _purpEls.push(i);
  _assign(_purpEls, cPURPLE);

  function build(container, config) {
    container.innerHTML = "";
    
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "row";
    wrapper.style.alignItems = "flex-start";
    wrapper.style.justifyContent = "center";
    wrapper.style.gap = "40px";
    wrapper.style.width = "100%";
    wrapper.style.flexWrap = "wrap"; 

    const ptContainer = document.createElement("div");
    ptContainer.style.display = "flex";
    ptContainer.style.flexDirection = "column";
    ptContainer.style.gap = "20px";

    const ptGrid = document.createElement("div");
    ptGrid.style.display = "grid";
    ptGrid.style.gridTemplateColumns = "30px 60px 60px 20px 30px repeat(10, 60px) 20px 30px repeat(6, 60px)";
    ptGrid.style.gridTemplateRows = "25px 20px repeat(7, 70px)";
    ptGrid.style.gap = "4px";
    ptGrid.style.position = "relative";
    ptGrid.style.fontFamily = "sans-serif";

    const fGrid = document.createElement("div");
    fGrid.style.display = "grid";
    fGrid.style.gridTemplateColumns = "80px repeat(14, 60px)"; // 80px for the wide labels!
    fGrid.style.gridTemplateRows = "25px 70px 70px";
    fGrid.style.gap = "4px";
    fGrid.style.position = "relative";
    fGrid.style.fontFamily = "sans-serif";
    fGrid.style.border = "1px solid rgba(255, 255, 255, 0.3)";
    fGrid.style.padding = "4px";
    fGrid.style.marginLeft = "190px"; 
    fGrid.style.alignSelf = "flex-start";

    // Draw Background Boxes for Blocks (Main Grid)
    const drawBox = (rStart, rSpan, cStart, cSpan, targetGrid = ptGrid) => {
        const box = document.createElement('div');
        box.style.gridRow = `${rStart} / span ${rSpan}`;
        box.style.gridColumn = `${cStart} / span ${cSpan}`;
        box.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        box.style.pointerEvents = 'none';
        box.style.zIndex = '0';
        targetGrid.appendChild(box);
    };
    drawBox(1, 9, 1, 3); // s-BLOCK
    drawBox(4, 6, 5, 11); // d-BLOCK
    drawBox(1, 9, 17, 7); // p-BLOCK

    const cells = [];
    let selectedType = null;
    let selectedVal = null;
    let selectedElementZ = null;

    const infoPanel = document.createElement("div");
    infoPanel.style.position = "fixed";
    infoPanel.style.width = "550px";
    infoPanel.style.maxWidth = "90vw";
    infoPanel.style.maxHeight = "85vh"; 
    infoPanel.style.overflowY = "auto";
    infoPanel.style.background = "rgba(15, 23, 42, 0.85)";
    infoPanel.style.backdropFilter = "blur(24px)";
    infoPanel.style.border = "1px solid rgba(255, 255, 255, 0.15)";
    infoPanel.style.borderRadius = "12px";
    infoPanel.style.padding = "35px";
    infoPanel.style.color = "var(--color-text)";
    infoPanel.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
    infoPanel.style.display = "flex";
    infoPanel.style.flexDirection = "column";
    infoPanel.style.gap = "15px";
    infoPanel.style.opacity = "0";
    infoPanel.style.pointerEvents = "none";
    infoPanel.style.transition = "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    infoPanel.style.zIndex = "2000";

    const infoTitle = document.createElement("h3");
    infoTitle.style.margin = "0";
    infoTitle.style.fontSize = "1.8rem";
    infoTitle.style.fontWeight = "800";
    infoTitle.style.background = "linear-gradient(90deg, #fff, #a5b4fc)";
    infoTitle.style.webkitBackgroundClip = "text";
    infoTitle.style.webkitTextFillColor = "transparent";
    infoTitle.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
    infoTitle.style.paddingBottom = "15px";
    infoTitle.style.letterSpacing = "0.5px";

    const infoContent = document.createElement("div");
    infoContent.style.fontSize = "1.05rem";
    infoContent.style.lineHeight = "1.7";
    
    infoPanel.appendChild(infoTitle);
    infoPanel.appendChild(infoContent);

    // Make infoPanel draggable
    let isDragging = false, startX, startY, initialLeft, initialTop;
    infoTitle.style.cursor = 'grab';
    
    const startDrag = (x, y) => {
        isDragging = true;
        infoTitle.style.cursor = 'grabbing';
        startX = x;
        startY = y;
        const rect = infoPanel.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        infoPanel.style.left = `${initialLeft}px`;
        infoPanel.style.top = `${initialTop}px`;
        infoPanel.style.right = 'auto';
        infoPanel.style.bottom = 'auto';
        infoPanel.style.margin = '0';
    };

    infoTitle.addEventListener('mousedown', (e) => {
        startDrag(e.clientX, e.clientY);
        e.preventDefault();
    });
    infoTitle.addEventListener('touchstart', (e) => {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: true});

    const doDrag = (x, y) => {
        if (!isDragging) return;
        const dx = x - startX;
        const dy = y - startY;
        infoPanel.style.left = `${initialLeft + dx}px`;
        infoPanel.style.top = `${initialTop + dy}px`;
    };

    document.addEventListener('mousemove', (e) => {
        doDrag(e.clientX, e.clientY);
    });
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) doDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: true});

    const endDrag = () => {
        isDragging = false;
        infoTitle.style.cursor = 'grab';
    };

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    document.addEventListener('click', (e) => {
        if (!infoPanel.contains(e.target) && !e.target.closest('.pt-cell') && !e.target.closest('.pt-label')) {
            selectedType = null;
            selectedVal = null;
            selectedElementZ = null;
            renderHighlights();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'c' || e.key === 'C' || e.key === 'Escape') {
            selectedType = null;
            selectedVal = null;
            selectedElementZ = null;
            renderHighlights();
        }
    });

    // Add a close button to the modal
    const closeBtn = document.createElement("div");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "15px";
    closeBtn.style.right = "20px";
    closeBtn.style.fontSize = "32px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.color = "var(--color-text-muted)";
    closeBtn.onclick = (e) => {
        e.stopPropagation();
        selectedType = null;
        selectedVal = null;
        selectedElementZ = null;
        renderHighlights(e);
    };
    infoPanel.appendChild(closeBtn);

    const updateInfoPanel = (e) => {
        if (!selectedType && !selectedElementZ) {
            infoPanel.style.opacity = "0";
            infoPanel.style.pointerEvents = "none";
            return;
        }
        
        if (infoPanel.style.opacity === "0") {
            let clickX = 0, clickY = 0, hasPos = false;
            if (e && e.clientX) { clickX = e.clientX; clickY = e.clientY; hasPos = true; }
            else if (e && e.touches && e.touches.length > 0) { clickX = e.touches[0].clientX; clickY = e.touches[0].clientY; hasPos = true; }
            
            if (hasPos) {
                const screenW = window.innerWidth;
                const screenH = window.innerHeight;
                
                if (clickX > screenW / 2) {
                    infoPanel.style.left = "40px";
                    infoPanel.style.right = "auto";
                } else {
                    infoPanel.style.right = "40px";
                    infoPanel.style.left = "auto";
                }
                
                if (clickY > screenH / 2) {
                    infoPanel.style.top = "40px";
                    infoPanel.style.bottom = "auto";
                } else {
                    infoPanel.style.bottom = "40px";
                    infoPanel.style.top = "auto";
                }
            } else {
                 infoPanel.style.left = "40px";
                 infoPanel.style.top = "40px";
                 infoPanel.style.right = "auto";
                 infoPanel.style.bottom = "auto";
            }
        }
        
        infoPanel.style.opacity = "1";
        infoPanel.style.pointerEvents = "auto";

        let html = "";
        
        if (selectedType === "group") {
            const grp = selectedVal;
            const data = GROUP_INFO[grp] || { name: "Transition Metals (d-block)", outer: "(n-1)d¹⁻¹⁰ ns⁰⁻²", props: ["Typical metallic properties", "Variable oxidation states", "Form colored ions", "Catalytic properties"] };
            infoTitle.textContent = `Group ${grp} - ${data.name}`;
            html += `<p><strong>Outer Configuration:</strong> ${data.outer}</p>`;
            
            const groupEls = ELEMENTS.filter(e => e.group === grp).sort((a,b) => a.z - b.z);
            if (groupEls.length > 0) {
                const first = groupEls[0];
                const last = groupEls[groupEls.length - 1];
                html += `<div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:4px; margin-bottom:10px;">`;
                html += `<div><strong>First:</strong> ${first.sym} (Z=${first.z}) &nbsp;&mdash;&nbsp; ${ECONFS[first.z].html}</div>`;
                html += `<div><strong>Last:</strong> ${last.sym} (Z=${last.z}) &nbsp;&mdash;&nbsp; ${ECONFS[last.z].html}</div>`;
                html += `</div>`;
            }
            html += `<strong>Key Properties:</strong><ul style="margin-top:5px; padding-left:20px;">`;
            data.props.forEach(p => html += `<li>${p}</li>`);
            html += `</ul>`;
        } else if (selectedType === "period") {
            const per = selectedVal;
            const data = PERIOD_INFO[per];
            infoTitle.textContent = data.name;
            html += `<p><strong>Fills Subshells:</strong> ${data.outer}</p>`;
            
            let periodEls = [];
            if (per === 8) periodEls = ELEMENTS.filter(e => e.period === 8).sort((a,b) => a.z - b.z);
            else if (per === 9) periodEls = ELEMENTS.filter(e => e.period === 9).sort((a,b) => a.z - b.z);
            else periodEls = ELEMENTS.filter(e => e.period === per).sort((a,b) => a.z - b.z);
            
            if (periodEls.length > 0) {
                const first = periodEls[0];
                const last = periodEls[periodEls.length - 1];
                html += `<div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:4px; margin-bottom:10px;">`;
                html += `<div><strong>First:</strong> ${first.sym} (Z=${first.z}) &nbsp;&mdash;&nbsp; ${ECONFS[first.z].html}</div>`;
                html += `<div><strong>Last:</strong> ${last.sym} (Z=${last.z}) &nbsp;&mdash;&nbsp; ${ECONFS[last.z].html}</div>`;
                html += `</div>`;
            }
            html += `<strong>Key Trends:</strong><ul style="margin-top:5px; padding-left:20px;">`;
            data.props.forEach(p => html += `<li>${p}</li>`);
            html += `</ul>`;
        }

        if (selectedElementZ) {
            const getEl = (z) => ELEMENTS.find(e => e.z === z);
            const el = getEl(selectedElementZ);
            const blockColor = ELEMENT_COLORS[el.z];
            
            if (!selectedType) {
                infoTitle.textContent = `${el.sym} - ${ECONFS[el.z].name}`;
            } else {
                html += `<hr style="border:none; border-top:1px solid var(--color-border); margin: 15px 0;" />`;
            }
            
            html += `<div style="background:linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2)); border:1px solid var(--color-border); padding:20px; border-radius:8px; animation: fadeIn 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">`;
            html += `<div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px;">`;
            html += `<div style="flex:1;">`;
            
            if (selectedType) {
                 html += `<h4 style="margin:0; font-size:1.6rem; color:${blockColor}; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${el.sym} - ${ECONFS[el.z].name}</h4>`;
            }
            
            html += `<table style="margin-top:10px; border-collapse: collapse; width: 100%; font-size: 1.05rem;">`;
            html += `<tr><td style="padding:6px 0; color:rgba(255,255,255,0.7); width: 45%;">Symbol:</td><td style="font-weight:bold;">${el.sym}</td></tr>`;
            html += `<tr><td style="padding:6px 0; color:rgba(255,255,255,0.7);">Element Name:</td><td style="font-weight:bold;">${ECONFS[el.z].name}</td></tr>`;
            html += `<tr><td style="padding:6px 0; color:rgba(255,255,255,0.7);">Atomic Number:</td><td style="font-weight:bold;">${el.z}</td></tr>`;
            html += `<tr><td style="padding:6px 0; color:rgba(255,255,255,0.7);">Atomic Mass:</td><td style="font-weight:bold;">${ECONFS[el.z].mass}</td></tr>`;
            html += `<tr><td style="padding:6px 0; color:rgba(255,255,255,0.7);">Electronic Config:</td><td style="font-weight:bold; letter-spacing:1px;">${ECONFS[el.z].html}</td></tr>`;
            html += `</table>`;
            
            html += `<div style="margin-top: 15px;">`;
            html += renderOrbitals(ECONFS[el.z].valence);
            html += `</div></div>`;
            
            html += renderAtomSimulation(ECONFS[el.z].shells, blockColor);
            html += `</div></div>`;
        }
        infoContent.innerHTML = html;
    };

    const renderHighlights = (e) => {
        cells.forEach(c => {
            let shouldHighlightGroupPeriod = false;
            if (selectedType === 'group' && parseInt(c.dataset.group) === selectedVal) shouldHighlightGroupPeriod = true;
            if (selectedType === 'period') {
                const p = parseInt(c.dataset.period);
                if (p === selectedVal || (selectedVal === 6 && p === 8) || (selectedVal === 7 && p === 9)) {
                    shouldHighlightGroupPeriod = true;
                }
            }

            const isSelectedElement = selectedElementZ && parseInt(c.dataset.z) === selectedElementZ;
            const elColor = ELEMENT_COLORS[parseInt(c.dataset.z)];

            if (isSelectedElement) {
                c.style.transform = 'scale(1.1)';
                c.style.zIndex = '10';
                c.style.opacity = '1';
                c.style.borderColor = '#fff';
                c.style.borderWidth = '2px';
                c.style.boxShadow = `0 0 20px ${elColor}`;
                c.style.filter = 'blur(0px) brightness(1.2)';
            } else if (shouldHighlightGroupPeriod) {
                c.style.opacity = '1';
                c.style.transform = 'scale(1.05)';
                c.style.zIndex = '5';
                c.style.boxShadow = `0 0 10px ${elColor}`;
                c.style.filter = 'blur(0px) brightness(1.1)';
                c.style.borderColor = 'rgba(0,0,0,0.5)';
                c.style.borderWidth = '1px';
            } else if (selectedType || selectedElementZ) {
                c.style.opacity = '0.4';
                c.style.filter = 'blur(1px) grayscale(50%)';
                c.style.transform = 'scale(0.95)';
                c.style.zIndex = '1';
                c.style.boxShadow = 'none';
                c.style.borderColor = 'rgba(0,0,0,0.2)';
                c.style.borderWidth = '1px';
            } else {
                c.style.opacity = '1';
                c.style.filter = 'none';
                c.style.transform = 'scale(1)';
                c.style.zIndex = '1';
                c.style.boxShadow = 'none';
                c.style.borderColor = 'rgba(0,0,0,0.2)';
                c.style.borderWidth = '1px';
            }
        });
        updateInfoPanel(e);
    };

    const addLabel = (text, row, col, spanC = 1, spanR = 1, isTitle = false, targetGrid = ptGrid) => {
        const lbl = document.createElement('div');
        lbl.textContent = text;
        lbl.style.gridRow = `${row} / span ${spanR}`;
        lbl.style.gridColumn = `${col} / span ${spanC}`;
        lbl.style.display = 'flex';
        lbl.style.alignItems = 'center';
        lbl.style.justifyContent = 'center';
        lbl.style.color = isTitle ? 'var(--color-text)' : 'rgba(255,255,255,0.6)';
        lbl.style.fontSize = isTitle ? '14px' : '12px';
        lbl.style.fontStyle = isTitle ? 'italic' : 'normal';
        if (text.includes('\n')) {
            lbl.style.whiteSpace = 'pre-wrap';
            lbl.style.textAlign = 'center';
            lbl.style.lineHeight = '1.2';
        }
        targetGrid.appendChild(lbl);
    };

    const addClickableLabel = (text, row, col, type, val, spanC = 1, targetGrid = ptGrid) => {
        const lbl = document.createElement('div');
        lbl.textContent = text;
        lbl.style.gridRow = row;
        lbl.style.gridColumn = `${col} / span ${spanC}`;
        lbl.style.display = 'flex';
        lbl.style.alignItems = 'center';
        lbl.style.justifyContent = 'center';
        lbl.style.fontSize = '12px';
        lbl.style.cursor = 'pointer';
        lbl.style.color = 'var(--color-text)';
        if (text.includes('\n')) {
            lbl.style.whiteSpace = 'pre-wrap';
            lbl.style.textAlign = 'center';
            lbl.style.lineHeight = '1.2';
        }
        lbl.classList.add('pt-label');
        
        lbl.onclick = (e) => {
            e.stopPropagation();
            if (selectedType === type && selectedVal === val) {
                selectedType = null;
                selectedVal = null;
            } else {
                selectedType = type;
                selectedVal = val;
            }
            selectedElementZ = null;
            renderHighlights(e);
        };
        targetGrid.appendChild(lbl);
    };

    // Titles
    addLabel('s-BLOCK', 1, 1, 3, 1, true);
    addLabel('d-BLOCK', 4, 5, 11, 1, true);
    addLabel('p-BLOCK', 1, 17, 7, 1, true);

    // Group numbers
    [1,2].forEach(g => addClickableLabel(g.toString(), 2, g+1, 'group', g));
    for(let g=3; g<=12; g++) addClickableLabel(g.toString(), 5, g+3, 'group', g);
    for(let g=13; g<=18; g++) addClickableLabel(g.toString(), 2, g+5, 'group', g);

    // s-block orbitals (Periods)
    ['1s', '2s', '3s', '4s', '5s', '6s', '7s'].forEach((orb, i) => addClickableLabel(orb, i+3, 1, 'period', i+1));
    // d-block orbitals
    ['3d', '4d', '5d', '6d'].forEach((orb, i) => addLabel(orb, i+6, 5));
    // p-block orbitals
    ['2p', '3p', '4p', '5p', '6p', '7p'].forEach((orb, i) => addLabel(orb, i+4, 17));

    // f-block title and labels (Periods 8 and 9)
    addLabel('f-BLOCK', 1, 1, 15, 1, true, fGrid);
    addClickableLabel('Lanthanoids\n4f', 2, 1, 'period', 8, 1, fGrid);
    addClickableLabel('Actinoids\n5f', 3, 1, 'period', 9, 1, fGrid);

    const getGridPos = (el) => {
        if (el.z >= 58 && el.z <= 71) return { row: 2, col: el.z - 58 + 2, grid: fGrid };
        if (el.z >= 90 && el.z <= 103) return { row: 3, col: el.z - 90 + 2, grid: fGrid };
        
        if (el.z === 1) return { row: 3, col: 10, grid: ptGrid };
        if (el.z === 2) return { row: 3, col: 23, grid: ptGrid };
        
        let row;
        if (el.period === 2) row = 4;
        else if (el.period === 3) row = 5;
        else if (el.period === 4) row = 6;
        else if (el.period === 5) row = 7;
        else if (el.period === 6) row = 8;
        else if (el.period === 7) row = 9;
        
        let col;
        if (el.group <= 2) col = el.group + 1;
        else if (el.group >= 3 && el.group <= 12) col = el.group + 3;
        else if (el.group >= 13) col = el.group + 5;
        
        return { row, col, grid: ptGrid };
    };

    ELEMENTS.forEach(el => {
      const cellColor = ELEMENT_COLORS[el.z];
      
      const cell = document.createElement('div');
      cell.style.display = 'flex';
      cell.style.flexDirection = 'column';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.cursor = 'pointer';
      cell.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      cell.style.border = '1px solid rgba(255,255,255,0.1)';
      cell.style.background = `linear-gradient(135deg, ${cellColor}dd, ${cellColor}99)`;
      cell.style.backdropFilter = "blur(4px)";
      cell.style.boxShadow = "inset 1px 1px 1px rgba(255,255,255,0.4), inset -1px -1px 3px rgba(0,0,0,0.2)";
      cell.style.color = '#000';
      cell.style.userSelect = 'none';
      cell.style.position = 'relative';
      cell.style.borderRadius = '4px';
      cell.classList.add('pt-cell');

      const pos = getGridPos(el);
      cell.style.gridRow = pos.row;
      cell.style.gridColumn = pos.col;

      // Z (Top Left)
      const zEl = document.createElement('div');
      zEl.textContent = el.z;
      zEl.style.fontSize = '11px';
      zEl.style.fontWeight = 'bold';
      zEl.style.position = 'absolute';
      zEl.style.top = '3px';
      zEl.style.left = '4px';
      zEl.style.opacity = '0.8';
      cell.appendChild(zEl);

      // Symbol (Center)
      const symEl = document.createElement('div');
      symEl.textContent = el.sym;
      symEl.style.fontSize = '26px';
      symEl.style.fontWeight = '900';
      symEl.style.marginTop = '4px';
      symEl.style.textShadow = '1px 1px 0px rgba(255,255,255,0.5)';
      cell.appendChild(symEl);

      // Mass (Bottom)
      const massEl = document.createElement('div');
      massEl.textContent = ECONFS[el.z].mass;
      massEl.style.fontSize = '11px';
      massEl.style.marginTop = 'auto';
      massEl.style.marginBottom = '3px';
      massEl.style.opacity = '0.9';
      cell.appendChild(massEl);

      cell.dataset.block = el.block;
      cell.dataset.z = el.z;
      cell.dataset.group = el.group || '';
      cell.dataset.period = el.period;

      cell.onclick = (e) => {
          e.stopPropagation();
          let allowed = true;
          if (selectedType === 'group' && parseInt(el.group) !== selectedVal) allowed = false;
          if (selectedType === 'period') {
              let p = parseInt(el.period);
              allowed = (p === selectedVal) || (selectedVal === 6 && p === 8) || (selectedVal === 7 && p === 9);
          }
          
          if (!allowed) {
              selectedType = null;
              selectedVal = null;
          }
          
          if (selectedElementZ === el.z) selectedElementZ = null;
          else selectedElementZ = el.z;
          renderHighlights(e);
      };

      cells.push(cell);
      pos.grid.appendChild(cell);
    });

    ptContainer.appendChild(ptGrid);
    ptContainer.appendChild(fGrid);
    wrapper.appendChild(ptContainer);
    
    // Add info panel globally to the body or container
    container.appendChild(infoPanel);
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    wrapper.appendChild(style);
    
    container.appendChild(wrapper);
    updateInfoPanel(); // Initialize default text
  }

  return { init: build };
})();
