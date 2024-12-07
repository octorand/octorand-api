var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from '@adonisjs/core';
import UnprocessableException from '#exceptions/unprocessable_exception';
import DiscordHelper from '#helpers/discord_helper';
import IdentityHelper from '#helpers/identity_helper';
import GameAlphaRoller from '#models/game_alpha_roller';
let AlphaRoller = class AlphaRoller {
    discordHelper;
    identityHelper;
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',];
    constructor(discordHelper, identityHelper) {
        this.discordHelper = discordHelper;
        this.identityHelper = identityHelper;
    }
    async loadGameStatus(account) {
        let game = await GameAlphaRoller.query().where('account_id', account.id).where('ended', false).first();
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
    async processGameAction(account, action, data) {
        let game = await GameAlphaRoller.query().where('account_id', account.id).where('ended', false).first();
        if (!game) {
            throw new UnprocessableException('Invalid game');
        }
        if (account.hearts <= 0) {
            throw new UnprocessableException('Not enough hearts');
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
    async processGameActionCheck(game, data) {
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }
        if (game.rounds == game.inputs.length) {
            throw new UnprocessableException('Game already completed');
        }
        const direction = Number(data.direction);
        if (direction < 0 || direction > 1) {
            throw new UnprocessableException('Invalid direction');
        }
        let round = game.inputs.length;
        let winner = Number(game.pattern.charAt(round));
        if (winner == direction) {
            game.results = game.results + '1';
            game.hits = game.hits + 1;
        }
        else {
            game.results = game.results + '0';
        }
        game.reveal = game.word.substring(0, round + 2);
        game.inputs = game.inputs + direction;
        game.started = true;
        await game.save();
    }
    async processGameActionBoost(game, data) {
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }
        if (game.rounds == game.inputs.length) {
            throw new UnprocessableException('Game already completed');
        }
        let boost = data.boost;
        if (boost < 1 || boost > 2) {
            throw new UnprocessableException('Invalid boost');
        }
        switch (boost) {
            case 1:
                if (game.boost_1) {
                    throw new UnprocessableException('Boost already applied');
                }
                game.rounds = game.rounds + 2;
                game.boost_1 = true;
                break;
            case 2:
                if (game.boost_2) {
                    throw new UnprocessableException('Boost already applied');
                }
                game.rounds = game.rounds + 5;
                game.boost_2 = true;
                break;
        }
        game.started = true;
        await game.save();
    }
    async processGameActionEnd(game, account) {
        if (!game.started) {
            throw new UnprocessableException('Game not started');
        }
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }
        if (game.rounds != game.inputs.length) {
            throw new UnprocessableException('Game not completed');
        }
        let rewards = game.hits * 10;
        if (game.boost_1) {
            rewards = rewards - 15;
        }
        if (game.boost_2) {
            rewards = rewards - 25;
        }
        rewards = Math.max(rewards, 0);
        account.hearts = account.hearts - 1;
        account.stars = account.stars + rewards;
        account.total = account.total + rewards;
        await account.save();
        game.ended = true;
        await game.save();
        let name = await this.identityHelper.findName(account.address);
        this.discordHelper.send(name + ' earned ' + rewards + ' stars by playing Alpha Roller :tada:');
    }
    selectRandomWord(list, length) {
        let word = '';
        let previous = '';
        for (let i = 0; i < length; i++) {
            let entries = list.filter(l => l != previous);
            previous = this.selectRandomEntry(entries);
            word = word + previous;
        }
        return word;
    }
    selectRandomEntry(list) {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list[0];
    }
    selectWordPattern(list, word) {
        let pattern = '';
        for (let i = 1; i < word.length; i++) {
            let previous = list.indexOf(word.charAt(i - 1));
            let current = list.indexOf(word.charAt(i));
            if (previous < current) {
                pattern = pattern + '1';
            }
            else {
                pattern = pattern + '0';
            }
        }
        return pattern;
    }
};
AlphaRoller = __decorate([
    inject(),
    __metadata("design:paramtypes", [DiscordHelper,
        IdentityHelper])
], AlphaRoller);
export default AlphaRoller;
//# sourceMappingURL=alpha_roller.js.map