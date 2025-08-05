class FABGarden {
    constructor() {
        this.plants = JSON.parse(localStorage.getItem('fabgarden_plants') || '[]');
        this.customPlants = JSON.parse(localStorage.getItem('fabgarden_custom_plants') || '[]');
        this.settings = JSON.parse(localStorage.getItem('fabgarden_settings') || '{}');
        this.currentTab = 'dashboard';

        this.initializeDatabase();
        this.initUI();
        this.bindEvents();
        this.renderCatalog();
        this.updateDashboard();
        this.showTab(this.currentTab);
    }

    initializeDatabase() {
        this.defaultPlants = [
            {name: "Pomodoro San Marzano", emoji: "🍅", type: "ortaggio"},
            {name: "Cherry", emoji: "🍅", type: "ortaggio"},
            {name: "Basilico Genovese", emoji: "🌿", type: "aromatica"},
            {name: "Rucola", emoji: "🌿", type: "ortaggio"},
            {name: "Zucchina Romanesco", emoji: "🥒", type: "ortaggio"},
            {name: "Melanzana Violetta", emoji: "🍆", type: "ortaggio"},
            {name: "Zucca Mantovana", emoji: "🎃", type: "ortaggio"},
            {name: "Peperone Quadrato", emoji: "🌶️", type: "ortaggio"},
            {name: "Carota Nantes", emoji: "🥕", type: "ortaggio"},
            {name: "Cipolla Rossa", emoji: "🧅", type: "ortaggio"},
            {name: "Aglio", emoji: "🧄", type: "ortaggio"},
            {name: "Lattuga Iceberg", emoji: "🥬", type: "ortaggio"},
            {name: "Spinaci", emoji: "🥬", type: "ortaggio"},
            {name: "Prezzemolo", emoji: "🌿", type: "aromatica"},
            {name: "Rosmarino", emoji: "🌿", type: "aromatica"},
            {name: "Salvia", emoji: "🌿", type: "aromatica"},
            {name: "Fragole", emoji: "🍓", type: "frutto"},
            {name: "Lamponi", emoji: "🫐", type: "frutto"},
            {name: "More", emoji: "🫐", type: "frutto"},
            {name: "Rose", emoji: "🌹", type: "fiore"},
            {name: "Lavanda", emoji: "🪻", type: "fiore"},
            {name: "Girasole", emoji: "🌻", type: "fiore"}
        ];
    }

    initUI() {
        this.tabs = document.querySelectorAll('.nav-tab');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.catalogList = document.getElementById('catalogList');
        this.aiSearchInput = document.getElementById('aiSearchInput');
        this.aiSearchBtn = document.getElementById('aiSearchBtn');
        this.aiSearchFeedback = document.getElementById('aiSearchFeedback');
        this.myPlantsList = document.getElementById('myPlantsList');
        this.totalPlantsEl = document.getElementById('totalPlants');
        this.activeActivitiesEl = document.getElementById('activeActivities');
        this.todayActivitiesEl = document.getElementById('todayActivities');
    }

    bindEvents() {
        // Tab navigation
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.showTab(tab.getAttribute('data-tab'));
            });
        });

        // AI search
        if (this.aiSearchBtn) {
            this.aiSearchBtn.addEventListener('click', () => this.addPlantByAI());
        }

        // Enter key on AI search
        if (this.aiSearchInput) {
            this.aiSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addPlantByAI();
                }
            });
        }

        // Delete plants from catalog
        if (this.catalogList) {
            this.catalogList.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-btn')) {
                    const plantName = e.target.getAttribute('data-plant');
                    this.removePlantFromCatalog(plantName);
                }
            });
        }

        // Settings events
        const resetBtn = document.getElementById('resetDataBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Sei sicuro di voler cancellare tutti i dati? Questa azione non può essere annullata.')) {
                    this.resetAllData();
                }
            });
        }

        const saveLocationBtn = document.getElementById('saveLocationBtn');
        if (saveLocationBtn) {
            saveLocationBtn.addEventListener('click', () => {
                const location = document.getElementById('locationInput').value;
                this.settings.location = location;
                this.saveSettings();
                alert('Località salvata!');
            });
        }
    }

    showTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab buttons
        this.tabs.forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
        });
        
        // Update tab content
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabName);
        });

        // Update content based on active tab
        if (tabName === 'plants') {
            this.renderMyPlants();
        } else if (tabName === 'dashboard') {
            this.updateDashboard();
        }
    }

    getCatalogPlants() {
        return [...this.defaultPlants, ...this.customPlants];
    }

    renderCatalog() {
        if (!this.catalogList) return;
        
        const plants = this.getCatalogPlants();
        this.catalogList.innerHTML = '';
        
        if (plants.length === 0) {
            this.catalogList.innerHTML = '<p>Il catalogo è vuoto.</p>';
            return;
        }
        
        plants.forEach(plant => {
            const div = document.createElement('div');
            div.className = 'catalog-item';
            div.innerHTML = `
                <span>${plant.emoji} ${plant.name}</span> 
                <button class="delete-btn" data-plant="${plant.name}">Rimuovi</button>
            `;
            this.catalogList.appendChild(div);
        });
    }

    addPlantByAI() {
        if (!this.aiSearchInput || !this.aiSearchFeedback) return;
        
        const query = this.aiSearchInput.value.trim();
        if (!query) {
            this.aiSearchFeedback.textContent = 'Per favore inserisci il nome della pianta.';
            this.aiSearchFeedback.style.color = 'var(--errore)';
            return;
        }
        
        this.aiSearchFeedback.textContent = '🔍 Ricerca in corso...';
        this.aiSearchFeedback.style.color = 'var(--info)';

        // Simulate AI search delay
        setTimeout(() => {
            let emoji = "🌿";
            let type = "ortaggio";
            
            // Simple emoji assignment based on keywords
            if (/pomodoro|tomato/i.test(query)) {
                emoji = "🍅";
                type = "ortaggio";
            } else if (/zucchina|courgette/i.test(query)) {
                emoji = "🥒";
                type = "ortaggio";
            } else if (/melanzana|eggplant/i.test(query)) {
                emoji = "🍆";
                type = "ortaggio";
            } else if (/zucca|pumpkin/i.test(query)) {
                emoji = "🎃";
                type = "ortaggio";
            } else if (/basilico|basil/i.test(query)) {
                emoji = "🌿";
                type = "aromatica";
            } else if (/fragola|strawberry/i.test(query)) {
                emoji = "🍓";
                type = "frutto";
            } else if (/rosa|rose/i.test(query)) {
                emoji = "🌹";
                type = "fiore";
            } else if (/girasole|sunflower/i.test(query)) {
                emoji = "🌻";
                type = "fiore";
            }

            const newPlant = {
                name: query,
                emoji: emoji,
                type: type
            };

            // Check for duplicates
            const allPlants = this.getCatalogPlants();
            if (allPlants.some(p => p.name.toLowerCase() === query.toLowerCase())) {
                this.aiSearchFeedback.textContent = `❌ La pianta "${query}" è già presente nel catalogo.`;
                this.aiSearchFeedback.style.color = 'var(--errore)';
                return;
            }

            // Add to custom plants
            this.customPlants.push(newPlant);
            this.saveCustomPlants();
            this.renderCatalog();
            
            this.aiSearchFeedback.textContent = `✅ Pianta "${query}" aggiunta al catalogo!`;
            this.aiSearchFeedback.style.color = 'var(--successo)';
            this.aiSearchInput.value = '';
        }, 1500);
    }

    removePlantFromCatalog(name) {
        if (confirm(`Sei sicuro di voler rimuovere "${name}" dal catalogo?`)) {
            // Only remove from custom plants (default plants can't be removed)
            this.customPlants = this.customPlants.filter(p => p.name !== name);
            this.saveCustomPlants();
            this.renderCatalog();
            
            // Show feedback
            if (this.aiSearchFeedback) {
                this.aiSearchFeedback.textContent = `✅ Pianta "${name}" rimossa dal catalogo.`;
                this.aiSearchFeedback.style.color = 'var(--successo)';
            }
        }
    }

    renderMyPlants() {
        if (!this.myPlantsList) return;
        
        if (this.plants.length === 0) {
            this.myPlantsList.innerHTML = '<p>Non hai ancora aggiunto piante al tuo giardino.</p>';
            return;
        }
        
        this.myPlantsList.innerHTML = '';
        this.plants.forEach((plant, index) => {
            const div = document.createElement('div');
            div.className = 'plant-card';
            div.innerHTML = `
                <h4>${plant.emoji} ${plant.name}</h4>
                <p>Aggiunta: ${plant.dateAdded || 'Data non disponibile'}</p>
                <button class="delete-btn" onclick="app.removePlant(${index})">Rimuovi</button>
            `;
            this.myPlantsList.appendChild(div);
        });
    }

    removePlant(index) {
        if (confirm('Sei sicuro di voler rimuovere questa pianta?')) {
            this.plants.splice(index, 1);
            this.savePlants();
            this.renderMyPlants();
            this.updateDashboard();
        }
    }

    updateDashboard() {
        if (this.totalPlantsEl) {
            this.totalPlantsEl.textContent = this.plants.length;
        }
        
        if (this.activeActivitiesEl) {
            this.activeActivitiesEl.textContent = '3'; // Mock data
        }
        
        if (this.todayActivitiesEl) {
            if (this.plants.length === 0) {
                this.todayActivitiesEl.innerHTML = '<p>Nessuna attività programmata</p>';
            } else {
                this.todayActivitiesEl.innerHTML = `
                    <div class="activity-item">💧 Innaffia ${this.plants[0]?.name || 'piante'}</div>
                    <div class="activity-item">✂️ Pota rose</div>
                `;
            }
        }
    }

    resetAllData() {
        localStorage.removeItem('fabgarden_plants');
        localStorage.removeItem('fabgarden_custom_plants');
        localStorage.removeItem('fabgarden_settings');
        
        this.plants = [];
        this.customPlants = [];
        this.settings = {};
        
        this.renderCatalog();
        this.renderMyPlants();
        this.updateDashboard();
        
        alert('Tutti i dati sono stati cancellati!');
    }

    savePlants() {
        localStorage.setItem('fabgarden_plants', JSON.stringify(this.plants));
    }

    saveCustomPlants() {
        localStorage.setItem('fabgarden_custom_plants', JSON.stringify(this.customPlants));
    }

    saveSettings() {
        localStorage.setItem('fabgarden_settings', JSON.stringify(this.settings));
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FABGarden();
});
