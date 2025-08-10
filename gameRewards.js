// gameRewards.js - Handle rewards for all games

const GameRewards = {
    // Reward templates for different game types
    TEMPLATES: {
        word: { coin: 10, diamond: 2, point: 20 },
        math: { coin: 15, diamond: 3, point: 30 },
        puzzle: { coin: 20, diamond: 5, point: 50 }
    },

    // Award rewards based on game type and performance
    award: function(gameType, correctAnswers, totalQuestions) {
        const template = this.TEMPLATES[gameType] || this.TEMPLATES.word;
        const coins = template.coin * correctAnswers;
        const diamonds = template.diamond * correctAnswers;
        const points = template.point * correctAnswers;
        
        CurrencyManager.update(coins, diamonds, points);
        
        return {
            coins,
            diamonds,
            points,
            message: `You earned ${coins} coins, ${diamonds} diamonds, and ${points} points!`
        };
    },

    // Show reward notification
    showReward: function(reward) {
        swal({
            title: "Rewards Earned!",
            text: reward.message,
            icon: "success",
            buttons: {
                confirm: {
                    text: "Continue",
                    value: true,
                    visible: true,
                    className: "btn"
                }
            }
        });
    }
};