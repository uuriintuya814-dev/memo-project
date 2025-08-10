// currencyManager.js - Universal currency system for all games

const CurrencyManager = {
    // Default values
    DEFAULT_VALUES: {
        coin: 4892,
        diamond: 8219,
        point: 0
    },

    // Initialize or load currency data
    init: function() {
        let data = localStorage.getItem("currencyData");
        if (!data) {
            data = this.DEFAULT_VALUES;
            this.saveData(data);
        } else {
            data = JSON.parse(data);
        }
        return data;
    },

    // Save currency data
    saveData: function(data) {
        localStorage.setItem("currencyData", JSON.stringify(data));
    },

    // Update currency values
    update: function(coins = 0, diamonds = 0, points = 0) {
        const data = this.init();
        data.coin += coins;
        data.diamond += diamonds;
        data.point += points;
        this.saveData(data);
        this.updateDisplays();
        return data;
    },

    // Update all currency displays on the page
    updateDisplays: function() {
        const data = this.init();
        const coinElements = document.querySelectorAll('.currency:nth-child(1) span');
        const diamondElements = document.querySelectorAll('.currency:nth-child(2) span');
        const pointElements = document.querySelectorAll('.point');
        
        coinElements.forEach(el => el.textContent = data.coin.toLocaleString());
        diamondElements.forEach(el => el.textContent = data.diamond.toLocaleString());
        
        if (pointElements.length > 0) {
            pointElements.forEach(el => {
                el.textContent = `YOUR POINT IS ${data.point} / 10000`;
            });
        }
    },

    // Get current values
    getValues: function() {
        return this.init();
    }
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    CurrencyManager.init();
    CurrencyManager.updateDisplays();
});