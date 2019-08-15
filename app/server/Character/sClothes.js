const misc = require('../sMisc');


class ClothesSingletone {
    constructor() {
        function loadMans() {
            this.manHats = [
                {id: 8, name: "Sans chapeau", color: 0, colors: [0], price: 0,},
                {id: 2, name: "Bonnet", color: 0, colors: [0,1,2,3,4,5,6,7], price: 500,},
                {id: 4, name: "Casquette LS", color: 0, colors: [0,1], price: 500,},
                {id: 5, name: "Bonnet 2", color: 0, colors: [0,1], price: 500,},
                {id: 6, name: "Casquette", color: 0, colors: [0,1,2,3,4,5,6], price: 500,},
                {id: 12, name: "Chapeau", color: 0, colors: [0,1,2,3,4,5,6,7], price: 500,},
                {id: 13, name: "Chapeau 2", color: 0, colors: [0,1,2,3,4,5,6,7], price: 500,},
                {id: 14, name: "Bandana", color: 0, colors: [0,1,2,3,4,5,6,7], price: 500,},
                {id: 20, name: "Bob 1", color: 0, colors: [0,1,2,3,4,5], price: 500,},
                {id: 21, name: "Chapeau en paille", color: 0, colors: [0,1,2,3,4,5,6,7], price: 500,},
                {id: 26, name: "Chapeau 3", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 27, name: "Chapeau 4", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 28, name: "Bonnet 3", color: 0, colors: [0,1,2,3,4,5], price: 500,},
                {id: 29, name: "Chapeau 5", color: 0, colors: [0,1,2,3,4,5,6,7], price: 500,},
                {id: 37, name: "Casque bière", color: 0, colors: [0,1,2,3,4,5], price: 500,},
                {id: 44, name: "Casquette 2", color: 0, colors: [0,1,2,3,4,5,6,7], price: 500,},
                {id: 45, name: "Casquette à l'envers", color: 0, colors: [0,1,2,3,4,5,6,7], price: 500,},
                {id: 54, name: "Casquette 3", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 55, name: "Casquette 4", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 56, name: "Casquette 5", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 130, name: "130", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 131, name: "131", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 132, name: "132", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 135, name: "135", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 136, name: "136", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
                {id: 94, name: "94", color: 0, colors: [0,1,2,3,4,5,6,7,8,9,10], price: 500,},
            ];

        this.manGlasses = [
            {id: 0, name: "Without Glasses", color: 0, colors: [0], price: 0,},
            {id: 1, name: "Lunettes 1", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 500,},
            {id: 2, name: "Lunettes 2", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 3, name: "Lunettes 3", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 4, name: "Lunettes 4", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 5, name: "Lunettes 5", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 6, name: "Lunettes 6", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 7, name: "Lunettes 7", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 8, name: "Lunettes 8", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 9, name: "Lunettes 9", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 10, name: "Lunettes 10", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 11, name: "Lunettes 11", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 12, name: "Lunettes 12", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 13, name: "Lunettes 13", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 14, name: "Lunettes 14", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 15, name: "Lunettes 15", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 16, name: "Lunettes 16", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 17, name: "Lunettes 17", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 18, name: "Lunettes 18", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 19, name: "Lunettes 19", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 20, name: "Lunettes 20", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 21, name: "Lunettes 21", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 22, name: "Lunettes 22", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 23, name: "Lunettes 23", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 24, name: "Lunettes 24", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 25, name: "Lunettes 25", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 28, name: "Lunettes 28", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},
            {id: 29, name: "Lunettes 29", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], price: 450,},

        ];

        this.manEars = [
            {id: 33, name: "Rien", color: 0, colors: [0], price: 0,},
            {id: 0, name: "Oreillette 1", color: 0, colors: [0], price: 100,},
            {id: 1, name: "Oreillette 2", color: 0, colors: [0], price: 100,},
            {id: 2, name: "Oreillette 3", color: 0, colors: [0], price: 100,},
            {id: 3, name: "3", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 4, name: "4", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 5, name: "5", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 6, name: "6", color: 0, colors: [0, 1], price: 100,},
            {id: 7, name: "7", color: 0, colors: [0, 1], price: 100,},
            {id: 8, name: "8", color: 0, colors: [0, 1], price: 100,},
            {id: 9, name: "9", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 10, name: "10", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 11, name: "11", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 12, name: "12", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 13, name: "13", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 14, name: "14", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 15, name: "15", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 16, name: "16", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 17, name: "17", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 18, name: "18", color: 0, colors: [0, 1, 2, 3, 4], price: 100,},
            {id: 19, name: "19", color: 0, colors: [0, 1, 2, 3, 4], price: 100,},
            {id: 20, name: "20", color: 0, colors: [0, 1, 2, 3, 4], price: 100,},
            {id: 21, name: "21", color: 0, colors: [0, 1], price: 100,},
            {id: 22, name: "22", color: 0, colors: [0, 1], price: 100,},
            {id: 23, name: "23", color: 0, colors: [0, 1], price: 100,},
            {id: 24, name: "24", color: 0, colors: [0, 1, 2, 3], price: 100,},
            {id: 25, name: "25", color: 0, colors: [0, 1, 2, 3], price: 100,},
            {id: 26, name: "26", color: 0, colors: [0, 1, 2, 3], price: 100,},
            {id: 27, name: "27", color: 0, colors: [0, 1], price: 100,},
            {id: 28, name: "28", color: 0, colors: [0, 1], price: 100,},
            {id: 29, name: "29", color: 0, colors: [0, 1], price: 100,},
            {id: 30, name: "30", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 31, name: "31", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 32, name: "32", color: 0, colors: [0, 1, 2], price: 100,},
            {id: 34, name: "34", color: 0, colors: [0, 1], price: 100,},
            {id: 35, name: "35", color: 0, colors: [0, 1], price: 100,},
            {id: 36, name: "36", color: 0, colors: [0, 1], price: 100,},
            {id: 37, name: "37", color: 0, colors: [0, 1], price: 100,},
            {id: 38, name: "38", color: 0, colors: [0, 1], price: 100,},
            {id: 39, name: "39", color: 0, colors: [0, 1, 2, 3], price: 100,},
            {id: 40, name: "40", color: 0, colors: [0, 1, 2, 3], price: 100,},
        ];

        this.manWatches = [
            {id: 2, name: "Rien", color: 0, colors: [0], price: 0,},
            {id: 0, name: "Philip Patek Tourbillon", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 1, name: "Smart Watch", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 800,},
            {id: 3, name: "Diesel", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 1200,},
            {id: 10, name: "Rolex", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 12000,},
            {id: 8, name: "Philip Patek Nautilus", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 5, name: "Smart Watch 2", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 800,},
            {id: 4, name: "Montre 1", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 6, name: "Montre 2", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 7, name: "Montre 3", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 9, name: "Montre 4", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 11, name: "Montre 5", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 12, name: "Montre 6", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 13, name: "Montre 7", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 14, name: "Montre 8", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 15, name: "Montre 9", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 16, name: "Montre 10", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 17, name: "Montre 11", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 18, name: "Montre 12", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 19, name: "Montre 13", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 20, name: "Montre 14", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 21, name: "Montre 15", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 30, name: "Montre 16", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 31, name: "Montre 17", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 32, name: "Montre 18", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 33, name: "Montre 19", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 34, name: "Montre 20", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 35, name: "Montre 21", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 36, name: "Montre 22", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 37, name: "Montre 23", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 38, name: "Montre 24", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
            {id: 39, name: "Montre 25", color: 0, colors: [0, 1, 2, 3, 4, 5, 6, 7], price: 20000,},
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
                name: "Jean 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 4,
                name: "Jean 2",
                color: 0,
                colors: [0, 1, 2, 4],
                price: 550,
            },
            {
                id: 76,
                name: "Jean déchiré",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7],
                price: 550,
            },
            {
                id: 3,
                name: "Jogging 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 5,
                name: "Jogging 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 69,
                name: "Jogging fantaisie",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 100,
                name: "Jogging fantaisie 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 78,
                name: "Jogging en coton 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7],
                price: 550,
            },
            {
                id: 79,
                name: "Jogging en coton 2",
                color: 0,
                colors: [0, 1, 2],
                price: 550,
            },
            {
                id: 7,
                name: "Pantalon 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 22,
                name: "Pantalon 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                price: 550,
            },
            {
                id: 24,
                name: "Pantalon court 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5],
                price: 550,
            },
            {
                id: 26,
                name: "Pantalon skinny 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 550,
            },
            {
                id: 28,
                name: "Pantalon habillé 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 45,
                name: "Pantalon habillé 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6],
                price: 550,
            },
            {
                id: 49,
                name: "Pantalon habillé 3",
                color: 0,
                colors: [0, 1, 2, 3, 4],
                price: 550,
            },
            {
                id: 52,
                name: "Pantalon habillé 4",
                color: 0,
                colors: [0, 1, 2, 3],
                price: 550,
            },
            {
                id: 105,
                name: "Pantalon double couture",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 550,
            },
            {
                id: 116,
                name: "Pantalon luxe",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                price: 2000,
            },
            {
                id: 118,
                name: "Pantalon de luxe 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 117,
                name: "Short de luxe",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                price: 550,
            },
            {
                id: 53,
                name: "Pantalon Versace",
                color: 0,
                colors: [0],
                price: 6000,
            },
            {
                id: 60,
                name: "Pantalon à rayures",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 550,
            },
            {
                id: 9,
                name: "Pantalon militaire",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 65,
                name: "Pantalon fantaisie",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                price: 550,
            },
            {
                id: 67,
                name: "Pantalon de motard",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 550,
            },
            {
                id: 77,
                name: "Pantalon de motard lumineux",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                price: 550,
            },
            {
                id: 71,
                name: "Pantalon cuir 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5],
                price: 550,
            },
            {
                id: 73,
                name: "Pantalon cuir 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5],
                price: 550,
            },
            {
                id: 15,
                name: "Short 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 42,
                name: "Short 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 16,
                name: "Short de bain 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 550,
            },
            {
                id: 54,
                name: "Short de bain 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6],
                price: 550,
            },
            {
                id: 17,
                name: "Short en coton 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                price: 550,
            },
            {
                id: 18,
                name: "Short de course 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 14,
                name: "Short de course 2",
                color: 0,
                colors: [0, 1, 3],
                price: 550,
            },
            {
                id: 68,
                name: "Pantalon America 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                price: 550,
            },
            {
                id: 29,
                name: "Pantalon America 2",
                color: 0,
                colors: [0, 1, 2],
                price: 550,
            },
            {
                id: 58,
                name: "Pantalon de Noël 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 32,
                name: "Pantalon de Noël 2",
                color: 0,
                colors: [0, 1, 2, 3],
                price: 550,
            },
            {
                id: 61,
                name: "Caleçon",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                price: 550,
            },
            {
                id: 80,
                name: "Pantacourt en coton 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7],
                price: 550,
            },
            {
                id: 81,
                name: "Pantacourt en coton 2",
                color: 0,
                colors: [0, 1, 2],
                price: 550,
            },
            {
                id: 82,
                name: "Jean court 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                price: 550,
            },
            {
                id: 83,
                name: "Jean court 2",
                color: 0,
                colors: [0, 1, 2, 3],
                price: 550,
            },
            {
                id: 86,
                name: "Pantalon cargo",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 88,
                name: "Short cargo",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 89,
                name: "Salopette cargo",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 90,
                name: "Salopette en jean",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                price: 550,
            },
            {
                id: 94,
                name: "Meggings 1",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 95,
                name: "Meggings 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                price: 550,
            },
            {
                id: 98,
                name: "Pantalon de travail",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 102,
                name: "Pantalon de travail 2",
                color: 0,
                colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                price: 550,
            },
            {
                id: 103,
                name: "Short de travail",
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
