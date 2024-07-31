import chalk from 'chalk';
import settings from '../../settings.js';

class Logger {
    constructor(enabled) {
        this.enabled = settings.enableLogger;
        this.messageLog = [];
        this.resetPattern = ['assistant', 'system', 'assistant', 'system'];
        this.patternIndex = 0;
        this.currentLog = [];
    }

    logConsole(messages) {
        if (!this.enabled) return;

        // Initialize/reset state for each call
        this.currentLog = [];
        this.patternIndex = 0;

        for (let message of messages) {
            let role = message.role === 'role' ? 'user' : message.role;
            let logEntry = {
                role: role,
                content: message.content
            };

            this.currentLog.push(logEntry);

            if (role === this.resetPattern[this.patternIndex]) {
                this.patternIndex++;
                if (this.patternIndex === this.resetPattern.length) {
                    // Print the current log and reset
                    this.printLatestLog();
                    this.currentLog = [];
                    this.patternIndex = 0;
                }
            } else {
                this.patternIndex = (role === this.resetPattern[0]) ? 1 : 0;
            }
        }

        // Print any remaining logs if they don't complete a full pattern
        if (this.currentLog.length > 0) {
            this.printLatestLog();
        }
    }

    printLatestLog() {
        if (this.currentLog.length > 0) {
            console.log(chalk.cyan(JSON.stringify(this.currentLog, null, 2)));
            console.log(chalk.yellow('\n--- New Log ---\n'));
        }
    }
}

export default Logger;