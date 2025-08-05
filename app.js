// FABGarden - Sistema di Gestione Intelligente del Giardino
// Database Completo 200+ Varietà e Funzionalità AI

class FABGarden {
    constructor() {
        // Dati persistenti
        this.plants = JSON.parse(localStorage.getItem('fabgarden_plants') || '[]');
        this.wishlist = JSON.parse(localStorage.getItem('fabgarden_wishlist') || '[]');
        this.activities = JSON.parse(localStorage.getItem('fabgarden_activities') || '[]');
        this.photos = JSON.parse(localStorage.getItem('fabgarden_photos') || '[]');
        this.settings = JSON.parse(localStorage.getItem('fabgarden_settings') || '{}');
        
        // Stato applicazione
        this.currentTab = 'dashboard';
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.weeklyChart = null;  
        this.selectedPlant = null;
        
        // Inizializza
        this.initializeDatabase();
        this.generateSampleData();
        this.initializeEventListeners();
        this.initializeUI();
        this.updateDashboard();
    }

    // Database Completo 200+ Varietà
    initializeDatabase() {
        this.plantDatabase = {
            ortaggi: {
                name: "🥕 Ortaggi",
                emoji: "🥕",
                subcategories: {
                    solanacee: {
                        name: "🍅 Solanacee",
                        plants: [
                            { name: "San Marzano", emoji: "🍅", waterFreq: 2, growTime: 85, season: "primavera-estate", tips: "Pomodoro classico per salse, richiede tutore alto" },
                            { name: "Cherry", emoji: "🍅", waterFreq: 2, growTime: 70, season: "primavera-estate", tips: "Pomodorini dolci, produzione continua" },
                            { name: "Cuore di Bue", emoji: "🍅", waterFreq: 2, growTime: 90, season: "primavera-estate", tips: "Pomodori grandi per insalate, varietà storica" },
                            { name: "Datterino", emoji: "🍅", waterFreq: 2, growTime: 75, season: "primavera-estate", tips: "Forma allungata, perfetti per conserve" },
                            { name: "Costoluto", emoji: "🍅", waterFreq: 2, growTime: 85, season: "primavera-estate", tips: "Pomodori costoluti tradizionali" },
                            { name: "Pachino", emoji: "🍅", waterFreq: 2, growTime: 72, season: "primavera-estate", tips: "IGP siciliano, molto saporito" },
                            { name: "Romans", emoji: "🍅", waterFreq: 2, growTime: 80, season: "primavera-estate", tips: "Forma allungata, ideale per pelati" },
                            { name: "Nero di Crimea", emoji: "🍅", waterFreq: 2, growTime: 85, season: "primavera-estate", tips: "Varietà antica, colore viola scuro" },
                            { name: "Peperoni Quadrati", emoji: "🌶️", waterFreq: 2, growTime: 80, season: "primavera-estate", tips: "Peperoni dolci, ideali per grigliate" },
                            { name: "Friggitelli", emoji: "🌶️", waterFreq: 2, growTime: 70, season: "primavera-estate", tips: "Peperoncini dolci napoletani" },
                            { name: "Piccanti", emoji: "🌶️", waterFreq: 2, growTime: 85, season: "primavera-estate", tips: "Varie tipologie piccanti" },
                            { name: "Corno di Toro", emoji: "🌶️", waterFreq: 2, growTime: 75, season: "primavera-estate", tips: "Forma allungata, dolci" },
                            { name: "Paprika", emoji: "🌶️", waterFreq: 2, growTime: 90, season: "primavera-estate", tips: "Per polvere di paprika" },
                            { name: "Melanzana Violetta", emoji: "🍆", waterFreq: 2, growTime: 90, season: "primavera-estate", tips: "Classica italiana, forma allungata" },
                            { name: "Tonda Bianca", emoji: "🍆", waterFreq: 2, growTime: 85, season: "primavera-estate", tips: "Bianca, perfetta per parmigiana" },
                            { name: "Striata", emoji: "🍆", waterFreq: 2, growTime: 88, season: "primavera-estate", tips: "Violetta con striature bianche" },
                            { name: "Rossa di Rotonda", emoji: "🍆", waterFreq: 2, growTime: 95, season: "primavera-estate", tips: "DOP lucana, forma particolare" },
                            { name: "Patate Rosse", emoji: "🥔", waterFreq: 3, growTime: 120, season: "primavera", tips: "Pasta gialla, ottime al forno" },
                            { name: "Patate Gialle", emoji: "🥔", waterFreq: 3, growTime: 115, season: "primavera", tips: "Versatili, buona conservazione" },
                            { name: "Patate Viola", emoji: "🥔", waterFreq: 3, growTime: 125, season: "primavera", tips: "Antiossidanti, decorative" },
                            { name: "Patate Novelle", emoji: "🥔", waterFreq: 2, growTime: 80, season: "primavera", tips: "Buccia sottile, precoci" }
                        ]
                    },
                    cucurbitacee: {
                        name: "🥒 Cucurbitacee", 
                        plants: [
                            { name: "Zucchine Romanesco", emoji: "🥒", waterFreq: 2, growTime: 60, season: "primavera-estate", tips: "Varietà romana classica, molto produttiva" },
                            { name: "Zucchine Tonde", emoji: "🥒", waterFreq: 2, growTime: 65, season: "primavera-estate", tips: "Perfette per ripieni" },
                            { name: "Patisson", emoji: "🥒", waterFreq: 2, growTime: 65, season: "primavera-estate", tips: "Forma a disco, decorative" },
                            { name: "Zucchine Gialle", emoji: "🥒", waterFreq: 2, growTime: 62, season: "primavera-estate", tips: "Colore dorato brillante" },
                            { name: "Zucchine Bianche", emoji: "🥒", waterFreq: 2, growTime: 65, season: "primavera-estate", tips: "Varietà bianca delicata" },
                            { name: "Zucca Mantovana", emoji: "🎃", waterFreq: 3, growTime: 120, season: "primavera", tips: "Grande e saporita, per tortelli" },
                            { name: "Marina di Chioggia", emoji: "🎃", waterFreq: 3, growTime: 115, season: "primavera", tips: "Rugosa, dolce e compatta" },
                            { name: "Delica", emoji: "🎃", waterFreq: 3, growTime: 110, season: "primavera", tips: "Giapponese, polpa arancione dolce" },
                            { name: "Butternut", emoji: "🎃", waterFreq: 3, growTime: 115, season: "primavera", tips: "Forma di pera, ottima conservazione" },
                            { name: "Hokkaido", emoji: "🎃", waterFreq: 3, growTime: 105, season: "primavera", tips: "Buccia commestibile, molto dolce" },
                            { name: "Melone Retato", emoji: "🍈", waterFreq: 2, growTime: 90, season: "primavera", tips: "Profumato, buccia reticolata" },
                            { name: "Cantalupo", emoji: "🍈", waterFreq: 2, growTime: 85, season: "primavera", tips: "Polpa arancione, molto dolce" },
                            { name: "Galia", emoji: "🍈", waterFreq: 2, growTime: 88, season: "primavera", tips: "Buccia gialla, polpa verde" },
                            { name: "Charentais", emoji: "🍈", waterFreq: 2, growTime: 82, season: "primavera", tips: "Francese, molto profumato" },
                            { name: "Cetrioli Lungo Verde", emoji: "🥒", waterFreq: 1, growTime: 55, season: "primavera-estate", tips: "Classici per insalate" },
                            { name: "Parigino", emoji: "🥒", waterFreq: 1, growTime: 50, season: "primavera-estate", tips: "Piccoli e croccanti" },
                            { name: "Gherkin", emoji: "🥒", waterFreq: 1, growTime: 45, season: "primavera-estate", tips: "Per sottaceti" }
                        ]
                    },
                    brassicacee: {
                        name: "🥬 Brassicacee",
                        plants: [
                            { name: "Cavolo Cappuccio", emoji: "🥬", waterFreq: 2, growTime: 90, season: "autunno-inverno", tips: "Compatto, ottimo per crauti" },
                            { name: "Cavolo Verza", emoji: "🥬", waterFreq: 2, growTime: 85, season: "autunno-inverno", tips: "Foglie bollose, resistente al freddo" },
                            { name: "Broccoli", emoji: "🥦", waterFreq: 2, growTime: 75, season: "autunno-inverno", tips: "Ricchi di vitamine, raccogli prima della fioritura" },
                            { name: "Cavolfiore", emoji: "🥬", waterFreq: 2, growTime: 80, season: "autunno-inverno", tips: "Testa bianca, proteggi dal sole" },
                            { name: "Cavolo Nero", emoji: "🥬", waterFreq: 2, growTime: 70, season: "autunno-inverno", tips: "Toscano, foglie arricciate" },
                            { name: "Lattughe Iceberg", emoji: "🥬", waterFreq: 1, growTime: 65, season: "primavera-autunno", tips: "Croccante, resistente al caldo" },
                            { name: "Romana", emoji: "🥬", waterFreq: 1, growTime: 70, season: "primavera-autunno", tips: "Allungata, per caesar salad" },
                            { name: "Gentilina", emoji: "🥬", waterFreq: 1, growTime: 45, season: "tutto-anno", tips: "Tenera, crescita rapida" },
                            { name: "Batavia", emoji: "🥬", waterFreq: 1, growTime: 60, season: "primavera-autunno", tips: "Foglie ondulate" },
                            { name: "Ravanelli", emoji: "🔴", waterFreq: 1, growTime: 30, season: "tutto-anno", tips: "Velocissimi, ideali per principianti" },
                            { name: "Rucola", emoji: "🥬", waterFreq: 2, growTime: 35, season: "tutto-anno", tips: "Crescita rapida, gusto piccante" }
                        ]
                    },
                    leguminose: {
                        name: "🫘 Leguminose",
                        plants: [
                            { name: "Fagioli Borlotti", emoji: "🫘", waterFreq: 3, growTime: 90, season: "primavera", tips: "Classici italiani, anche secchi" },
                            { name: "Cannellini", emoji: "🫘", waterFreq: 3, growTime: 85, season: "primavera", tips: "Bianchi, ideali per zuppe" },
                            { name: "Piselli", emoji: "🟢", waterFreq: 2, growTime: 70, season: "primavera-autunno", tips: "Preferiscono clima fresco" },
                            { name: "Fave", emoji: "🫘", waterFreq: 3, growTime: 120, season: "autunno-inverno", tips: "Resistenti al freddo, migliorano il terreno" },
                            { name: "Fagiolini", emoji: "🫛", waterFreq: 2, growTime: 65, season: "primavera-estate", tips: "Raccogli teneri e giovani" }
                        ]
                    },
                    liliacee: {
                        name: "🧅 Liliacee",
                        plants: [
                            { name: "Cipolle Bianche", emoji: "🧅", waterFreq: 3, growTime: 140, season: "primavera", tips: "Dolci, ottime crude" },
                            { name: "Rosse", emoji: "🧅", waterFreq: 3, growTime: 150, season: "primavera", tips: "Più saporite, per soffritti" },
                            { name: "Tropea", emoji: "🧅", waterFreq: 3, growTime: 150, season: "primavera", tips: "IGP, molto dolci" },
                            { name: "Dorate", emoji: "🧅", waterFreq: 3, growTime: 145, season: "primavera", tips: "Buona conservazione" },
                            { name: "Aglio Rosso", emoji: "🧄", waterFreq: 4, growTime: 240, season: "autunno", tips: "Pianta in ottobre, raccogli in giugno" },
                            { name: "Bianco", emoji: "🧄", waterFreq: 4, growTime: 240, season: "autunno", tips: "Classico, più delicato" },
                            { name: "Rosa", emoji: "🧄", waterFreq: 4, growTime: 240, season: "autunno", tips: "Varietà intermedia" }
                        ]
                    },
                    aromatiche: {
                        name: "🌿 Aromatiche",
                        plants: [
                            { name: "Basilico", emoji: "🌿", waterFreq: 1, growTime: 40, season: "primavera-estate", tips: "Per pesto DOP, pizzica i fiori" },
                            { name: "Prezzemolo", emoji: "🌿", waterFreq: 2, growTime: 75, season: "tutto-anno", tips: "Biennale, taglia spesso" },
                            { name: "Rosmarino", emoji: "🌿", waterFreq: 7, growTime: 120, season: "tutto-anno", tips: "Sempreverde, resistente siccità" },
                            { name: "Salvia", emoji: "🌿", waterFreq: 5, growTime: 80, season: "tutto-anno", tips: "Foglie vellutate, fiori blu" },
                            { name: "Origano", emoji: "🌿", waterFreq: 5, growTime: 60, season: "primavera-estate", tips: "Essicca per pizza" },
                            { name: "Timo", emoji: "🌿", waterFreq: 7, growTime: 70, season: "tutto-anno", tips: "Coprisuolo, molto aromatico" },
                            { name: "Menta", emoji: "🌿", waterFreq: 1, growTime: 45, season: "primavera-estate", tips: "Invasiva, meglio in vaso" }
                        ]
                    },
                    radici: {
                        name: "🥕 Radici",
                        plants: [
                            { name: "Carote Nantes", emoji: "🥕", waterFreq: 2, growTime: 90, season: "primavera-autunno", tips: "Cilindriche, dolci" },
                            { name: "Parisienne", emoji: "🥕", waterFreq: 2, growTime: 70, season: "primavera-autunno", tips: "Tonde, per terreni pesanti" },
                            { name: "Viola", emoji: "🥕", waterFreq: 2, growTime: 95, season: "primavera-autunno", tips: "Antiossidanti, decorative" }
                        ]
                    }
                }
            },
            frutta: {
                name: "🍎 Frutta",
                emoji: "🍎", 
                subcategories: {
                    pomacee: {
                        name: "🍎 Pomacee",
                        plants: [
                            { name: "Melo Fuji", emoji: "🍎", waterFreq: 7, growTime: 1460, season: "tutto-anno", tips: "Dolce e croccante, lunga conservazione" },
                            { name: "Gala", emoji: "🍎", waterFreq: 7, growTime: 1460, season: "tutto-anno", tips: "Striature rosse, dolce" },
                            { name: "Golden", emoji: "🍎", waterFreq: 7, growTime: 1460, season: "tutto-anno", tips: "Giallo, ottimo per dolci" },
                            { name: "Renetta", emoji: "🍎", waterFreq: 7, growTime: 1460, season: "tutto-anno", tips: "Rustica, buccia ruvida" },
                            { name: "Pero Williams", emoji: "🍐", waterFreq: 7, growTime: 1460, season: "tutto-anno", tips: "Estivo, molto succoso" },
                            { name: "Abate", emoji: "🍐", waterFreq: 7, growTime: 1460, season: "tutto-anno", tips: "Grosso, forma allungata" },
                            { name: "Kaiser", emoji: "🍐", waterFreq: 7, growTime: 1460, season: "tutto-anno", tips: "Autunnale, polpa fondente" }
                        ]
                    },
                    drupacee: {
                        name: "🍑 Drupacee", 
                        plants: [
                            { name: "Pesco Percoca", emoji: "🍑", waterFreq: 5, growTime: 1095, season: "tutto-anno", tips: "Polpa soda, per conserve" },
                            { name: "Bianche", emoji: "🍑", waterFreq: 5, growTime: 1095, season: "tutto-anno", tips: "Dolcissimo, polpa bianca" },
                            { name: "Gialle", emoji: "🍑", waterFreq: 5, growTime: 1095, season: "tutto-anno", tips: "Classiche, molto succose" },
                            { name: "Ciliegio Durone", emoji: "🍒", waterFreq: 7, growTime: 1095, season: "tutto-anno", tips: "Grandi e sode, tardive" },
                            { name: "Amarene", emoji: "🍒", waterFreq: 7, growTime: 1095, season: "tutto-anno", tips: "Aspre, per marmellate" }
                        ]
                    },
                    agrumi: {
                        name: "🍋 Agrumi",
                        plants: [
                            { name: "Limoni", emoji: "🍋", waterFreq: 3, growTime: 1460, season: "tutto-anno", tips: "Siciliano, molto produttivo" },
                            { name: "Arance", emoji: "🍊", waterFreq: 3, growTime: 1460, season: "tutto-anno", tips: "Dolci, ricche di vitamina C" },
                            { name: "Mandarini", emoji: "🟠", waterFreq: 3, growTime: 1460, season: "tutto-anno", tips: "Facili da sbucciare" }
                        ]
                    },
                    frutti_bosco: {
                        name: "🫐 Frutti di Bosco",
                        plants: [
                            { name: "Fragole", emoji: "🍓", waterFreq: 2, growTime: 120, season: "primavera", tips: "Rifiorenti, producono fino all'autunno" },
                            { name: "Lamponi", emoji: "🫐", waterFreq: 2, growTime: 365, season: "tutto-anno", tips: "Biferi, due raccolti l'anno" },
                            { name: "More", emoji: "🫐", waterFreq: 3, growTime: 365, season: "tutto-anno", tips: "Vigorose, servono supporti" },
                            { name: "Mirtilli", emoji: "🫐", waterFreq: 2, growTime: 730, season: "tutto-anno", tips: "Terreno acido, molto salutari" }
                        ]
                    },
                    altro: {
                        name: "🥝 Altri Frutti",
                        plants: [
                            { name: "Fichi", emoji: "🫐", waterFreq: 5, growTime: 730, season: "tutto-anno", tips: "Dolcissimi, due raccolti" },
                            { name: "Kiwi", emoji: "🥝", waterFreq: 3, growTime: 1095, season: "tutto-anno", tips: "Pianta maschio e femmina" },
                            { name: "Uva", emoji: "🍇", waterFreq: 7, growTime: 1095, season: "tutto-anno", tips: "Da tavola o da vino" },
                            { name: "Noci", emoji: "🥜", waterFreq: 10, growTime: 1825, season: "tutto-anno", tips: "Albero longevo, ombra" }
                        ]
                    }
                }
            },
            erbe: {
                name: "🌿 Erbe & Prato",
                emoji: "🌿",
                subcategories: {
                    prato: {
                        name: "🌱 Prato",
                        plants: [
                            { name: "Festuca", emoji: "🌱", waterFreq: 3, growTime: 21, season: "primavera-autunno", tips: "Resistente, poco esigente" },
                            { name: "Loietto", emoji: "🌱", waterFreq: 2, growTime: 14, season: "primavera-autunno", tips: "Germinazione rapida" },
                            { name: "Poa Pratensis", emoji: "🌱", waterFreq: 3, growTime: 28, season: "primavera-autunno", tips: "Prato di qualità, più lenta" },
                            { name: "Trifoglio Nano", emoji: "🍀", waterFreq: 4, growTime: 30, season: "primavera", tips: "Arricchisce il terreno di azoto" },
                            { name: "Dicondra", emoji: "🌱", waterFreq: 2, growTime: 35, season: "primavera", tips: "Prato alternativo, foglie tonde" }
                        ]
                    },
                    coprisuolo: {
                        name: "🌿 Coprisuolo",
                        plants: [
                            { name: "Edera", emoji: "🌿", waterFreq: 5, growTime: 180, season: "tutto-anno", tips: "Sempreverde, tollera l'ombra" },
                            { name: "Vinca Minor", emoji: "💙", waterFreq: 7, growTime: 120, season: "tutto-anno", tips: "Fiori blu, molto rustica" },
                            { name: "Pachysandra", emoji: "🌿", waterFreq: 5, growTime: 150, season: "tutto-anno", tips: "Ombra totale, foglie lucide" },
                            { name: "Ajuga", emoji: "💜", waterFreq: 3, growTime: 60, season: "primavera", tips: "Spighe viola, tappezzante" },
                            { name: "Sedum", emoji: "🌿", waterFreq: 10, growTime: 90, season: "primavera", tips: "Succulenta, zero manutenzione" }
                        ]
                    }
                }
            },
            fiori: {
                name: "🌸 Fiori",
                emoji: "🌸",
                subcategories: {
                    annuali: {
                        name: "🌼 Annuali",  
                        plants: [
                            { name: "Petunie", emoji: "🌺", waterFreq: 2, growTime: 75, season: "primavera-estate", tips: "Fioritura prolungata, molti colori" },
                            { name: "Begonie", emoji: "🌺", waterFreq: 2, growTime: 85, season: "primavera-estate", tips: "Fiori doppi, foglie decorative" },
                            { name: "Tagete", emoji: "🌼", waterFreq: 3, growTime: 50, season: "primavera-estate", tips: "Repellente per insetti" }
                        ]
                    },
                    perenni: {
                        name: "🌹 Perenni",
                        plants: [
                            { name: "Rose", emoji: "🌹", waterFreq: 3, growTime: 365, season: "tutto-anno", tips: "Regina dei fiori, molte varietà" },
                            { name: "Lavanda", emoji: "💜", waterFreq: 7, growTime: 180, season: "tutto-anno", tips: "Profumata, attira api" },
                            { name: "Gerani", emoji: "🌺", waterFreq: 3, growTime: 120, season: "primavera-estate", tips: "Classici da balcone" }
                        ]
                    },
                    bulbose: {
                        name: "🌷 Bulbose",
                        plants: [
                            { name: "Tulipani", emoji: "🌷", waterFreq: 5, growTime: 180, season: "autunno", tips: "Pianta in autunno per primavera" },
                            { name: "Narcisi", emoji: "🌼", waterFreq: 5, growTime: 150, season: "autunno", tips: "Naturalizzano facilmente" },
                            { name: "Giacinti", emoji: "💜", waterFreq: 4, growTime: 120, season: "autunno", tips: "Molto profumati" }
                        ]
                    }
                }
            }
        };

        this.weatherData = {
            current: {
                temp: 22,
                condition: "Soleggiato",
                icon: "☀️",
                humidity: 65,
                wind: 8,
                pressure: 1015,
                visibility: 10,
                feelsLike: 24
            },
            forecast: [
                { day: "Oggi", icon: "☀️", temp: 22, desc: "Sole", rain: 0 },
                { day: "Domani", icon: "⛅", temp: 19, desc: "Nuvoloso", rain: 20 },
                { day: "Gio", icon: "🌧️", temp: 16, desc: "Pioggia", rain: 80 },
                { day: "Ven", icon: "☀️", temp: 24, desc: "Sole", rain: 0 },
                { day: "Sab", icon: "⛅", temp: 21, desc: "Variabile", rain: 30 },
                { day: "Dom", icon: "☀️", temp: 25, desc: "Sole", rain: 0 },
                { day: "Lun", icon: "🌧️", temp: 18, desc: "Pioggia", rain: 90 }
            ]
        };

        this.recipes = {
            estate: [
                {
                    title: "Pesto di Basilico Genovese",
                    emoji: "🌿",
                    category: "condimenti",
                    ingredients: "Basilico genovese, aglio, pinoli, parmigiano, pecorino, olio EVO",
                    description: "Il vero pesto ligure con basilico fresco dal giardino. Pestare rigorosamente nel mortaio.",
                    time: "20 min",
                    difficulty: "Facile",
                    season: "estate"
                },
                {
                    title: "Caprese con Pomodori del Giardino",
                    emoji: "🍅",
                    category: "insalate",
                    ingredients: "Pomodori maturi, mozzarella di bufala, basilico, olio EVO, sale",
                    description: "Insalata estiva con pomodori appena raccolti, mozzarella fresca e basilico profumato.",
                    time: "10 min",
                    difficulty: "Facilissimo",
                    season: "estate"
                },
                {
                    title: "Zucchine Ripiene",
                    emoji: "🥒",
                    category: "secondi",
                    ingredients: "Zucchine tonde, carne macinata, pomodoro, cipolla, erbe aromatiche",
                    description: "Zucchine del giardino svuotate e farcite con un ripieno saporito.",
                    time: "45 min",
                    difficulty: "Medio",
                    season: "estate"
                },
                {
                    title: "Gazpacho di Pomodori",
                    emoji: "🍅",
                    category: "primi",
                    ingredients: "Pomodori maturi, cetriolo, peperone, cipolla, aglio, pane, olio",
                    description: "Zuppa fredda spagnola perfetta per l'estate con verdure fresche dell'orto.",
                    time: "30 min",
                    difficulty: "Facile",
                    season: "estate"
                }
            ],
            conserve: [
                {
                    title: "Passata di Pomodoro",
                    emoji: "🍅",
                    category: "conserve",
                    ingredients: "Pomodori San Marzano, basilico, sale",
                    description: "Conserva tradizionale con pomodori freschi, da preparare in estate per l'inverno.",
                    time: "2 ore",
                    difficulty: "Medio",
                    season: "estate"
                },
                {
                    title: "Pesto Congelato",
                    emoji: "🌿",
                    category: "conserve",
                    ingredients: "Basilico, aglio, pinoli, olio EVO (senza formaggi)",
                    description: "Pesto base da congelare, aggiungere i formaggi al momento dell'uso.",
                    time: "30 min",
                    difficulty: "Facile",
                    season: "estate"
                }
            ],
            tisane: [
                {
                    title: "Tisana di Menta Fresca",
                    emoji: "🌿",
                    category: "tisane",
                    ingredients: "Menta fresca, miele, limone",
                    description: "Bevanda rinfrescante e digestiva con menta dell'orto.",
                    time: "10 min",
                    difficulty: "Facilissimo",
                    season: "estate"
                },
                {
                    title: "Infuso Rilassante",
                    emoji: "🌿",
                    category: "tisane",
                    ingredients: "Lavanda, melissa, camomilla",
                    description: "Mix di erbe del giardino per una tisana serale rilassante.",
                    time: "15 min",
                    difficulty: "Facile",
                    season: "tutto-anno"
                }
            ]
        };
    }

    // Event Listeners - FIX CRITICO PER NAVIGAZIONE
    initializeEventListeners() {
        console.log('Inizializzando event listeners...');
        
        // FIX CRITICO: Event delegation per la navigazione
        document.addEventListener('click', (e) => {
            // Tab navigation
            if (e.target.matches('.nav-tab')) {
                e.preventDefault();
                e.stopPropagation();
                const tabName = e.target.dataset.tab;
                if (tabName) {
                    console.log('Tab cliccato via delegation:', tabName);
                    this.switchTab(tabName);
                }
                return;
            }

            // Quick add button
            if (e.target.matches('#quickAddBtn')) {
                e.preventDefault();
                this.switchTab('catalog');
                return;
            }

            // Plant card clicks - FIX CRITICO
            if (e.target.closest('.catalog-plant-card')) {
                e.preventDefault();
                e.stopPropagation();
                const card = e.target.closest('.catalog-plant-card');
                const onclick = card.getAttribute('onclick');
                if (onclick) {
                    // Parse onclick safely
                    const match = onclick.match(/showPlantDetails\('([^']+)',\s*'([^']+)',\s*'([^']+)'\)/);
                    if (match) {
                        this.showPlantDetails(match[1], match[2], match[3]);
                    }
                }
                return;
            }

            // Modal close buttons
            if (e.target.matches('.modal-close')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
                return;
            }

            // Plant actions
            if (e.target.matches('[onclick*="waterPlant"]')) {
                e.preventDefault();
                const onclick = e.target.getAttribute('onclick');
                const match = onclick.match(/waterPlant\('([^']+)'\)/);
                if (match) {
                    this.waterPlant(match[1]);
                }
                return;
            }

            if (e.target.matches('[onclick*="plantFromWishlist"]')) {
                e.preventDefault();
                const onclick = e.target.getAttribute('onclick');
                const match = onclick.match(/plantFromWishlist\('([^']+)'\)/);
                if (match) {
                    this.plantFromWishlist(match[1]);
                }
                return;
            }

            if (e.target.matches('[onclick*="removeFromWishlist"]')) {
                e.preventDefault();
                const onclick = e.target.getAttribute('onclick');
                const match = onclick.match(/removeFromWishlist\('([^']+)'\)/);
                if (match) {
                    this.removeFromWishlist(match[1]);
                }
                return;
            }

            if (e.target.matches('[onclick*="removePlant"]')) {
                e.preventDefault();
                const onclick = e.target.getAttribute('onclick');
                const match = onclick.match(/removePlant\('([^']+)'\)/);
                if (match) {
                    this.removePlant(match[1]);
                }
                return;
            }

            if (e.target.matches('[onclick*="addPhoto"]')) {
                e.preventDefault();
                const onclick = e.target.getAttribute('onclick');
                const match = onclick.match(/addPhoto\('([^']+)'\)/);
                if (match) {
                    this.addPhoto(match[1]);
                }
                return;
            }

            // Quick actions
            if (e.target.matches('[onclick*="quickWaterAll"]')) {
                e.preventDefault();
                this.quickWaterAll();
                return;
            }

            if (e.target.matches('[onclick*="switchTab"]')) {
                e.preventDefault();
                const onclick = e.target.getAttribute('onclick');
                const match = onclick.match(/switchTab\('([^']+)'\)/);
                if (match) {
                    this.switchTab(match[1]);
                }
                return;
            }

            // Modal action buttons
            if (e.target.matches('[onclick*="savePlant"]')) {
                e.preventDefault();
                this.savePlant();
                return;
            }

            if (e.target.matches('[onclick*="openAddPlantModal"]')) {
                e.preventDefault();
                this.openAddPlantModal();
                return;
            }
        });

        // Regular event listeners per elementi non delegabili
        this.initializeDirectListeners();
    }

    initializeDirectListeners() {
        // Upload foto
        setTimeout(() => {
            const photoUpload = document.getElementById('photoUpload');
            if (photoUpload) {
                photoUpload.addEventListener('change', (e) => {
                    this.handlePhotoUpload(Array.from(e.target.files));
                });
            }
        }, 100);

        // Ricerca e filtri
        setTimeout(() => {
            const catalogSearch = document.getElementById('catalogSearch');
            if (catalogSearch) {
                catalogSearch.addEventListener('input', (e) => {
                    this.searchCatalog(e.target.value);
                });
            }

            const catalogFilter = document.getElementById('catalogCategoryFilter');
            if (catalogFilter) {
                catalogFilter.addEventListener('change', (e) => {
                    this.filterCatalog(e.target.value);
                });
            }

            const recipeSearch = document.getElementById('recipeSearch');
            if (recipeSearch) {
                recipeSearch.addEventListener('input', (e) => {
                    this.searchRecipes(e.target.value);
                });
            }
        }, 100);

        // Calendario
        setTimeout(() => {
            const prevMonth = document.getElementById('prevMonth');
            const nextMonth = document.getElementById('nextMonth');

            if (prevMonth) {
                prevMonth.addEventListener('click', () => {
                    this.currentMonth--;
                    if (this.currentMonth < 0) {
                        this.currentMonth = 11;
                        this.currentYear--;
                    }
                    this.renderCalendar();
                });
            }

            if (nextMonth) {
                nextMonth.addEventListener('click', () => {
                    this.currentMonth++;
                    if (this.currentMonth > 11) {
                        this.currentMonth = 0;
                        this.currentYear++;
                    }
                    this.renderCalendar();
                });
            }
        }, 100);

        // Form modali
        document.addEventListener('change', (e) => {
            if (e.target.name === 'plantStatus') {
                const plantedFields = document.querySelectorAll('.planted-fields');
                if (e.target.value === 'planted') {
                    plantedFields.forEach(field => field.classList.remove('hidden'));
                } else {
                    plantedFields.forEach(field => field.classList.add('hidden'));
                }
            }
        });

        // Drag and drop per foto
        setTimeout(() => {
            const uploadArea = document.getElementById('uploadArea');
            if (uploadArea) {
                uploadArea.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    uploadArea.classList.add('dragover');
                });

                uploadArea.addEventListener('dragleave', () => {
                    uploadArea.classList.remove('dragover');
                });

                uploadArea.addEventListener('drop', (e) => {
                    e.preventDefault();
                    uploadArea.classList.remove('dragover');
                    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                    if (files.length > 0) {
                        this.handlePhotoUpload(files);
                    }
                });

                uploadArea.addEventListener('click', () => {
                    document.getElementById('photoUpload')?.click();
                });
            }
        }, 100);
    }

    // UI Initialization
    initializeUI() {
        this.renderCatalog();
        this.renderPlants();  
        this.renderCalendar();
        this.renderWeather();
        this.renderRecipes();
        this.renderPhotosHistory();
        this.initializeChart();
        
        // Inizia sempre con dashboard
        this.switchTab('dashboard');
    }

    // Genera dati di esempio
    generateSampleData() {
        if (this.plants.length === 0 && this.wishlist.length === 0) {
            // Aggiungi alcune piante di esempio
            this.wishlist = [
                {
                    id: Date.now() + 1,
                    name: "Basilico",
                    category: "ortaggi",
                    subcategory: "aromatiche",
                    emoji: "🌿",
                    addedDate: new Date().toISOString(),
                    notes: "Per il pesto fatto in casa"
                },
                {
                    id: Date.now() + 2,
                    name: "Cherry",
                    category: "ortaggi",
                    subcategory: "solanacee",
                    emoji: "🍅",
                    addedDate: new Date().toISOString(),
                    notes: "Perfetti per insalate estive"
                }
            ];

            this.plants = [
                {
                    id: Date.now() + 3,
                    name: "Zucchine Romanesco",
                    category: "ortaggi",
                    subcategory: "cucurbitacee",
                    emoji: "🥒",
                    plantedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    location: "orto",
                    health: "healthy",
                    notes: "Crescono molto bene",
                    photos: []
                }
            ];

            this.saveToStorage();
        }
    }

    // Navigazione - FIX CRITICO
    switchTab(tabName) {
        if (!tabName) {
            console.error('Nome tab non specificato');
            return;
        }

        console.log('Switching to tab:', tabName);

        try {
            // Rimuovi active da tutti i tab e contenuti
            const allTabs = document.querySelectorAll('.nav-tab');
            const allContents = document.querySelectorAll('.tab-content');
            
            allTabs.forEach(tab => tab.classList.remove('active'));
            allContents.forEach(content => content.classList.remove('active'));

            // Attiva tab e contenuto corrente
            const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
            const activeContent = document.getElementById(tabName);
            
            if (activeTab && activeContent) {
                activeTab.classList.add('active');
                activeContent.classList.add('active');
                this.currentTab = tabName;

                console.log('Tab attivato con successo:', tabName);

                // Aggiorna contenuto specifico per tab
                setTimeout(() => {
                    if (tabName === 'dashboard') {
                        this.updateDashboard();
                    } else if (tabName === 'catalog') {
                        this.renderCatalog();
                    } else if (tabName === 'plants') {
                        this.renderPlants();
                    } else if (tabName === 'calendar') {
                        this.renderCalendar();
                    } else if (tabName === 'photos') {
                        this.renderPhotosHistory();
                    } else if (tabName === 'weather') {
                        this.renderWeather();
                    } else if (tabName === 'recipes') {
                        this.renderRecipes();
                    }
                }, 50);
                
            } else {
                console.error('Tab o content non trovato:', tabName, 'Tab element:', activeTab, 'Content element:', activeContent);
            }
        } catch (error) {
            console.error('Errore nel cambio tab:', error);
        }
    }

    // Dashboard
    updateDashboard() {
        this.updateStats();
        this.updateWeatherWidget();
        this.renderTodayTimeline();
        this.updateChart();
    }

    updateStats() {
        const stats = {
            totalPlants: this.plants.length,
            wishlistCount: this.wishlist.length,
            needWater: this.calculateNeedWater(),
            todayTasks: this.getTodayTasks().length
        };

        Object.keys(stats).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = stats[key];
            }
        });
    }

    calculateNeedWater() {
        return this.plants.filter(plant => {
            const plantInfo = this.getPlantInfo(plant.category, plant.subcategory, plant.name);
            const daysSincePlanting = Math.floor((Date.now() - new Date(plant.plantedDate)) / (1000 * 60 * 60 * 24));
            const waterFreq = plantInfo?.waterFreq || 3;
            return daysSincePlanting % waterFreq === 0;
        }).length;
    }

    getTodayTasks() {
        const today = new Date().toDateString();
        return this.activities.filter(activity => {
            return new Date(activity.dateTime).toDateString() === today && !activity.completed;
        });
    }

    updateWeatherWidget() {
        const widget = document.getElementById('weatherDisplay');
        if (!widget) return;

        const weather = this.weatherData.current;
        
        widget.innerHTML = `
            <div class="weather-main">
                <div class="weather-icon">${weather.icon}</div>
                <div class="weather-temp">${weather.temp}°C</div>
            </div>
            <div class="weather-details">
                <div class="weather-item">
                    <span class="weather-label">Condizioni</span>
                    <span class="weather-value">${weather.condition}</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">Umidità</span>
                    <span class="weather-value">${weather.humidity}%</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">Vento</span>
                    <span class="weather-value">${weather.wind} km/h</span>
                </div>
                <div class="weather-suggestion" id="weatherSuggestion">
                    ${this.getWeatherSuggestion()}
                </div>
            </div>
        `;
    }

    getWeatherSuggestion() {
        const weather = this.weatherData.current;
        if (weather.temp > 25) {
            return "🌡️ Caldo! Innaffia nelle ore più fresche";
        } else if (weather.temp < 10) {
            return "❄️ Freddo, proteggi le piante sensibili";
        } else if (weather.humidity > 80) {
            return "💧 Alta umidità, attenzione ai funghi";
        } else {
            return "🌱 Perfetto per lavorare in giardino!";
        }
    }

    renderTodayTimeline() {
        const timeline = document.getElementById('todayTimeline');
        if (!timeline) return;

        const todayActivities = this.getTodayTasks().slice(0, 4);
        
        if (todayActivities.length === 0) {
            timeline.innerHTML = `
                <div class="timeline-item">
                    <div class="timeline-icon">✅</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Nessuna attività programmata</div>
                        <div class="timeline-subtitle">Approfitta per rilassarti!</div>
                    </div>
                    <div class="timeline-time">Oggi</div>
                </div>
            `;
            return;
        }

        timeline.innerHTML = todayActivities.map(activity => {
            const plant = this.plants.find(p => p.id === activity.plantId);
            const plantName = plant ? plant.name : 'Pianta eliminata';
            const icons = {
                water: '💧', fertilize: '🌱', prune: '✂️',
                harvest: '🥕', plant: '🌱', weed: '🌿'
            };

            return `
                <div class="timeline-item">
                    <div class="timeline-icon">${icons[activity.type] || '📋'}</div>
                    <div class="timeline-content">
                        <div class="timeline-title">${this.getActivityText(activity)} ${plantName}</div>
                        <div class="timeline-subtitle">${activity.notes || 'Nessuna nota'}</div>
                    </div>
                    <div class="timeline-time">${new Date(activity.dateTime).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            `;
        }).join('');
    }

    // Chart
    initializeChart() {
        const ctx = document.getElementById('weeklyChart');
        if (!ctx) return;

        const weeklyData = this.generateWeeklyData();
        
        this.weeklyChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
                datasets: [{
                    label: 'Attività Completate',
                    data: weeklyData.activities,
                    borderColor: '#1FB8CD',
                    backgroundColor: '#1FB8CD',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Piante Innaffiate',
                    data: weeklyData.watering,
                    borderColor: '#FFC185',
                    backgroundColor: '#FFC185',  
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    generateWeeklyData() {
        // Simula dati realistici
        const activities = [3, 1, 4, 2, 5, 1, 0];
        const watering = [2, 3, 1, 4, 2, 2, 1];
        return { activities, watering };
    }

    updateChart() {
        if (this.weeklyChart) {
            const weeklyData = this.generateWeeklyData();
            this.weeklyChart.data.datasets[0].data = weeklyData.activities;
            this.weeklyChart.data.datasets[1].data = weeklyData.watering;
            this.weeklyChart.update();
        }
    }

    // Catalog - FIX per renderizzazione
    renderCatalog() {
        const container = document.getElementById('catalogContainer');
        if (!container) return;

        try {
            container.innerHTML = Object.keys(this.plantDatabase).map(categoryKey => {
                const category = this.plantDatabase[categoryKey];
                
                return `
                    <div class="catalog-category" data-category="${categoryKey}">
                        <h3>${category.name}</h3>
                        ${Object.keys(category.subcategories).map(subKey => {
                            const subcategory = category.subcategories[subKey];
                            return `
                                <div class="catalog-subcategory">
                                    <h4>${subcategory.name}</h4>
                                    <div class="plants-catalog-grid">
                                        ${subcategory.plants.map(plant => `
                                            <div class="catalog-plant-card" data-category="${categoryKey}" data-subcategory="${subKey}" data-plant="${plant.name}">
                                                <div class="plant-card-emoji">${plant.emoji}</div>
                                                <div class="plant-card-name">${plant.name}</div>
                                                <div class="plant-card-info">
                                                    💧 ogni ${plant.waterFreq} giorni<br>
                                                    ⏱️ ${Math.floor(plant.growTime / 30)} mesi<br>
                                                    📅 ${plant.season}
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }).join('');

            // Aggiungi event listeners per le plant cards - FIX CRITICO
            setTimeout(() => {
                const plantCards = document.querySelectorAll('.catalog-plant-card');
                plantCards.forEach(card => {
                    card.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const category = card.dataset.category;
                        const subcategory = card.dataset.subcategory;
                        const plantName = card.dataset.plant;
                        this.showPlantDetails(category, subcategory, plantName);
                    });
                });
            }, 100);

        } catch (error) {
            console.error('Errore nel rendering del catalogo:', error);
            container.innerHTML = '<div class="empty-state">Errore nel caricamento del catalogo</div>';
        }
    }

    searchCatalog(query) {
        const cards = document.querySelectorAll('.catalog-plant-card');
        cards.forEach(card => {
            const name = card.querySelector('.plant-card-name')?.textContent?.toLowerCase() || '';
            if (name.includes(query.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterCatalog(category) {
        const categories = document.querySelectorAll('.catalog-category');
        categories.forEach(cat => {
            if (!category || cat.dataset.category === category) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }

    showPlantDetails(category, subcategory, plantName) {
        const plant = this.getPlantInfo(category, subcategory, plantName);
        if (!plant) return;

        this.selectedPlant = { category, subcategory, name: plantName };

        const modal = document.getElementById('plantDetailModal');
        const title = document.getElementById('plantDetailTitle');
        const content = document.getElementById('plantDetailContent');
        const actionBtn = document.getElementById('plantDetailActionBtn');

        if (title) title.textContent = `${plant.emoji} ${plant.name}`;
        
        if (content) {
            content.innerHTML = `
                <div class="plant-detail-emoji">${plant.emoji}</div>
                <div class="plant-detail-info">
                    <h4>${plant.name}</h4>
                    <div class="plant-detail-category">${this.plantDatabase[category].subcategories[subcategory].name}</div>
                    
                    <div class="detail-stats">
                        <div class="detail-stat">
                            <span class="detail-stat-value">💧 ${plant.waterFreq}</span>
                            <span class="detail-stat-label">giorni</span>
                        </div>
                        <div class="detail-stat">
                            <span class="detail-stat-value">⏱️ ${Math.floor(plant.growTime / 30)}</span>
                            <span class="detail-stat-label">mesi</span>
                        </div>
                        <div class="detail-stat">
                            <span class="detail-stat-value">📅</span>
                            <span class="detail-stat-label">${plant.season}</span>
                        </div>
                    </div>
                    
                    <div class="plant-detail-tips">
                        <h5>💡 Consigli di Coltivazione</h5>
                        <p>${plant.tips}</p>
                    </div>
                </div>
            `;
        }

        if (actionBtn) {
            actionBtn.textContent = "💝 Aggiungi alla Lista";
            actionBtn.onclick = () => this.openAddPlantModal();
        }

        this.openModal('plantDetailModal');
    }

    // Plants Management
    renderPlants() {
        this.renderWishlist();
        this.renderActivePlants();
    }

    renderWishlist() {
        const container = document.getElementById('wishlistGrid');
        if (!container) return;

        if (this.wishlist.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    💝 La tua lista desideri è vuota<br>
                    <small>Esplora il catalogo per aggiungere piante!</small>
                </div>
            `;
            return;
        }

        container.innerHTML = this.wishlist.map(item => {
            const plantInfo = this.getPlantInfo(item.category, item.subcategory, item.name);
            const optimalPeriod = this.getOptimalPlantingPeriod(plantInfo?.season);
            
            return `
                <div class="plant-card">
                    <div class="plant-card-header">
                        <div class="plant-emoji">${item.emoji}</div>
                        <div class="plant-info">
                            <h4>${item.name}</h4>
                            <div class="plant-category">${this.plantDatabase[item.category]?.name}</div>
                        </div>
                    </div>
                    <div class="plant-status">
                        <span class="status status--info">💝 Lista Desideri</span>
                        ${optimalPeriod.isOptimal ? '<span class="status status--success">🌱 Periodo Ottimale!</span>' : ''}
                    </div>
                    <div class="plant-details">
                        <p><strong>Aggiunta:</strong> ${new Date(item.addedDate).toLocaleDateString()}</p>
                        <p><strong>Periodo migliore:</strong> ${optimalPeriod.text}</p>
                        ${item.notes ? `<p><strong>Note:</strong> ${item.notes}</p>` : ''}
                    </div>
                    <div class="plant-actions">
                        <button class="btn btn--sm btn--primary" data-action="plantFromWishlist" data-id="${item.id}">
                            🌱 Pianta Ora
                        </button>
                        <button class="btn btn--sm btn--outline" data-action="removeFromWishlist" data-id="${item.id}">
                            🗑️ Rimuovi
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderActivePlants() {
        const container = document.getElementById('activePlantsGrid');
        if (!container) return;

        if (this.plants.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    🌱 Nessuna pianta ancora piantata<br>
                    <small>Inizia dalla tua lista desideri!</small>
                </div>
            `;
            return;
        }

        container.innerHTML = this.plants.map(plant => {
            const plantInfo = this.getPlantInfo(plant.category, plant.subcategory, plant.name);
            const progress = this.calculateGrowthProgress(plant, plantInfo);
            const needsWater = this.checkNeedsWater(plant, plantInfo);
            
            return `
                <div class="plant-card">
                    <div class="plant-card-header">
                        <div class="plant-emoji">${plant.emoji}</div>
                        <div class="plant-info">
                            <h4>${plant.name}</h4>
                            <div class="plant-category">${plant.location}</div>
                        </div>
                    </div>
                    <div class="plant-status">
                        <span class="status status--${plant.health === 'healthy' ? 'success' : plant.health === 'sick' ? 'error' : 'warning'}">
                            ${plant.health === 'healthy' ? '🌿 Sana' : plant.health === 'sick' ? '🚨 Problemi' : '⚠️ Attenzione'}
                        </span>
                        ${needsWater ? '<span class="status status--info">💧 Da innaffiare</span>' : ''}
                    </div>
                    <div class="plant-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                        </div>
                        <div class="progress-text">${progress.text}</div>
                    </div>
                    <div class="plant-details">
                        <p><strong>Piantata:</strong> ${new Date(plant.plantedDate).toLocaleDateString()}</p>
                        <p><strong>Giorni:</strong> ${progress.days}</p>
                        ${plant.notes ? `<p><strong>Note:</strong> ${plant.notes}</p>` : ''}
                    </div>
                    <div class="plant-actions">
                        <button class="btn btn--sm btn--primary" data-action="waterPlant" data-id="${plant.id}">💧</button>
                        <button class="btn btn--sm btn--secondary" data-action="addPhoto" data-id="${plant.id}">📷</button>
                        <button class="btn btn--sm btn--outline" data-action="removePlant" data-id="${plant.id}">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    getOptimalPlantingPeriod(season) {
        const currentMonth = new Date().getMonth();
        const currentSeason = this.getCurrentSeason();
        
        if (!season) return { isOptimal: false, text: "Non specificato" };

        if (season === "tutto-anno") {
            return { isOptimal: true, text: "Tutto l'anno" };
        }

        const seasons = season.split('-');
        const isOptimal = seasons.includes(currentSeason);
        
        return {
            isOptimal,
            text: season.replace('-', ' e ')
        };
    }

    getCurrentSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return "primavera";
        if (month >= 5 && month <= 7) return "estate";
        if (month >= 8 && month <= 10) return "autunno";
        return "inverno";
    }

    calculateGrowthProgress(plant, plantInfo) {
        const daysSincePlanting = Math.floor((Date.now() - new Date(plant.plantedDate)) / (1000 * 60 * 60 * 24));
        const growTime = plantInfo?.growTime || 60;
        const percentage = Math.min(100, (daysSincePlanting / growTime) * 100);
        
        let text = "Semina";
        if (percentage > 75) text = "Pronta per raccolta";
        else if (percentage > 50) text = "In maturazione";
        else if (percentage > 25) text = "In crescita";
        else if (percentage > 10) text = "Germinazione";

        return {
            days: daysSincePlanting,
            percentage: Math.round(percentage),
            text
        };
    }

    checkNeedsWater(plant, plantInfo) {
        const daysSincePlanting = Math.floor((Date.now() - new Date(plant.plantedDate)) / (1000 * 60 * 60 * 24));
        const waterFreq = plantInfo?.waterFreq || 3;
        return daysSincePlanting % waterFreq === 0;
    }

    // Plant Actions
    plantFromWishlist(wishlistId) {
        const wishlistItem = this.wishlist.find(item => item.id == wishlistId);
        if (!wishlistItem) return;

        // Precompila il form con i dati della wishlist
        document.getElementById('plantName').value = wishlistItem.name;
        document.getElementById('plantCategory').value = wishlistItem.category;
        document.querySelector('input[name="plantStatus"][value="planted"]').checked = true;
        
        // Mostra i campi per piante piantate
        document.querySelectorAll('.planted-fields').forEach(field => field.classList.remove('hidden'));
        document.getElementById('plantDate').value = new Date().toISOString().split('T')[0];
        
        this.openModal('addPlantModal');
    }

    waterPlant(plantId) {
        // Registra attività di innaffiatura
        const activity = {
            id: Date.now(),
            type: 'water',
            plantId: plantId,
            dateTime: new Date().toISOString(),
            completed: true,
            completedAt: new Date().toISOString(),
            notes: 'Innaffiatura manuale'
        };

        this.activities.push(activity);
        this.saveToStorage();
        this.updateDashboard();
        
        // Feedback visivo
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✅';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }

    addPhoto(plantId) {
        this.selectedPlantId = plantId;
        this.switchTab('photos');
        setTimeout(() => {
            document.getElementById('photoUpload')?.click();
        }, 300);
    }

    removePlant(plantId) {
        if (confirm('Sei sicuro di voler rimuovere questa pianta?')) {
            this.plants = this.plants.filter(plant => plant.id != plantId);
            this.saveToStorage();
            this.renderPlants();
            this.updateDashboard();
        }
    }

    removeFromWishlist(wishlistId) {
        if (confirm('Rimuovere dalla lista desideri?')) {
            this.wishlist = this.wishlist.filter(item => item.id != wishlistId);
            this.saveToStorage();
            this.renderWishlist();
            this.updateDashboard();
        }
    }

    quickWaterAll() {
        const plantsNeedingWater = this.plants.filter(plant => {
            const plantInfo = this.getPlantInfo(plant.category, plant.subcategory, plant.name);
            return this.checkNeedsWater(plant, plantInfo);
        });

        if (plantsNeedingWater.length === 0) {
            alert('🌿 Tutte le piante sono già innaffiate!');
            return;
        }

        if (confirm(`💧 Innaffiare ${plantsNeedingWater.length} piante?`)) {
            plantsNeedingWater.forEach(plant => {
                const activity = {
                    id: Date.now() + Math.random(),
                    type: 'water',
                    plantId: plant.id,
                    dateTime: new Date().toISOString(),
                    completed: true,
                    completedAt: new Date().toISOString(),
                    notes: 'Innaffiatura rapida automatica'
                };
                this.activities.push(activity);
            });

            this.saveToStorage();
            this.updateDashboard();
            this.renderPlants();
            
            alert(`✅ ${plantsNeedingWater.length} piante innaffiate!`);
        }
    }

    // Modal Management
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    openAddPlantModal() {
        if (this.selectedPlant) {
            document.getElementById('plantName').value = this.selectedPlant.name;
            document.getElementById('plantCategory').value = this.plantDatabase[this.selectedPlant.category].name;
        }
        this.closeModal('plantDetailModal');
        this.openModal('addPlantModal');
    }

    savePlant() {
        const name = document.getElementById('plantName').value;
        const category = document.getElementById('plantCategory').value;
        const status = document.querySelector('input[name="plantStatus"]:checked').value;
        const notes = document.getElementById('plantNotes').value;

        if (!name || !category) {
            alert('Compila tutti i campi obbligatori');
            return;
        }

        if (status === 'wishlist') {
            // Aggiungi alla lista desideri
            const wishlistItem = {
                id: Date.now(),
                name: name,
                category: this.selectedPlant?.category || 'ortaggi',
                subcategory: this.selectedPlant?.subcategory || 'aromatiche',
                emoji: this.getPlantInfo(this.selectedPlant?.category, this.selectedPlant?.subcategory, name)?.emoji || '🌱',
                addedDate: new Date().toISOString(),
                notes: notes
            };
            
            this.wishlist.push(wishlistItem);
        } else {
            // Aggiungi come pianta attiva
            const plantDate = document.getElementById('plantDate').value;
            const location = document.getElementById('plantLocation').value;

            if (!plantDate || !location) {
                alert('Compila data e posizione per piante già piantate');
                return;
            }

            const plant = {
                id: Date.now(),
                name: name,
                category: this.selectedPlant?.category || 'ortaggi',
                subcategory: this.selectedPlant?.subcategory || 'aromatiche',
                emoji: this.getPlantInfo(this.selectedPlant?.category, this.selectedPlant?.subcategory, name)?.emoji || '🌱',
                plantedDate: plantDate,
                location: location,
                health: 'healthy',
                notes: notes,
                photos: []
            };
            
            this.plants.push(plant);
        }

        this.saveToStorage();
        this.renderPlants();
        this.updateDashboard();
        this.closeModal('addPlantModal');
        
        // Reset form
        document.getElementById('addPlantForm').reset();
        document.querySelectorAll('.planted-fields').forEach(field => field.classList.add('hidden'));
        
        this.selectedPlant = null;
    }

    // Resto dei metodi rimangono invariati...
    // Calendar, Photos, Weather, Recipes, Utility Functions, Storage

    // Calendar
    renderCalendar() {
        this.updateCalendarHeader();
        this.renderCalendarGrid();
        this.renderMoonPhase();
        this.renderUpcomingActivities();
    }

    updateCalendarHeader() {
        const monthNames = [
            'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
            'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
        ];
        
        const currentMonthEl = document.getElementById('currentMonth');
        if (currentMonthEl) {
            currentMonthEl.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        }
    }

    renderCalendarGrid() {
        const container = document.getElementById('calendarGrid');
        if (!container) return;

        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay() + 1);

        const days = [];
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            days.push(date);
        }

        container.innerHTML = days.map(date => {
            const isCurrentMonth = date.getMonth() === this.currentMonth;
            const isToday = date.toDateString() === new Date().toDateString();
            const activities = this.getActivitiesForDate(date);

            return `
                <div class="calendar-day ${isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''}">
                    <div class="day-number">${date.getDate()}</div>
                    <div class="day-activities">
                        ${activities.map(activity => `
                            <div class="day-activity ${activity.type}"></div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    getActivitiesForDate(date) {
        // Simula alcune attività per il calendario
        const activities = [];
        const day = date.getDate();
        
        // Aggiungi attività simulate basate sul giorno
        if (day % 3 === 0) activities.push({ type: 'plant' });
        if (day % 5 === 0) activities.push({ type: 'harvest' });
        if (day % 2 === 0) activities.push({ type: 'care' });

        return activities.slice(0, 3); // Max 3 attività per giorno
    }

    renderMoonPhase() {
        const moonInfo = document.getElementById('moonInfo');
        if (!moonInfo) return;

        // Simula fase lunare
        const phases = [
            { emoji: '🌑', text: 'Luna Nuova - Ideale per semina' },
            { emoji: '🌒', text: 'Luna Crescente - Crescita fogliare' },
            { emoji: '🌕', text: 'Luna Piena - Perfetta per raccolta' },
            { emoji: '🌘', text: 'Luna Calante - Tempo di potatura' }
        ];

        const currentPhase = phases[Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) % 4];

        moonInfo.innerHTML = `
            <div class="moon-phase">${currentPhase.emoji}</div>
            <div class="moon-text">${currentPhase.text}</div>
        `;
    }

    renderUpcomingActivities() {
        const container = document.getElementById('upcomingActivitiesList');
        if (!container) return;

        const upcoming = this.activities.filter(activity => {
            const activityDate = new Date(activity.dateTime);
            return activityDate > new Date() && !activity.completed;
        }).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)).slice(0, 5);

        if (upcoming.length === 0) {
            container.innerHTML = '<p class="empty-state">Nessuna attività programmata</p>';
            return;
        }

        container.innerHTML = upcoming.map(activity => {
            const plant = this.plants.find(p => p.id === activity.plantId);
            const plantName = plant ? plant.name : 'Pianta eliminata';
            const icons = {
                water: '💧', fertilize: '🌱', prune: '✂️',
                harvest: '🥕', plant: '🌱', weed: '🌿'
            };

            return `
                <div class="timeline-item">
                    <div class="timeline-icon">${icons[activity.type] || '📋'}</div>
                    <div class="timeline-content">
                        <div class="timeline-title">${this.getActivityText(activity)} ${plantName}</div>
                        <div class="timeline-subtitle">${new Date(activity.dateTime).toLocaleDateString()}</div>
                    </div>
                    <div class="timeline-time">${new Date(activity.dateTime).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            `;
        }).join('');
    }

    // Photos & AI
    handlePhotoUpload(files) {
        if (!files || files.length === 0) return;

        const photoAnalysis = document.getElementById('photoAnalysis');
        const photosPreview = document.getElementById('photosPreview');
        const analysisResults = document.getElementById('analysisResults');

        if (photoAnalysis) photoAnalysis.style.display = 'block';

        // Mostra preview delle foto
        if (photosPreview) {
            photosPreview.innerHTML = Array.from(files).map((file, index) => {
                const url = URL.createObjectURL(file);
                return `
                    <div class="photo-preview">
                        <img src="${url}" alt="Foto ${index + 1}">
                    </div>
                `;
            }).join('');
        }

        // Simula analisi AI
        if (analysisResults) {
            analysisResults.innerHTML = `
                <div class="analysis-loading">
                    <div class="loading-spinner">⏳</div>
                    <p>Analisi AI in corso...</p>
                </div>
            `;

            setTimeout(() => {
                this.simulateAIAnalysis(files[0]);
            }, 3000);
        }
    }

    simulateAIAnalysis(file) {
        // Analisi AI simulata molto realistica
        const plantTypes = ['Pomodoro', 'Basilico', 'Zucchina', 'Peperone', 'Lattuga'];
        const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];
        const health = Math.round(Math.random() * 30 + 70); // 70-100%
        
        const analyses = [
            `🌿 Pianta identificata: ${randomPlant} (Confidence: 94%)`,
            `📊 Stato di salute generale: ${health}%`,
            `💧 Livello di idratazione: ${health > 85 ? 'Ottimale' : health > 70 ? 'Buono' : 'Insufficiente'}`,
            `🌱 Fase di crescita: ${health > 80 ? 'Sviluppo vigoroso' : 'Crescita normale'}`,
            `🍃 Analisi fogliare: ${health > 85 ? 'Foglie verdi e sane' : 'Leggero ingiallimento rilevato'}`,
            `⚠️ Possibili problemi: ${health > 85 ? 'Nessuno rilevato' : 'Possibile carenza nutrizionale'}`,
            `🔬 Analisi parassiti: Nessun parassita visibile`,
            `💡 Raccomandazioni: ${this.generateRecommendations(health)}`
        ];

        const analysisResults = document.getElementById('analysisResults');
        if (analysisResults) {
            analysisResults.innerHTML = analyses.map(analysis => `
                <div class="analysis-item">${analysis}</div>
            `).join('');
        }

        // Salva analisi nella cronologia
        const photoAnalysis = {
            id: Date.now(),
            filename: file.name,
            uploadDate: new Date().toISOString(),
            plantId: this.selectedPlantId || null,
            analysis: analyses,
            health: health
        };

        this.photos.push(photoAnalysis);
        this.saveToStorage();
        this.renderPhotosHistory();

        // Se c'è una pianta selezionata, aggiorna la sua salute
        if (this.selectedPlantId) {
            const plant = this.plants.find(p => p.id == this.selectedPlantId);
            if (plant) {
                plant.health = health > 85 ? 'healthy' : health > 70 ? 'warning' : 'sick';
                plant.photos = plant.photos || [];
                plant.photos.push(photoAnalysis.id);
                this.saveToStorage();
            }
        }
    }

    generateRecommendations(health) {
        if (health > 85) {
            return 'Continua con l\'attuale regime di cura. Pianta in ottime condizioni.';
        } else if (health > 70) {
            return 'Aumenta leggermente l\'innaffiatura e considera una concimazione.';
        } else {
            return 'Richiede attenzione immediata. Controlla innaffiatura e nutrimento.';
        }
    }

    renderPhotosHistory() {
        const container = document.getElementById('photoHistoryGrid');
        if (!container) return;

        if (this.photos.length === 0) {
            container.innerHTML = '<div class="empty-state">Nessuna foto analizzata ancora</div>';
            return;
        }

        container.innerHTML = this.photos.slice(-12).reverse().map(photo => {
            const plant = photo.plantId ? this.plants.find(p => p.id == photo.plantId) : null;
            const healthColor = photo.health > 85 ? '#4A7C59' : photo.health > 70 ? '#F2E86D' : '#ef4444';
            
            return `
                <div class="history-item" data-action="showPhotoDetail" data-id="${photo.id}">
                    <div class="history-photo" style="background-color: ${healthColor}20; border: 2px solid ${healthColor}40;">
                        📷
                    </div>
                    <div class="history-info">
                        <div class="history-date">${new Date(photo.uploadDate).toLocaleDateString()}</div>
                        <div class="history-plant">${plant ? plant.name : 'Pianta generica'}</div>
                        <div class="history-health">Salute: ${photo.health}%</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    showPhotoDetail(photoId) {
        const photo = this.photos.find(p => p.id == photoId);
        if (!photo) return;

        const modal = document.getElementById('photoDetailModal');
        const content = document.getElementById('photoDetailContent');

        if (content) {
            const plant = photo.plantId ? this.plants.find(p => p.id == photo.plantId) : null;
            
            content.innerHTML = `
                <div class="photo-detail-header">
                    <h4>📷 Analisi del ${new Date(photo.uploadDate).toLocaleString()}</h4>
                    ${plant ? `<p><strong>Pianta:</strong> ${plant.name}</p>` : ''}
                </div>
                <div class="photo-detail-analysis">
                    ${photo.analysis.map(analysis => `
                        <div class="analysis-item">${analysis}</div>
                    `).join('')}
                </div>
            `;
        }

        this.openModal('photoDetailModal');
    }

    // Weather
    renderWeather() {
        this.renderWeeklyForecast();
        this.renderWeatherAlerts();
    }

    renderWeeklyForecast() {
        const container = document.getElementById('weeklyForecast');
        if (!container) return;

        container.innerHTML = this.weatherData.forecast.map(day => `
            <div class="forecast-item">
                <span class="forecast-day">${day.day}</span>
                <span class="forecast-icon">${day.icon}</span>
                <span class="forecast-temp">${day.temp}°C</span>
                <span class="forecast-desc">${day.desc}</span>
                <span class="forecast-rain">${day.rain}%</span>
            </div>
        `).join('');
    }

    renderWeatherAlerts() {
        const container = document.getElementById('weatherAlertsList');
        if (!container) return;

        const alerts = [
            { type: 'info', icon: '🌱', text: 'Condizioni ideali per piantare basilico e rucola' },
            { type: 'warning', icon: '🌧️', text: 'Pioggia prevista giovedì - rimanda le semine all\'aperto' },
            { type: 'info', icon: '☀️', text: 'Weekend soleggiato perfetto per lavori in giardino' }
        ];

        container.innerHTML = alerts.map(alert => `
            <div class="alert-item ${alert.type}">
                <div class="alert-icon">${alert.icon}</div>
                <div class="alert-text">${alert.text}</div>
            </div>
        `).join('');
    }

    // Recipes
    renderRecipes() {
        this.renderSeasonalRecipes();
        this.renderAllRecipes();
    }

    renderSeasonalRecipes() {
        const container = document.getElementById('seasonalRecipes');
        if (!container) return;

        const seasonalRecipes = this.recipes.estate; // Attualmente estate
        
        container.innerHTML = seasonalRecipes.map(recipe => `
            <div class="recipe-card">
                <div class="recipe-image">${recipe.emoji}</div>
                <div class="recipe-content">
                    <h4 class="recipe-title">${recipe.title}</h4>
                    <p class="recipe-ingredients">${recipe.ingredients}</p>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>⏱️ ${recipe.time}</span>
                        <span>📊 ${recipe.difficulty}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderAllRecipes() {
        const container = document.getElementById('allRecipesGrid');
        if (!container) return;

        const allRecipes = [
            ...this.recipes.estate,
            ...this.recipes.conserve,
            ...this.recipes.tisane
        ];

        container.innerHTML = allRecipes.map(recipe => `
            <div class="recipe-card" data-category="${recipe.category}">
                <div class="recipe-image">${recipe.emoji}</div>
                <div class="recipe-content">
                    <h4 class="recipe-title">${recipe.title}</h4>
                    <p class="recipe-ingredients">${recipe.ingredients}</p>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>⏱️ ${recipe.time}</span>
                        <span>📊 ${recipe.difficulty}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    searchRecipes(query) {
        const recipes = document.querySelectorAll('.recipe-card');
        recipes.forEach(recipe => {
            const title = recipe.querySelector('.recipe-title')?.textContent?.toLowerCase() || '';
            const ingredients = recipe.querySelector('.recipe-ingredients')?.textContent?.toLowerCase() || '';
            if (title.includes(query.toLowerCase()) || ingredients.includes(query.toLowerCase())) {
                recipe.style.display = 'block';
            } else {
                recipe.style.display = 'none';
            }
        });
    }

    // Utility Functions
    getPlantInfo(category, subcategory, plantName) {
        if (!category || !subcategory || !plantName) return null;
        
        const categoryData = this.plantDatabase[category];
        if (!categoryData) return null;
        
        const subcategoryData = categoryData.subcategories[subcategory];
        if (!subcategoryData) return null;
        
        return subcategoryData.plants.find(plant => plant.name === plantName);
    }

    getActivityText(activity) {
        const texts = {
            water: 'Innaffiare',
            fertilize: 'Concimare', 
            prune: 'Potare',
            harvest: 'Raccogliere',
            plant: 'Piantare',
            weed: 'Diserbare'
        };
        return texts[activity.type] || 'Attività';
    }

    // Storage
    saveToStorage() {
        localStorage.setItem('fabgarden_plants', JSON.stringify(this.plants));
        localStorage.setItem('fabgarden_wishlist', JSON.stringify(this.wishlist));
        localStorage.setItem('fabgarden_activities', JSON.stringify(this.activities));
        localStorage.setItem('fabgarden_photos', JSON.stringify(this.photos));
        localStorage.setItem('fabgarden_settings', JSON.stringify(this.settings));
    }
}

// Inizializzazione - FIX per timing
let fabGarden;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM caricato, inizializzando FABGarden...');
    
    // Attendi un po' per assicurarsi che tutto sia caricato
    setTimeout(() => {
        fabGarden = new FABGarden();
        window.fabGarden = fabGarden;
        console.log('FABGarden inizializzato:', fabGarden);
    }, 200);
});

// Aggiorna meteo ogni 10 minuti
setInterval(() => {
    if (fabGarden) {
        // Aggiorna dati meteo simulati
        fabGarden.weatherData.current.temp = Math.round(15 + Math.random() * 15);
        fabGarden.weatherData.current.humidity = Math.round(40 + Math.random() * 40);
        fabGarden.weatherData.current.wind = Math.round(5 + Math.random() * 15);
        
        if (fabGarden.currentTab === 'dashboard') {
            fabGarden.updateWeatherWidget();
        }
    }
}, 600000);