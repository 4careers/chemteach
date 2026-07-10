/**
 * InteractivePT - Modern Periodic Table visualization
 * Features touch-friendly UI and dynamic Info Panel
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
    // Lanthanides (f-block, drawn below)
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
    // Actinides
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
    "1": "1s<sup>1</sup>",
    "2": "1s<sup>2</sup>",
    "3": "[He] 2s<sup>1</sup>",
    "4": "[He] 2s<sup>2</sup>",
    "5": "[He] 2s<sup>2</sup> 2p<sup>1</sup>",
    "6": "[He] 2s<sup>2</sup> 2p<sup>2</sup>",
    "7": "[He] 2s<sup>2</sup> 2p<sup>3</sup>",
    "8": "[He] 2s<sup>2</sup> 2p<sup>4</sup>",
    "9": "[He] 2s<sup>2</sup> 2p<sup>5</sup>",
    "10": "[He] 2s<sup>2</sup> 2p<sup>6</sup>",
    "11": "[Ne] 3s<sup>1</sup>",
    "12": "[Ne] 3s<sup>2</sup>",
    "13": "[Ne] 3s<sup>2</sup> 3p<sup>1</sup>",
    "14": "[Ne] 3s<sup>2</sup> 3p<sup>2</sup>",
    "15": "[Ne] 3s<sup>2</sup> 3p<sup>3</sup>",
    "16": "[Ne] 3s<sup>2</sup> 3p<sup>4</sup>",
    "17": "[Ne] 3s<sup>2</sup> 3p<sup>5</sup>",
    "18": "[Ne] 3s<sup>2</sup> 3p<sup>6</sup>",
    "19": "[Ar] 4s<sup>1</sup>",
    "20": "[Ar] 4s<sup>2</sup>",
    "21": "[Ar] 4s<sup>2</sup> 3d<sup>1</sup>",
    "22": "[Ar] 4s<sup>2</sup> 3d<sup>2</sup>",
    "23": "[Ar] 4s<sup>2</sup> 3d<sup>3</sup>",
    "24": "[Ar] 4s<sup>1</sup> 3d<sup>5</sup>",
    "25": "[Ar] 4s<sup>2</sup> 3d<sup>5</sup>",
    "26": "[Ar] 4s<sup>2</sup> 3d<sup>6</sup>",
    "27": "[Ar] 4s<sup>2</sup> 3d<sup>7</sup>",
    "28": "[Ar] 4s<sup>2</sup> 3d<sup>8</sup>",
    "29": "[Ar] 4s<sup>1</sup> 3d<sup>10</sup>",
    "30": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup>",
    "31": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>1</sup>",
    "32": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>2</sup>",
    "33": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>3</sup>",
    "34": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>4</sup>",
    "35": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>5</sup>",
    "36": "[Ar] 4s<sup>2</sup> 3d<sup>10</sup> 4p<sup>6</sup>",
    "37": "[Kr] 5s<sup>1</sup>",
    "38": "[Kr] 5s<sup>2</sup>",
    "39": "[Kr] 5s<sup>2</sup> 4d<sup>1</sup>",
    "40": "[Kr] 5s<sup>2</sup> 4d<sup>2</sup>",
    "41": "[Kr] 5s<sup>1</sup> 4d<sup>4</sup>",
    "42": "[Kr] 5s<sup>1</sup> 4d<sup>5</sup>",
    "43": "[Kr] 5s<sup>2</sup> 4d<sup>5</sup>",
    "44": "[Kr] 5s<sup>1</sup> 4d<sup>7</sup>",
    "45": "[Kr] 5s<sup>1</sup> 4d<sup>8</sup>",
    "46": "[Kr] 4d<sup>10</sup>",
    "47": "[Kr] 5s<sup>1</sup> 4d<sup>10</sup>",
    "48": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup>",
    "49": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>1</sup>",
    "50": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>2</sup>",
    "51": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>3</sup>",
    "52": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>4</sup>",
    "53": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>5</sup>",
    "54": "[Kr] 5s<sup>2</sup> 4d<sup>10</sup> 5p<sup>6</sup>",
    "55": "[Xe] 6s<sup>1</sup>",
    "56": "[Xe] 6s<sup>2</sup>",
    "57": "[Xe] 6s<sup>2</sup> 5d<sup>1</sup>",
    "58": "[Xe] 6s<sup>2</sup> 5d<sup>1</sup> 4f<sup>1</sup>",
    "59": "[Xe] 6s<sup>2</sup> 4f<sup>3</sup>",
    "60": "[Xe] 6s<sup>2</sup> 4f<sup>4</sup>",
    "61": "[Xe] 6s<sup>2</sup> 4f<sup>5</sup>",
    "62": "[Xe] 6s<sup>2</sup> 4f<sup>6</sup>",
    "63": "[Xe] 6s<sup>2</sup> 4f<sup>7</sup>",
    "64": "[Xe] 6s<sup>2</sup> 4f<sup>7</sup> 5d<sup>1</sup>",
    "65": "[Xe] 6s<sup>2</sup> 4f<sup>9</sup>",
    "66": "[Xe] 6s<sup>2</sup> 4f<sup>10</sup>",
    "67": "[Xe] 6s<sup>2</sup> 4f<sup>11</sup>",
    "68": "[Xe] 6s<sup>2</sup> 4f<sup>12</sup>",
    "69": "[Xe] 6s<sup>2</sup> 4f<sup>13</sup>",
    "70": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup>",
    "71": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>1</sup>",
    "72": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>2</sup>",
    "73": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>3</sup>",
    "74": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>4</sup>",
    "75": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>5</sup>",
    "76": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>6</sup>",
    "77": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>7</sup>",
    "78": "[Xe] 6s<sup>1</sup> 4f<sup>14</sup> 5d<sup>9</sup>",
    "79": "[Xe] 6s<sup>1</sup> 4f<sup>14</sup> 5d<sup>10</sup>",
    "80": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup>",
    "81": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>1</sup>",
    "82": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>2</sup>",
    "83": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>3</sup>",
    "84": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>4</sup>",
    "85": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>5</sup>",
    "86": "[Xe] 6s<sup>2</sup> 4f<sup>14</sup> 5d<sup>10</sup> 6p<sup>6</sup>",
    "87": "[Rn] 7s<sup>1</sup>",
    "88": "[Rn] 7s<sup>2</sup>",
    "89": "[Rn] 7s<sup>2</sup> 6d<sup>1</sup>",
    "90": "[Rn] 7s<sup>2</sup> 6d<sup>2</sup>",
    "91": "[Rn] 7s<sup>2</sup> 5f<sup>2</sup> 6d<sup>1</sup>",
    "92": "[Rn] 7s<sup>2</sup> 5f<sup>3</sup> 6d<sup>1</sup>",
    "93": "[Rn] 7s<sup>2</sup> 5f<sup>4</sup> 6d<sup>1</sup>",
    "94": "[Rn] 7s<sup>2</sup> 5f<sup>6</sup>",
    "95": "[Rn] 7s<sup>2</sup> 5f<sup>7</sup>",
    "96": "[Rn] 7s<sup>2</sup> 5f<sup>7</sup> 6d<sup>1</sup>",
    "97": "[Rn] 7s<sup>2</sup> 5f<sup>9</sup>",
    "98": "[Rn] 7s<sup>2</sup> 5f<sup>10</sup>",
    "99": "[Rn] 7s<sup>2</sup> 5f<sup>11</sup>",
    "100": "[Rn] 7s<sup>2</sup> 5f<sup>12</sup>",
    "101": "[Rn] 7s<sup>2</sup> 5f<sup>13</sup>",
    "102": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup>",
    "103": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 7p<sup>1</sup>",
    "104": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>2</sup>",
    "105": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>3</sup>",
    "106": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>4</sup>",
    "107": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>5</sup>",
    "108": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>6</sup>",
    "109": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>7</sup>",
    "110": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>8</sup>",
    "111": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>9</sup>",
    "112": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup>",
    "113": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>1</sup>",
    "114": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>2</sup>",
    "115": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>3</sup>",
    "116": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>4</sup>",
    "117": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>5</sup>",
    "118": "[Rn] 7s<sup>2</sup> 5f<sup>14</sup> 6d<sup>10</sup> 7p<sup>6</sup>",
    "119": "[Og] 8s<sup>1</sup>"
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

  const BLOCK_COLORS = {
    "s": "#00B4CC", 
    "p": "#FFD740",
    "d": "#FF5252", 
    "f": "#E040FB"
  };

  function build(container, config) {
    container.innerHTML = "";
    
    // Main wrapper (Flex Row for Table and Info Panel)
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "row";
    wrapper.style.alignItems = "flex-start";
    wrapper.style.justifyContent = "center";
    wrapper.style.gap = "40px";
    wrapper.style.width = "100%";
    wrapper.style.flexWrap = "wrap"; // allow wrapping on smaller screens

    // Left container for PT
    const ptContainer = document.createElement("div");
    ptContainer.style.display = "flex";
    ptContainer.style.flexDirection = "column";
    ptContainer.style.gap = "20px";

    const ptGrid = document.createElement("div");
    ptGrid.style.display = "grid";
    ptGrid.style.gridTemplateColumns = "20px repeat(18, 30px)";
    ptGrid.style.gridTemplateRows = "20px repeat(10, 30px)";
    ptGrid.style.gap = "4px";
    ptGrid.style.position = "relative";

    // Info Panel
    const infoPanel = document.createElement("div");
    infoPanel.style.flex = "1";
    infoPanel.style.minWidth = "300px";
    infoPanel.style.maxWidth = "450px";
    infoPanel.style.background = "var(--color-card)";
    infoPanel.style.border = "1px solid var(--color-border)";
    infoPanel.style.borderRadius = "8px";
    infoPanel.style.padding = "20px";
    infoPanel.style.color = "var(--color-text)";
    infoPanel.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    infoPanel.style.display = "flex";
    infoPanel.style.flexDirection = "column";
    infoPanel.style.gap = "15px";
    infoPanel.style.transition = "all 0.3s ease";

    const infoTitle = document.createElement("h3");
    infoTitle.style.margin = "0";
    infoTitle.style.fontSize = "1.5rem";
    infoTitle.style.borderBottom = "1px solid var(--color-border)";
    infoTitle.style.paddingBottom = "10px";
    infoTitle.textContent = "Interactive Periodic Table";

    const infoContent = document.createElement("div");
    infoContent.style.fontSize = "1rem";
    infoContent.style.lineHeight = "1.6";
    infoContent.innerHTML = "<p>Tap on any Period or Group button to view its properties and boundary elements.</p><p>Tap on an individual element to view its exact electronic configuration.</p>";
    
    infoPanel.appendChild(infoTitle);
    infoPanel.appendChild(infoContent);

    const cells = [];
    let selectedType = null; // 'group', 'period'
    let selectedVal = null;
    let selectedElementZ = null;

    const getEl = (z) => ELEMENTS.find(e => e.z === z);

    const updateInfoPanel = () => {
        if (!selectedType && !selectedElementZ) {
            infoTitle.textContent = "Interactive Periodic Table";
            infoContent.innerHTML = "<p>Tap on any Period or Group button to view its properties and boundary elements.</p><p>Tap on an individual element to view its exact electronic configuration.</p>";
            return;
        }

        let html = "";
        
        if (selectedType === "group") {
            const grp = selectedVal;
            const data = GROUP_INFO[grp] || { name: "Transition Metals (d-block)", outer: "(n-1)d¹⁻¹⁰ ns⁰⁻²", props: ["Typical metallic properties", "Variable oxidation states", "Form colored ions", "Catalytic properties"] };
            infoTitle.textContent = `Group ${grp} - ${data.name}`;
            html += `<p><strong>Outer Configuration:</strong> ${data.outer}</p>`;
            
            // Find first and last element of this group
            const groupEls = ELEMENTS.filter(e => e.group === grp).sort((a,b) => a.z - b.z);
            if (groupEls.length > 0) {
                const first = groupEls[0];
                const last = groupEls[groupEls.length - 1];
                html += `<div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:4px; margin-bottom:10px;">`;
                html += `<div><strong>First:</strong> ${first.sym} (Z=${first.z}) &nbsp;&mdash;&nbsp; ${ECONFS[first.z]}</div>`;
                html += `<div><strong>Last:</strong> ${last.sym} (Z=${last.z}) &nbsp;&mdash;&nbsp; ${ECONFS[last.z]}</div>`;
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
            
            // Note: periods 8 and 9 are f-block series
            let periodEls = [];
            if (per === 8) {
                periodEls = ELEMENTS.filter(e => e.period === 8).sort((a,b) => a.z - b.z);
            } else if (per === 9) {
                periodEls = ELEMENTS.filter(e => e.period === 9).sort((a,b) => a.z - b.z);
            } else {
                periodEls = ELEMENTS.filter(e => e.period === per).sort((a,b) => a.z - b.z);
            }
            
            if (periodEls.length > 0) {
                const first = periodEls[0];
                const last = periodEls[periodEls.length - 1];
                html += `<div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:4px; margin-bottom:10px;">`;
                html += `<div><strong>First:</strong> ${first.sym} (Z=${first.z}) &nbsp;&mdash;&nbsp; ${ECONFS[first.z]}</div>`;
                html += `<div><strong>Last:</strong> ${last.sym} (Z=${last.z}) &nbsp;&mdash;&nbsp; ${ECONFS[last.z]}</div>`;
                html += `</div>`;
            }

            html += `<strong>Key Trends:</strong><ul style="margin-top:5px; padding-left:20px;">`;
            data.props.forEach(p => html += `<li>${p}</li>`);
            html += `</ul>`;
        }

        if (selectedElementZ) {
            if (!selectedType) infoTitle.textContent = "Element Selection";
            const el = getEl(selectedElementZ);
            if (selectedType) {
                html += `<hr style="border:none; border-top:1px solid var(--color-border); margin: 15px 0;" />`;
            }
            html += `<div style="background:var(--color-primary); color:#000; padding:15px; border-radius:8px; animation: fadeIn 0.3s;">`;
            html += `<h4 style="margin:0 0 10px 0; font-size:1.2rem;">${el.sym} (Atomic Number: ${el.z})</h4>`;
            html += `<div><strong>Block:</strong> ${el.block}-block</div>`;
            html += `<div style="margin-top:8px;"><strong>Configuration:</strong> <span style="font-size:1.1rem; display:block; margin-top:4px;">${ECONFS[el.z]}</span></div>`;
            html += `</div>`;
        }

        infoContent.innerHTML = html;
    };

    const renderHighlights = () => {
        cells.forEach(c => {
            let shouldHighlightGroupPeriod = false;
            if (selectedType === 'group' && parseInt(c.dataset.group) === selectedVal) shouldHighlightGroupPeriod = true;
            if (selectedType === 'period') {
                const p = parseInt(c.dataset.period);
                if (p === selectedVal) {
                    shouldHighlightGroupPeriod = true;
                }
            }

            const isSelectedElement = selectedElementZ && parseInt(c.dataset.z) === selectedElementZ;

            if (isSelectedElement) {
                c.style.transform = 'scale(1.2)';
                c.style.zIndex = '10';
                c.style.background = BLOCK_COLORS[c.dataset.block];
                c.style.color = '#000';
                c.style.opacity = '1';
                c.style.borderColor = '#fff';
                c.style.borderWidth = '2px';
                c.style.boxShadow = `0 0 20px ${BLOCK_COLORS[c.dataset.block]}`;
                c.style.filter = 'blur(0px)';
            } else if (shouldHighlightGroupPeriod) {
                c.style.background = BLOCK_COLORS[c.dataset.block];
                c.style.color = '#000';
                c.style.opacity = '1';
                c.style.transform = 'scale(1.1)';
                c.style.zIndex = '5';
                c.style.boxShadow = `0 0 10px ${BLOCK_COLORS[c.dataset.block]}`;
                c.style.filter = 'blur(0px)';
                c.style.borderColor = 'transparent';
                c.style.borderWidth = '1px';
            } else if (selectedType || selectedElementZ) {
                // Dim others
                c.style.opacity = '0.15';
                c.style.filter = 'blur(3px)';
                c.style.transform = 'scale(0.95)';
                c.style.background = 'var(--color-card)';
                c.style.color = 'var(--color-text-muted)';
                c.style.zIndex = '1';
                c.style.boxShadow = 'none';
                c.style.borderColor = 'var(--color-border)';
                c.style.borderWidth = '1px';
            } else {
                // Normal state
                c.style.background = 'var(--color-card)';
                c.style.color = 'var(--color-text)';
                c.style.borderColor = 'var(--color-border)';
                c.style.opacity = '1';
                c.style.filter = 'blur(0px)';
                c.style.transform = 'scale(1)';
                c.style.zIndex = '1';
                c.style.boxShadow = 'none';
                c.style.borderWidth = '1px';
            }
        });
        updateInfoPanel();
    };

    // Global click listener to reset if clicked outside
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            selectedType = null;
            selectedVal = null;
            selectedElementZ = null;
            renderHighlights();
        }
    });

    // Group Buttons
    for (let i = 1; i <= 18; i++) {
      const gBtn = document.createElement('div');
      gBtn.textContent = i;
      gBtn.style.gridRow = 1;
      gBtn.style.gridColumn = i + 1;
      gBtn.style.fontSize = '12px';
      gBtn.style.fontWeight = 'bold';
      gBtn.style.display = 'flex';
      gBtn.style.alignItems = 'center';
      gBtn.style.justifyContent = 'center';
      gBtn.style.background = 'rgba(255,255,255,0.1)';
      gBtn.style.borderRadius = '4px';
      gBtn.style.cursor = 'pointer';
      gBtn.style.color = 'var(--color-text)';
      gBtn.style.transition = 'all 0.2s ease';
      
      gBtn.onclick = (e) => {
          e.stopPropagation();
          if (selectedType === 'group' && selectedVal === i) {
              selectedType = null;
              selectedVal = null;
          } else {
              selectedType = 'group';
              selectedVal = i;
          }
          selectedElementZ = null;
          renderHighlights();
      };
      ptGrid.appendChild(gBtn);
    }
    
    // Period Buttons
    for (let i = 1; i <= 9; i++) {
      const pBtn = document.createElement('div');
      if (i <= 7) {
        pBtn.textContent = i;
      } else if (i === 8) {
        pBtn.textContent = '4f';
        pBtn.title = 'Lanthanoids';
      } else if (i === 9) {
        pBtn.textContent = '5f';
        pBtn.title = 'Actinoids';
      }
      pBtn.style.gridRow = i + 1;
      pBtn.style.gridColumn = 1;
      pBtn.style.fontSize = '12px';
      pBtn.style.fontWeight = 'bold';
      pBtn.style.display = 'flex';
      pBtn.style.alignItems = 'center';
      pBtn.style.justifyContent = 'center';
      pBtn.style.background = 'rgba(255,255,255,0.1)';
      pBtn.style.borderRadius = '4px';
      pBtn.style.cursor = 'pointer';
      pBtn.style.color = 'var(--color-text)';
      pBtn.style.transition = 'all 0.2s ease';
      
      pBtn.onclick = (e) => {
          e.stopPropagation();
          if (selectedType === 'period' && selectedVal === i) {
              selectedType = null;
              selectedVal = null;
          } else {
              selectedType = 'period';
              selectedVal = i;
          }
          selectedElementZ = null;
          renderHighlights();
      };
      ptGrid.appendChild(pBtn);
    }

    ELEMENTS.forEach(el => {
      const cell = document.createElement('div');
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.fontSize = 'clamp(12px, 1.2vw, 26px)';
      cell.style.fontWeight = 'bold';
      cell.style.borderRadius = '4px';
      cell.style.cursor = 'pointer';
      cell.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      cell.style.border = '1px solid var(--color-border)';
      cell.style.background = 'var(--color-card)';
      cell.style.color = 'var(--color-text)';
      cell.style.userSelect = 'none';

      if (el.group) {
        cell.style.gridColumn = el.group + 1;
        cell.style.gridRow = el.period + 1;
      } else {
        const offset = (el.z >= 58 && el.z <= 71) ? el.z - 57 : el.z - 89;
        cell.style.gridColumn = 3 + offset + 1;
        cell.style.gridRow = el.period + 1;
      }

      cell.textContent = el.sym;
      cell.dataset.block = el.block;
      cell.dataset.z = el.z;
      cell.dataset.group = el.group || '';
      cell.dataset.period = el.period;

      cell.onclick = (e) => {
          e.stopPropagation();
          if (selectedElementZ === el.z) {
              // Clicked again, clear element highlight but KEEP period/group
              selectedElementZ = null;
          } else {
              selectedElementZ = el.z;
          }
          renderHighlights();
      };

      cells.push(cell);
      ptGrid.appendChild(cell);
    });

    ptContainer.appendChild(ptGrid);
    wrapper.appendChild(ptContainer);
    wrapper.appendChild(infoPanel);
    
    // Add simple fadeIn animation for the element highlight box
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    wrapper.appendChild(style);
    
    container.appendChild(wrapper);
  }

  return { init: build };
})();
