const misc = require('../sMisc');


class ClothesSingletone {
    constructor() {
        this.manHats = [
            {id: 8, name: "Without Hat", color: 0, colors: [0], price: 0,},
            {id: 2, name: "Cap", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 500,},
            {id: 3, name: "Panama", color: 0, colors: [1, 2], price: 600,},
            {id: 4, name: "LS Cap", color: 0, colors: [0, 1], price: 1000,},
            {id: 5, name: "Cap", color: 0, colors: [0, 1], price: 500,},
            {id: 6, name: "Army Cap", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 700,},
        ];

        this.manGlasses = [
            {id: 0, name: "Without Glasses", color: 0, colors: [0], price: 0,},
            {id: 1, name: "Glasses №1", color: 0, colors: [1], price: 500,},
            {id: 2, name: "Glasses №2", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
        ];

        this.manEars = [
            {id: 0, name: "Rien", color: 0, colors: [0], price: 0,},
            {id: 4, name: "Boucle d'oreille 1", color: 0, colors: [1], price: 100,},
        ];

        this.manWatches = [
            {id: 2, name: "Rien", color: 0, colors: [0], price: 0,},
            {id: 0, name: "Philip patek Tourbillon", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
        ];

        this.manNeck = [
            {id: 0, name: "Rien", color: 0, colors: [0], price: 0,},
            {id: 35, name: "Chaîne en argent", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 2000,},
        ];

        this.manTops = [
            {
                id: 0,
                name: "Simple T-Shirt",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 7, 8, 11],
                price: 650,
                torso: 0,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 1,
                name: "Simple T-Shirt",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14],
                price: 550,
                torso: 0,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 5,
                name: "Undershirt",
                color: 0,
                colors: [0, 1, 2, 7],
                price: 350,
                torso: 5,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 8,
                name: "Shirt",
                color: 0,
                colors: [0, 10, 13, 14],
                price: 700,
                torso: 8,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 13,
                name: "Shirt",
                color: 0,
                colors: [0, 1, 2, 3, 5, 13],
                price: 800,
                torso: 11,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 14,
                name: "Shirt",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 950,
                torso: 12,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 16,
                name: "T-Shirt",
                color: 0,
                colors: [0, 1, 2],
                price: 600,
                torso: 0,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 17,
                name: "Undershirt",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5],
                price: 700,
                torso: 5,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 18,
                name: "Colored Shirt",
                color: 0,
                colors: [0, 1, 2, 3],
                price: 900,
                torso: 0,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
        ];

        this.manLegs = [
            {
                id: 1,
                name: "1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 2,
                name: "2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 3,
                name: "3",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 4,
                name: "4",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 5,
                name: "5",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 6,
                name: "6",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 7,
                name: "7",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 8,
                name: "8",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 9,
                name: "9",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 10,
                name: "10",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 11,
                name: "11",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 12,
                name: "12",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 13,
                name: "13",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 14,
                name: "14",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 15,
                name: "15",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 16,
                name: "16",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 17,
                name: "17",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 18,
                name: "18",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 19,
                name: "19",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 20,
                name: "20",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 21,
                name: "21",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 22,
                name: "22",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 23,
                name: "23",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 24,
                name: "24",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 25,
                name: "25",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 26,
                name: "26",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 27,
                name: "27",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 28,
                name: "28",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 29,
                name: "29",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 30,
                name: "30",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 31,
                name: "31",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 32,
                name: "32",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 33,
                name: "33",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 34,
                name: "34",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 35,
                name: "35",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 36,
                name: "36",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 37,
                name: "37",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 38,
                name: "38",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 39,
                name: "39",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 40,
                name: "40",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 41,
                name: "41",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 42,
                name: "42",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 43,
                name: "43",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 44,
                name: "44",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 45,
                name: "45",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 46,
                name: "46",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 47,
                name: "47",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 48,
                name: "48",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 49,
                name: "49",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 50,
                name: "50",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 51,
                name: "51",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 52,
                name: "52",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 53,
                name: "53",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 54,
                name: "54",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 55,
                name: "55",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 56,
                name: "56",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 57,
                name: "57",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 58,
                name: "58",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 59,
                name: "59",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 60,
                name: "60",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 61,
                name: "61",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 62,
                name: "62",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 63,
                name: "63",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 64,
                name: "64",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 65,
                name: "65",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 66,
                name: "66",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 67,
                name: "67",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 68,
                name: "68",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 69,
                name: "69",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 70,
                name: "70",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 71,
                name: "71",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 72,
                name: "72",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 73,
                name: "73",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 74,
                name: "74",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 75,
                name: "75",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 76,
                name: "76",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 77,
                name: "77",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 78,
                name: "78",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 79,
                name: "79",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 80,
                name: "80",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 81,
                name: "81",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 82,
                name: "82",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 83,
                name: "83",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 84,
                name: "84",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 85,
                name: "85",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 86,
                name: "86",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 87,
                name: "87",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 88,
                name: "88",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 89,
                name: "89",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 90,
                name: "90",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 91,
                name: "91",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 92,
                name: "92",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 93,
                name: "93",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 94,
                name: "94",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 95,
                name: "95",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 96,
                name: "96",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 97,
                name: "97",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 98,
                name: "98",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 99,
                name: "99",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 100,
                name: "100",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 101,
                name: "101",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 102,
                name: "102",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 103,
                name: "103",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 104,
                name: "104",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 105,
                name: "105",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 106,
                name: "106",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 107,
                name: "107",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 108,
                name: "108",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 109,
                name: "109",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 110,
                name: "110",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 111,
                name: "111",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 112,
                name: "112",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 113,
                name: "113",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 114,
                name: "114",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 115,
                name: "115",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 116,
                name: "116",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 117,
                name: "117",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 118,
                name: "118",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 119,
                name: "119",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
        ];
        this.manFeet = [
            {
                id: 34,
                name: "Pieds nu",
                color: 0,
                colors: [0],
                price: 400,
            },
            {
                id: 1,
                name: "Vans",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 3,
                name: "Mocassins",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 5,
                name: "Tongs",
                color: 0,
                colors: [0, 1, 2, 3],
                price: 400,
            },
            {
                id: 6,
                name: "Claquettes chaussettes",
                color: 0,
                colors: [0, 1],
                price: 400,
            },
            {
                id: 7,
                name: "Reebook",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 8,
                name: "Stan smith",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 9,
                name: "New Balance",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 10,
                name: "Richelieu",
                color: 0,
                colors: [0],
                price: 400,
            },
            {
                id: 12,
                name: "Timberland",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 14,
                name: "Timberland supra",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 15,
                name: "Chelsea Boots",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 18,
                name: "Derbies",
                color: 0,
                colors: [0, 1],
                price: 400,
            },
            {
                id: 20,
                name: "Richelieu vernie",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 400,
            },

            {
                id: 21,
                name: "Richelieu décontractée",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 400,
            },
            {
                id: 22,
                name: "Converse",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 400,
            },
            {
                id: 24,
                name: "Bottes de sécurité",
                color: 0,
                colors: [0],
                price: 400,
            },
            {
                id: 28,
                name: "Louboutin",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5],
                price: 2000,
            },
            {
                id: 31,
                name: "Air Max",
                color: 0,
                colors: [0, 1, 2, 3, 4],
                price: 400,
            },

            {
                id: 32,
                name: "Jordan",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 36,
                name: "Mocassins",
                color: 0,
                colors: [0, 1, 2, 3],
                price: 400,
            },
            {
                id: 37,
                name: "Bottes de Cowboy",
                color: 0,
                colors: [0, 1, 2, 3, 4],
                price: 400,
            },
            {
                id: 38,
                name: "Bottines de Cowboy",
                color: 0,
                colors: [0, 1, 2, 3, 4],
                price: 400,
            },
            {
                id: 42,
                name: "Janoski",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                price: 400,
            },
            {
                id: 46,
                name: "Chaussures de motard",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                price: 400,
            },
            {
                id: 51,
                name: "Doc Martens",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5],
                price: 400,
            },
            {
                id: 55,
                name: "Zanotti",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                price: 400,
            },
            {
                id: 57,
                name: "Puma hautes",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 400,
            },
            {
                id: 59,
                name: "Quechua",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 61,
                name: "Quechua randonnée",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7],
                price: 400,
            },
            {
                id: 64,
                name: "Valentino",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 67,
                name: "Palmes",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 75,
                name: "Balenciaga Triple S",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 2000,
            },
            {
                id: 93,
                name: "Balenciaga Triple S-MAX",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                price: 400,
            },
            {
                id: 77,
                name: "Adidas Flash",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 400,
            },
            {
                id: 79,
                name: "Bottes Gothiques",
                color: 0,
                colors: [0, 1],
                price: 400,
            },
            {
                id: 80,
                name: "Bottines Gothiques",
                color: 0,
                colors: [0, 1],
                price: 400,
            },
            {
                id: 92,
                name: "Gucci",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7],
                price: 8000,
            },
            {
                id: 17,
                name: "Chaussons de lutin",
                color: 0,
                colors: [0],
                price: 400,
            },
        ];

        this.womanHats = [
            {id: 57, name: "Without Hat", color: 0, colors: [0], price: 0,},
        ];

        this.womanGlasses = [
            {id: 13, name: "Without Glasses", color: 0, colors: [0], price: 0,},
            {id: 0, name: "Glasses №1", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 500,},
            {id: 21, name: "Glasses №2", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
        ];

        this.womanEars = [
            {id: 0, name: "Rien", color: 0, colors: [0], price: 0,},
            {id: 4, name: "Boucle d'oreille 1", color: 0, colors: [1], price: 100,},
        ];

        this.womanWatches = [
            {id: 1, name: "Rien", color: 0, colors: [0], price: 0,},
            {id: 2, name: "Montre 1", color: 0, colors: [1], price: 400,},
        ];

        this.womanNeck = [
            {id: 0, name: "Rien", color: 0, colors: [0], price: 0,},
            {id: 35, name: "Chaîne en argent", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 2000,},
        ];

        this.womanTops = [
            {
                id: 0,
                name: "Simple T-Shirt",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 500,
                torso: 0,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 2,
                name: "Simple T-Shirt",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 650,
                torso: 2,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 3,
                name: " Jersey",
                color: 0,
                colors: [0, 1, 2, 3, 4, 10, 11, 12, 13, 14],
                price: 750,
                torso: 3,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 4,
                name: " Sport Undershirt",
                color: 0,
                colors: [13, 14],
                price: 450,
                torso: 4,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },
            {
                id: 5,
                name: " Sport Undershirt",
                color: 0,
                colors: [0, 1, 7, 9],
                price: 450,
                torso: 4,
                undershirt: 15,
                underColor: 0,
                underColors: [0],
            },

        ];

        this.womanLegs = [
            {
                id: 0,
                name: "Fit Jeans",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 750,
            },
            {
                id: 1,
                name: "Wide Jeans",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 1000,
            },
        ];

        this.womanFeet = [
            {
                id: 1,
                name: "Shoes",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 800,
            },
            {
                id: 2,
                name: "Sneakers",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
        ];

    }

    getPrice(player, title, number) {
        if (title === "Hats") {
            if (player.model === 1885233650) return this.manHats[number].price;
            else return this.womanHats[number].price;
        } else if (title === "Glasses") {
            if (player.model === 1885233650) return this.manGlasses[number].price;
            else return this.womanGlasses[number].price;
        } else if (title === "Ears") {
            if (player.model === 1885233650) return this.manEars[number].price;
            else return this.womanEars[number].price;
        } else if (title === "Watches") {
            if (player.model === 1885233650) return this.manWatches[number].price;
            else return this.womanWatches[number].price;
        } else if (title === "Neck") {
            if (player.model === 1885233650) return this.manNeck[number].price;
            else return this.womanNeck[number].price;
        } else if (title === "Tops") {
            if (player.model === 1885233650) return this.manTops[number].price;
            else return this.womanTops[number].price;
        } else if (title === "Legs") {
            if (player.model === 1885233650) return this.manLegs[number].price;
            else return this.womanLegs[number].price;
        } else if (title === "Feet") {
            if (player.model === 1885233650) return this.manFeet[number].price;
            else return this.womanFeet[number].price;
        }
    }

    setClothes(player, d) {
        if (!player.loggedIn) return;
        if (player.model === 1885233650) {
            this.setManClothes(player, d.title, d);
        } else {
            this.setWomanClothes(player, d.title, d);
        }
    }

    setManClothes(player, title, d) {
        if (title === "Hats") {
            player.setProp(0, this.manHats[d.number].id, d.color);
        } else if (title === "Glasses") {
            player.setProp(1, this.manGlasses[d.number].id, d.color);
        } else if (title === "Ears") {
            player.setProp(2, this.manEars[d.number].id, d.color);
        } else if (title === "Watches") {
            player.setProp(6, this.manWatches[d.number].id, d.color);
        } else if (title === "Neck") {
            player.setClothes(7, this.manNeck[d.number].id, d.color, 0);
        } else if (title === "Tops") {
            player.setClothes(11, this.manTops[d.number].id, d.color, 0);
            player.setClothes(3, this.manTops[d.number].torso, 0, 0);
            player.setClothes(8, this.manTops[d.number].undershirt, d.underColor, 0);
        } else if (title === "Legs") {
            player.setClothes(4, this.manLegs[d.number].id, d.color, 0);
        } else if (title === "Feet") {
            player.setClothes(6, this.manFeet[d.number].id, d.color, 0);
        }
    }

    setWomanClothes(player, title, d) {
        if (title === "Hats") {
            player.setProp(0, this.womanHats[d.number].id, d.color);
        } else if (title === "Glasses") {
            player.setProp(1, this.womanGlasses[d.number].id, d.color);
        } else if (title === "Ears") {
            player.setProp(2, this.womanEars[d.number].id, d.color);
        } else if (title === "Watches") {
            player.setProp(6, this.womanWatches[d.number].id, d.color);
        } else if (title === "Neck") {
            player.setClothes(7, this.womanNeck[d.number].id, d.color, 0);
        } else if (title === "Tops") {
            player.setClothes(11, this.womanTops[d.number].id, d.color, 0);
            player.setClothes(3, this.womanTops[d.number].torso, 0, 0);
            player.setClothes(8, this.womanTops[d.number].undershirt, d.underColor, 0);
        } else if (title === "Legs") {
            player.setClothes(4, this.womanLegs[d.number].id, d.color, 0);
        } else if (title === "Feet") {
            player.setClothes(6, this.womanFeet[d.number].id, d.color, 0);
        }
    }

    async saveClothes(player, d) {
        const obj = {
            number: d.number,
            color: d.color,
        }
        if (d.title === "Hats") {
            await misc.query(`UPDATE usersClothes SET hats = '${JSON.stringify(obj)}' WHERE id = ${player.guid}`);
        } else if (d.title === "Glasses") {
            await misc.query(`UPDATE usersClothes SET glasses = '${JSON.stringify(obj)}' WHERE id = ${player.guid}`);
        } else if (d.title === "Ears") {
            await misc.query(`UPDATE usersClothes SET ears = '${JSON.stringify(obj)}' WHERE id = ${player.guid}`);
        } else if (d.title === "Watches") {
            await misc.query(`UPDATE usersClothes SET watches = '${JSON.stringify(obj)}' WHERE id = ${player.guid}`);
        } else if (d.title === "Neck") {
            await misc.query(`UPDATE usersClothes SET neck = '${JSON.stringify(obj)}' WHERE id = ${player.guid}`);
        } else if (d.title === "Tops") {
            obj.underColor = d.underColor;
            await misc.query(`UPDATE usersClothes SET tops = '${JSON.stringify(obj)}' WHERE id = ${player.guid}`);
        } else if (d.title === "Legs") {
            await misc.query(`UPDATE usersClothes SET legs = '${JSON.stringify(obj)}' WHERE id = ${player.guid}`);
        } else if (d.title === "Feet") {
            await misc.query(`UPDATE usersClothes SET feet = '${JSON.stringify(obj)}' WHERE id = ${player.guid}`);
        }
    }

    async createNewUser(id) {
        let obj = {number: 0, color: 0};
        obj = JSON.stringify(obj);
        let tops = {number: 0, color: 0, underColor: 0};
        tops = JSON.stringify(tops);
        await misc.query(`INSERT INTO usersClothes (id, hats, glasses, ears, watches, neck, tops, legs, feet) VALUES ('${id}', '${obj}', '${obj}', '${obj}', '${obj}', '${obj}', '${tops}', '${obj}', '${obj}');`);
    }

    async loadPlayerClothes(player) {
        const d = await misc.query(`SELECT hats, glasses, ears, watches, neck, tops, legs, feet FROM usersClothes WHERE id = '${player.guid}'`);
        if (d[0].hats) {
            const hats = JSON.parse(d[0].hats);
            hats.title = "Hats";
            this.setClothes(player, hats);
        }

        if (d[0].glasses) {
            const glasses = JSON.parse(d[0].glasses);
            glasses.title = "Glasses";
            this.setClothes(player, glasses);
        }

        if (d[0].ears) {
            const ears = JSON.parse(d[0].ears);
            ears.title = "Ears";
            this.setClothes(player, ears);
        }

        if (d[0].watches) {
            const watches = JSON.parse(d[0].watches);
            watches.title = "Watches";
            this.setClothes(player, watches);
        }

        if (d[0].neck) {
            const neck = JSON.parse(d[0].neck);
            neck.title = "Neck";
            this.setClothes(player, neck);
        }

        if (d[0].tops) {
            const tops = JSON.parse(d[0].tops);
            tops.title = "Tops";
            this.setClothes(player, tops);
        }

        if (d[0].legs) {
            const legs = JSON.parse(d[0].legs);
            legs.title = "Legs";
            this.setClothes(player, legs);
        }

        if (d[0].feet) {
            const feet = JSON.parse(d[0].feet);
            feet.title = "Feet";
            this.setClothes(player, feet);
        }
    }
}

const clothesSingletone = new ClothesSingletone();
module.exports = clothesSingletone;


mp.events.add(
    {
        "sClothes-SetCloth": (player, obj) => {
            const d = JSON.parse(obj);
            clothesSingletone.setClothes(player, d);
        },

    });
