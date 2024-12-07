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
import GameSpellSeeker from '#models/game_spell_seeker';
let SpellSeeker = class SpellSeeker {
    discordHelper;
    identityHelper;
    words = [
        'ABSOLUTE', 'ABSTRACT', 'ACADEMIC', 'ACCEPTED', 'ACCIDENT', 'ACCURACY', 'ACCURATE', 'ACHIEVED', 'ACQUIRED', 'ACTIVITY', 'ACTUALLY', 'ADDITION', 'ADEQUATE', 'ADJACENT', 'ADJUSTED', 'ADVANCED', 'ADVISORY', 'ADVOCATE', 'AFFECTED', 'AIRCRAFT', 'ALLIANCE', 'ALTHOUGH', 'ALUMINUM', 'ANALYSIS', 'ANNOUNCE', 'ANYTHING', 'ANYWHERE', 'APPARENT', 'APPENDIX', 'APPROACH', 'APPROVAL', 'ARGUMENT', 'ARTISTIC', 'ASSEMBLY', 'ASSUMING', 'ATHLETIC', 'ATTACHED', 'ATTITUDE', 'ATTORNEY', 'AUDIENCE', 'AUTONOMY', 'AVIATION', 'BACHELOR', 'BACTERIA', 'BASEBALL', 'BATHROOM', 'BECOMING', 'BIRTHDAY', 'BOUNDARY', 'BREAKING', 'BREEDING', 'BUILDING', 'BULLETIN', 'BUSINESS', 'CALENDAR', 'CAMPAIGN', 'CAPACITY', 'CASHMERE', 'CASUALTY', 'CATCHING', 'CATEGORY', 'CATHOLIC', 'CAUTIOUS', 'CELLULAR', 'CEREMONY', 'CHAIRMAN', 'CHAMPION', 'CHEMICAL', 'CHILDREN', 'CIRCULAR', 'CIVILIAN', 'CLEARING', 'CLINICAL', 'CLOTHING', 'COLLAPSE', 'COLONIAL', 'COLORFUL', 'COMMENCE', 'COMMERCE', 'COMPLAIN', 'COMPLETE', 'COMPOSED', 'COMPOUND', 'COMPRISE', 'COMPUTER', 'CONCLUDE', 'CONCRETE', 'CONFLICT', 'CONFUSED', 'CONGRESS', 'CONSIDER', 'CONSTANT', 'CONSUMER', 'CONTINUE', 'CONTRACT', 'CONTRARY', 'CONTRAST', 'CONVINCE', 'CORRIDOR', 'COVERAGE', 'COVERING', 'CREATION', 'CREATIVE', 'CRIMINAL', 'CRITICAL', 'CROSSING', 'CULTURAL', 'CURRENCY', 'CUSTOMER', 'DATABASE', 'DAUGHTER', 'DAYLIGHT', 'DEADLINE', 'DECIDING', 'DECISION', 'DECREASE', 'DEFERRED', 'DEFINITE', 'DELICATE', 'DELIVERY', 'DESCRIBE', 'DESIGNER', 'DETAILED', 'DIABETES', 'DIALOGUE', 'DIAMETER', 'DIRECTLY', 'DIRECTOR', 'DISABLED', 'DISASTER', 'DISCLOSE', 'DISCOUNT', 'DISCOVER', 'DISORDER', 'DISPOSAL', 'DISTANCE', 'DISTINCT', 'DISTRICT', 'DIVIDEND', 'DIVISION', 'DOCTRINE', 'DOCUMENT', 'DOMESTIC', 'DOMINANT', 'DOMINATE', 'DOUBTFUL', 'DRAMATIC', 'DRESSING', 'DROPPING', 'DURATION', 'DYNAMICS', 'EARNINGS', 'ECONOMIC', 'EDUCATED', 'EFFICACY', 'EIGHTEEN', 'ELECTION', 'ELECTRIC', 'ELIGIBLE', 'EMERGING', 'EMPHASIS', 'EMPLOYEE', 'ENDEAVOR', 'ENGAGING', 'ENGINEER', 'ENORMOUS', 'ENTIRELY', 'ENTRANCE', 'ENVELOPE', 'EQUALITY', 'EQUATION', 'ESTIMATE', 'EVALUATE', 'EVENTUAL', 'EVERYDAY', 'EVERYONE', 'EVIDENCE', 'EXCHANGE', 'EXCITING', 'EXERCISE', 'EXPLICIT', 'EXPOSURE', 'EXTENDED', 'EXTERNAL', 'FACILITY', 'FAMILIAR', 'FEATURED', 'FEEDBACK', 'FESTIVAL', 'FINISHED', 'FIREWALL', 'FLAGSHIP', 'FLEXIBLE', 'FLOATING', 'FOOTBALL', 'FOOTHILL', 'FORECAST', 'FOREMOST', 'FORMERLY', 'FOURTEEN', 'FRACTION', 'FRACTURE', 'FREQUENT', 'FRIENDLY', 'FRONTIER', 'FUNCTION', 'GENERATE', 'GENEROUS', 'GENOMICS', 'GOODWILL', 'GOVERNOR', 'GRADUATE', 'GRAPHICS', 'GRATEFUL', 'GUARDIAN', 'GUIDANCE', 'HANDLING', 'HARDWARE', 'HERITAGE', 'HIGHLAND', 'HISTORIC', 'HOMELESS', 'HOMEPAGE', 'HOSPITAL', 'HUMANITY', 'IDENTIFY', 'IDENTITY', 'IDEOLOGY', 'IMPERIAL', 'INCIDENT', 'INCLUDED', 'INCREASE', 'INDICATE', 'INDIRECT', 'INDUSTRY', 'INFORMAL', 'INFORMED', 'INHERENT', 'INITIATE', 'INNOCENT', 'INSPIRED', 'INSTANCE', 'INTEGRAL', 'INTENDED', 'INTERACT', 'INTEREST', 'INTERIOR', 'INTERNAL', 'INTERVAL', 'INTIMATE', 'INTRANET', 'INVASION', 'INVOLVED', 'ISOLATED', 'JUDGMENT', 'JUDICIAL', 'JUNCTION', 'KEYBOARD', 'LANDLORD', 'LANGUAGE', 'LAUGHTER', 'LEARNING', 'LEVERAGE', 'LIFETIME', 'LIGHTING', 'LIKEWISE', 'LIMITING', 'LITERARY', 'LOCATION', 'MAGAZINE', 'MAGNETIC', 'MAINTAIN', 'MAJORITY', 'MARGINAL', 'MARRIAGE', 'MATERIAL', 'MATURITY', 'MAXIMIZE', 'MEANTIME', 'MEASURED', 'MEDICINE', 'MEDIEVAL', 'MEMORIAL', 'MERCHANT', 'MIDNIGHT', 'MILITARY', 'MINIMIZE', 'MINISTER', 'MINISTRY', 'MINORITY', 'MOBILITY', 'MODELING', 'MODERATE', 'MOMENTUM', 'MONETARY', 'MOREOVER', 'MORTGAGE', 'MOUNTAIN', 'MOUNTING', 'MOVEMENT', 'MULTIPLE', 'NATIONAL', 'NEGATIVE', 'NINETEEN', 'NORTHERN', 'NOTEBOOK', 'NUMEROUS', 'OBSERVER', 'OCCASION', 'OFFERING', 'OFFICIAL', 'OFFSHORE', 'OPERATOR', 'OPPONENT', 'OPPOSITE', 'OPTIMISM', 'OPTIONAL', 'ORDINARY', 'ORGANIZE', 'ORIGINAL', 'OVERCOME', 'OVERHEAD', 'OVERSEAS', 'OVERVIEW', 'PAINTING', 'PARALLEL', 'PARENTAL', 'PATENTED', 'PATIENCE', 'PEACEFUL', 'PERIODIC', 'PERSONAL', 'PERSUADE', 'PETITION', 'PHYSICAL', 'PIPELINE', 'PLATFORM', 'PLEASANT', 'PLEASURE', 'POLITICS', 'PORTABLE', 'PORTRAIT', 'POSITION', 'POSITIVE', 'POSSIBLE', 'POWERFUL', 'PRACTICE', 'PRECIOUS', 'PREGNANT', 'PRESENCE', 'PRESERVE', 'PRESSING', 'PRESSURE', 'PREVIOUS', 'PRINCESS', 'PRINTING', 'PRIORITY', 'PROBABLE', 'PROBABLY', 'PRODUCER', 'PROFOUND', 'PROGRESS', 'PROPERTY', 'PROPOSAL', 'PROSPECT', 'PROTOCOL', 'PROVIDED', 'PROVIDER', 'PROVINCE', 'PUBLICLY', 'PURCHASE', 'PURSUANT', 'QUANTITY', 'QUESTION', 'RATIONAL', 'REACTION', 'RECEIVED', 'RECEIVER', 'RECOVERY', 'REGIONAL', 'REGISTER', 'RELATION', 'RELATIVE', 'RELEVANT', 'RELIABLE', 'RELIANCE', 'RELIGION', 'REMEMBER', 'RENOWNED', 'REPEATED', 'REPORTER', 'REPUBLIC', 'REQUIRED', 'RESEARCH', 'RESERVED', 'RESIDENT', 'RESIGNED', 'RESOURCE', 'RESPONSE', 'RESTRICT', 'REVISION', 'RIGOROUS', 'ROMANTIC', 'SAMPLING', 'SCENARIO', 'SCHEDULE', 'SCRUTINY', 'SEASONAL', 'SECONDLY', 'SECURITY', 'SENSIBLE', 'SENTENCE', 'SEPARATE', 'SEQUENCE', 'SERGEANT', 'SHIPPING', 'SHORTAGE', 'SHOULDER', 'SIMPLIFY', 'SITUATED', 'SLIGHTLY', 'SOFTWARE', 'SOLUTION', 'SOMEBODY', 'SOMEWHAT', 'SOUTHERN', 'SPEAKING', 'SPECIFIC', 'SPECTRUM', 'SPORTING', 'STANDARD', 'STANDING', 'STANDOUT', 'STERLING', 'STRAIGHT', 'STRATEGY', 'STRENGTH', 'STRIKING', 'STRUGGLE', 'STUNNING', 'SUBURBAN', 'SUITABLE', 'SUPERIOR', 'SUPPOSED', 'SURGICAL', 'SURPRISE', 'SURVIVAL', 'SWEEPING', 'SWIMMING', 'SYMBOLIC', 'SYMPATHY', 'SYNDROME', 'TACTICAL', 'TAILORED', 'TAKEOVER', 'TANGIBLE', 'TAXATION', 'TAXPAYER', 'TEACHING', 'TENDENCY', 'TERMINAL', 'TERRIBLE', 'THINKING', 'THIRTEEN', 'THOROUGH', 'THOUSAND', 'TOGETHER', 'TOMORROW', 'TOUCHING', 'TRACKING', 'TRAGICAL', 'TRAINING', 'TRANSFER', 'TREASURY', 'TRIANGLE', 'TROPICAL', 'TURNOVER', 'ULTIMATE', 'UMBRELLA', 'UNIVERSE', 'UNLAWFUL', 'UNLIKELY', 'VALUABLE', 'VARIABLE', 'VERTICAL', 'VICTORIA', 'VIOLENCE', 'VOLATILE', 'WARRANTY', 'WEAKNESS', 'WEIGHTED', 'WHATEVER', 'WHENEVER', 'WHEREVER', 'WILDLIFE', 'WIRELESS', 'WITHDRAW', 'WOODLAND', 'WORKSHOP', 'YOURSELF',
    ];
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',];
    constructor(discordHelper, identityHelper) {
        this.discordHelper = discordHelper;
        this.identityHelper = identityHelper;
    }
    async loadGameStatus(account) {
        let game = await GameSpellSeeker.query().where('account_id', account.id).where('ended', false).first();
        if (!game) {
            game = new GameSpellSeeker();
            game.account_id = account.id;
            game.word = this.selectRandomEntry(this.words);
            game.reveal = '--------';
            game.allowed = this.alphabet.join('');
            game.guesses = 0;
            game.started = false;
            game.ended = false;
            game.boost_1 = false;
            game.boost_2 = false;
            await game.save();
        }
        return game.serialize({
            fields: {
                pick: ['id', 'account_id', 'reveal', 'allowed', 'guesses', 'started', 'ended', 'boost_1', 'boost_2'],
            },
        });
    }
    async processGameAction(account, action, data) {
        let game = await GameSpellSeeker.query().where('account_id', account.id).where('ended', false).first();
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
    async processGameActionCheck(game, data) {
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }
        if (game.word == game.reveal) {
            throw new UnprocessableException('Game already completed');
        }
        const letter = data.letter;
        if (!game.allowed.split('').includes(letter)) {
            throw new UnprocessableException('Invalid letter');
        }
        game.reveal = this.revealWord(game.word, game.reveal, letter);
        game.allowed = game.allowed.replace(letter, '');
        game.guesses = game.guesses + 1;
        game.started = true;
        await game.save();
    }
    async processGameActionBoost(game, data) {
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }
        if (game.word == game.reveal) {
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
                let must_have = game.word.split('');
                let removable = this.removeCharsFromString(game.allowed, must_have);
                removable = this.shuffleString(removable);
                let must_remove = removable.split('').slice(0, 10);
                game.allowed = this.removeCharsFromString(game.allowed, must_remove);
                game.boost_1 = true;
                break;
            case 2:
                if (game.boost_2) {
                    throw new UnprocessableException('Boost already applied');
                }
                game.reveal = this.revealWord(game.word, game.reveal, game.word.charAt(0));
                game.reveal = this.revealWord(game.word, game.reveal, game.word.charAt(7));
                game.allowed = game.allowed.replace(game.word.charAt(0), '');
                game.allowed = game.allowed.replace(game.word.charAt(7), '');
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
        if (game.word != game.reveal) {
            throw new UnprocessableException('Game not completed');
        }
        let rewards = 100 - (3 * game.guesses);
        if (game.boost_1) {
            rewards = rewards - 15;
        }
        if (game.boost_2) {
            rewards = rewards - 15;
        }
        rewards = Math.max(rewards, 0);
        account.hearts = account.hearts - 1;
        account.stars = account.stars + rewards;
        account.total = account.total + rewards;
        await account.save();
        game.ended = true;
        await game.save();
        let name = await this.identityHelper.findName(account.address);
        this.discordHelper.send(name + ' earned ' + rewards + ' stars by playing Spell Seeker :tada:');
    }
    selectRandomEntry(list) {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list[0];
    }
    shuffleString(original) {
        let array = original.split('');
        let size = array.length;
        for (let i = size - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }
        return array.join('');
    }
    removeCharsFromString(original, remove) {
        for (let i = 0; i < remove.length; i++) {
            original = original.replace(remove[i], '');
        }
        return original;
    }
    revealWord(secret, reveal, letter) {
        for (let i = 0; i < secret.split('').length; i++) {
            if (secret.charAt(i) == letter) {
                let word = reveal.split('');
                word[i] = letter;
                reveal = word.join('');
            }
        }
        return reveal;
    }
};
SpellSeeker = __decorate([
    inject(),
    __metadata("design:paramtypes", [DiscordHelper,
        IdentityHelper])
], SpellSeeker);
export default SpellSeeker;
//# sourceMappingURL=spell_seeker.js.map