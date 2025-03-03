

class Leaderboard {
    constructor() {
        this.leaderboardElement = document.getElementById('leaderboard');
        this.initEventListeners();
        this.renderLeaderboard();
    }

    initEventListeners() {
        document.getElementById('resetLeaderboard').addEventListener('click', () => this.resetLeaderboard());
    }

    renderLeaderboard() {
        this.leaderboardElement.innerHTML = '';

        const leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];

        leaderboardData.sort((a, b) => b.score - a.score);

        leaderboardData.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${entry.player}</td>
                <td>${entry.score}</td>
            `;
            this.leaderboardElement.appendChild(row);
        });
    }

    resetLeaderboard() {
        localStorage.removeItem('leaderboardData');
        this.renderLeaderboard();
    }
}

// leaderboard init
document.addEventListener('DOMContentLoaded', () => {
    new Leaderboard();
});