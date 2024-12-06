import { inject } from '@adonisjs/core';
import UnprocessableException from '#exceptions/unprocessable_exception';
import DiscordHelper from '#helpers/discord_helper';
import IdentityHelper from '#helpers/identity_helper';
import Account from '#models/account';
import GameAlphaRoller from '#models/game_alpha_roller';

@inject()
export default class AlphaRoller {

    /**
     * Letters in alphabet
     */
    private alphabet: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',];

    /**
     * Initialise helper
     * 
     * @param discordHelper 
     * @param identityHelper
     */
    constructor(
        private discordHelper: DiscordHelper,
        private identityHelper: IdentityHelper
    ) { }

    /**
     * Load game status
     * 
     * @param account
     * @returns
     */
    async loadGameStatus(account: Account): Promise<any> {
        // Find game
        let game = await GameAlphaRoller.query().where('account_id', account.id).where('ended', false).first();

        // Create game
        if (!game) {
            game = new GameAlphaRoller();
            game.account_id = account.id;
            game.word = this.selectRandomWord(this.alphabet, 16);
            game.pattern = this.selectWordPattern(this.alphabet, game.word);
            game.reveal = game.word.charAt(0);
            game.inputs = '';
            game.results = '';
            game.rounds = 8;
            game.hits = 0;
            game.started = false;
            game.ended = false;
            game.boost_1 = false;
            game.boost_2 = false;
            await game.save();
        }

        return game.serialize({
            fields: {
                pick: ['id', 'account_id', 'reveal', 'inputs', 'results', 'rounds', 'hits', 'started', 'ended', 'boost_1', 'boost_2'],
            },
        });
    }

    /**
     * Process game action
     * 
     * @param account
     * @param action
     * @param data
     * @returns
     */
    async processGameAction(account: Account, action: string, data: any): Promise<any> {
        // Find game
        let game = await GameAlphaRoller.query().where('account_id', account.id).where('ended', false).first();

        // Verify game
        if (!game) {
            throw new UnprocessableException('Invalid game');
        }

        switch (action) {
            case 'check':
                await this.processGameActionCheck(game, data);
                break;
            case 'boost':
                await this.processGameActionBoost(game, data);
                break;
            case 'end':
                await this.processGameActionEnd(game, account);
                break;
        }

        return await this.loadGameStatus(account);
    }

    /**
     * Process check action
     * 
     * @param game
     * @param account
     * @param data
     */
    private async processGameActionCheck(game: GameAlphaRoller, data: any) {
        // Validate game status
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }

        // Validate game ending
        if (game.rounds == game.inputs.length) {
            throw new UnprocessableException('Game already completed');
        }

        // Validate direction input
        const direction = Number(data.direction);
        if (direction < 0 || direction > 1) {
            throw new UnprocessableException('Invalid direction');
        }

        // Update game status
        let round = game.inputs.length;
        let winner = Number(game.pattern.charAt(round));
        if (winner == direction) {
            game.results = game.results + '1';
            game.hits = game.hits + 1;
        } else {
            game.results = game.results + '0';
        }

        game.reveal = game.word.substring(0, round + 1);
        game.inputs = game.inputs + direction;
        game.started = true;
        await game.save();
    }

    /**
     * Process boost action
     * 
     * @param game
     * @param account
     * @param data
     */
    private async processGameActionBoost(game: GameAlphaRoller, data: any) {
        // Validate game status
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }

        // Validate game ending
        if (game.rounds == game.inputs.length) {
            throw new UnprocessableException('Game already completed');
        }

        // Validate boost
        let boost = data.boost;
        if (boost < 1 || boost > 2) {
            throw new UnprocessableException('Invalid boost');
        }

        // Apply boost
        switch (boost) {
            case 1:
                if (game.boost_1) {
                    throw new UnprocessableException('Boost already applied');
                }

                // Add two rounds
                game.rounds = game.rounds + 2;
                game.boost_1 = true;

                break;
            case 2:
                if (game.boost_2) {
                    throw new UnprocessableException('Boost already applied');
                }

                // Add five rounds
                game.rounds = game.rounds + 5;
                game.boost_2 = true;

                break;
        }

        // Update game status
        game.started = true;
        await game.save();
    }

    /**
     * Process end action
     * 
     * @param game
     * @param data
     */
    private async processGameActionEnd(game: GameAlphaRoller, account: Account) {
        // Validate game status
        if (!game.started) {
            throw new UnprocessableException('Game not started');
        }

        // Validate game status
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }

        // Validate game ending
        if (game.rounds != game.inputs.length) {
            throw new UnprocessableException('Game not completed');
        }

        // calculate rewards
        let rewards = game.hits * 10;
        if (game.boost_1) {
            rewards = rewards - 15;
        }
        if (game.boost_2) {
            rewards = rewards - 25;
        }
        rewards = Math.max(rewards, 0);

        // Update account
        account.hearts = account.hearts - 1;
        account.stars = account.stars + rewards;
        account.total = account.total + rewards;
        await account.save();

        // Update game status
        game.ended = true;
        await game.save();

        // Send event to discord
        let name = await this.identityHelper.findName(account.address);
        this.discordHelper.send(name + ' earned ' + rewards + ' stars by playing Alpha Roller :tada:');
    }

    /**
     * Select random word
     * 
     * @param list
     * @returns
     */
    private selectRandomWord(list: Array<string>, length: number): string {
        let word = '';
        let previous = '';

        for (let i = 0; i < length; i++) {
            let entries = list.filter(l => l != previous);
            previous = this.selectRandomEntry(entries);
            word = word + previous;
        }

        return word;
    }

    /**
     * Select random entry
     * 
     * @param list
     * @returns
     */
    private selectRandomEntry(list: Array<string>): string {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        return list[0];
    }

    /**
     * Select word letter pattern
     * 
     * @param list
     * @param word
     * @returns
     */
    private selectWordPattern(list: Array<string>, word: string): string {
        let pattern = '';

        for (let i = 1; i < word.length; i++) {
            let previous = list.indexOf(word.charAt(i - 1));
            let current = list.indexOf(word.charAt(i));

            if (previous < current) {
                pattern = pattern + '1';
            } else {
                pattern = pattern + '0';
            }
        }

        return pattern;
    }
}
