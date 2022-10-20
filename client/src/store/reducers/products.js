export default (
  state = {
    categories: [
      {
        name: "Ανταλλακτικά",
        pathname: "antallaktika",
        subCategories: [
          {
            name: "Μετάδοση κίνησης",
            pathname: "metadosi-kinisis",
            types: [
              {
                name: "Πλατώ",
                pathname: "plato",
                products: ["product1", "product2"],
              },
              {
                name: "Δίσκος",
                pathname: "diskos",
                products: ["product3", "product4", "product5"],
              },
              {
                name: "Ρουλεμάν αμπραγιάζ",
                pathname: "rouleman-ampragiaz",
                products: ["product3", "product4", "product5"],
              },
              {
                name: "Σετ συμπλέκτη",
                pathname: "set-symplekti",
                products: ["product3", "product4", "product5"],
              },
              {
                name: "Αντλία συμπλέκτη",
                pathname: "antlia-symplekti",
                products: ["product3", "product4", "product5"],
              },
              {
                name: "Γρανάζι βολάν",
                pathname: "granazi-bolan",
                products: ["product3", "product4", "product5"],
              },
              {
                name: "Σταυροί",
                pathname: "stavroi",
                products: ["product3", "product4", "product5"],
              },
              {
                name: "Μεσαία τριβή",
                pathname: "mesaia-tribi",
                products: ["product3", "product4", "product5"],
              },
            ],
          },
          {
            name: "Ανάρτηση",
            pathname: "anartisi",
            types: [
              {
                name: "Αερόφουσκες",
                pathname: "aerofouskes",
                products: ["product6"],
              },
              {
                name: "Αμορτισέρ",
                pathname: "amortiser",
                products: ["product7", "product8", "product9"],
              },
            ],
          },
          {
            name: "Σύστημα καυσίμου",
            pathname: "systima-kaysimou",
            types: [
              {
                name: "Αντλία fuel ηλεκτρική",
                pathname: "antlia-fuel-hlektriki",
                products: ["product6"],
              },
              {
                name: "Αντλία fuel μηχανική",
                pathname: "antlia-fuel-mhxaniki",
                products: ["product7", "product8", "product9"],
              },
              {
                name: "Αντλία fuel χειροκίνητη",
                pathname: "antlia-fuel-xeirokiniti",
                products: ["product7", "product8", "product9"],
              },
            ],
          },
          {
            name: "Σύστημα ψύξης",
            pathname: "systima-psiksis",
            types: [
              {
                name: "Υδραντλία",
                pathname: "ydrantlia",
                products: ["product6"],
              },
              {
                name: "Θερμοστάτες",
                pathname: "thermostates",
                products: ["product7", "product8", "product9"],
              },
            ],
          },
          {
            name: "Κολάρο",
            pathname: "kolaro",
            types: [
              {
                name: "Νερού-ψυγείου-καλοριφέρ",
                pathname: "nerou-psygeioy-kalorifer",
                products: ["product6"],
              },
              {
                name: "INTERCOOLER",
                pathname: "INTERCOOLER",
                products: ["product7", "product8", "product9"],
              },
            ],
          },
          {
            name: "Ιμάντες",
            pathname: "imantes",
            subs: [
              {
                name: "Βιομηχανικοί",
                pathname: "biomhxanikoi",
                types: [
                  { name: "A", pathname: "A", products: [] },
                  { name: "B & BX", pathname: "B-BX", products: [] },
                  { name: "C", pathname: "C", products: [] },
                  { name: "D", pathname: "D", products: [] },
                  { name: "Z", pathname: "Z", products: [] },
                  { name: "K", pathname: "K", products: [] },
                ],
              },
              {
                name: "Αυτοκινήτου",
                pathname: "aytokinitou",
                types: [
                  { name: "9.5", pathname: "9.5", products: [] },
                  { name: "12.5", pathname: "12.5", products: [] },
                  { name: "11.5", pathname: "11.5", products: [] },
                  { name: "PK", pathname: "PK", products: [] },
                  { name: "TEST", pathname: "TEST", products: [] },
                ],
              },
            ],
          },
          {
            name: "Φίλτρα",
            pathname: "filtra",
            types: [
              {
                name: "OIL",
                pathname: "OIL",
                products: ["product6"],
              },
              {
                name: "fuel",
                pathname: "fuel",
                products: ["product7", "product8", "product9"],
              },
              {
                name: "AIR",
                pathname: "AIR",
                products: ["product7", "product8", "product9"],
              },
              {
                name: "cabin",
                pathname: "cabin",
                products: ["product7", "product8", "product9"],
              },
              {
                name: "Hydraulic",
                pathname: "hydraulic",
                products: ["product7", "product8", "product9"],
              },
            ],
          },
          {
            name: "Ρουλεμάν",
            pathname: "rouleman",
            types: [
              {
                name: "Μονόσφαιρα",
                pathname: "monosfaira",
                products: ["product6"],
              },
              {
                name: "Κωνικά",
                pathname: "konika",
                products: ["product7", "product8", "product9"],
              },
              {
                name: "Βιομηχανικά",
                pathname: "biomhxanika",
                products: ["product7", "product8", "product9"],
              },
              {
                name: "A/C",
                pathname: "AC",
                products: ["product7", "product8", "product9"],
              },
            ],
          },
        ],
      },
      {
        name: "Βιομηχανικά",
        pathname: "biomixanika",
        subCategories: [
          // {
          //   name: "sub3",
          //   types: [
          //     { name: "type6", products: ["product14", "product15"] },
          //     {
          //       name: "type7",
          //       products: ["product16", "product17", "product18"],
          //     },
          //   ],
          // },
          // {
          //   name: "sub4",
          //   types: [
          //     { name: "type8", products: ["product19"] },
          //     {
          //       name: "type9",
          //       products: ["product120", "product21", "product22"],
          //     },
          //     {
          //       name: "type10",
          //       products: ["product23", "product24", "product25", "product26"],
          //     },
          //   ],
          // },
        ],
      },
      {
        name: "Χημικά - Λιπαντικά",
        pathname: "ximika-lipantika",
        subCategories: [
          // {
          //   name: "sub5",
          //   types: [
          //     { name: "type11", products: ["product27", "product28"] },
          //     {
          //       name: "type12",
          //       products: ["product29", "product30", "product31"],
          //     },
          //   ],
          // },
          // {
          //   name: "sub6",
          //   types: [
          //     { name: "type13", products: ["product32"] },
          //     {
          //       name: "type14",
          //       products: ["product33", "product34", "product35"],
          //     },
          //     {
          //       name: "type15",
          //       products: ["product36", "product37", "product38", "product39"],
          //     },
          //   ],
          // },
        ],
      },
      {
        name: "Διάφορα UNIVERSAL",
        pathname: "diafora-universal",
        subCategories: [
          // {
          //   name: "sub5",
          //   types: [
          //     { name: "type11", products: ["product27", "product28"] },
          //     {
          //       name: "type12",
          //       products: ["product29", "product30", "product31"],
          //     },
          //   ],
          // },
          // {
          //   name: "sub6",
          //   types: [
          //     { name: "type13", products: ["product32"] },
          //     {
          //       name: "type14",
          //       products: ["product33", "product34", "product35"],
          //     },
          //     {
          //       name: "type15",
          //       products: ["product36", "product37", "product38", "product39"],
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
  action
) => {
  switch (action.type) {
    // case
    default:
      return state;
  }
};
