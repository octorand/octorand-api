import UnprocessableException from '#exceptions/unprocessable_exception';
import Account from '#models/account';
import GameSpellSeeker from '#models/game_spell_seeker';

export default class GameSpellSeekerHelper {

    /**
     * List of words
     */
    private words: Array<string> = [
        'ABSOLUTE', 'ABSTRACT', 'ACADEMIC', 'ACCEPTED', 'ACCIDENT', 'ACCURACY', 'ACCURATE', 'ACHIEVED', 'ACQUIRED', 'ACTIVITY', 'ACTUALLY', 'ADDITION', 'ADEQUATE', 'ADJACENT', 'ADJUSTED', 'ADVANCED', 'ADVISORY', 'ADVOCATE', 'AFFECTED', 'AIRCRAFT', 'ALLIANCE', 'ALTHOUGH', 'ALUMINUM', 'ANALYSIS', 'ANNOUNCE', 'ANYTHING', 'ANYWHERE', 'APPARENT', 'APPENDIX', 'APPROACH', 'APPROVAL', 'ARGUMENT', 'ARTISTIC', 'ASSEMBLY', 'ASSUMING', 'ATHLETIC', 'ATTACHED', 'ATTITUDE', 'ATTORNEY', 'AUDIENCE', 'AUTONOMY', 'AVIATION', 'BACHELOR', 'BACTERIA', 'BASEBALL', 'BATHROOM', 'BECOMING', 'BIRTHDAY', 'BOUNDARY', 'BREAKING', 'BREEDING', 'BUILDING', 'BULLETIN', 'BUSINESS', 'CALENDAR', 'CAMPAIGN', 'CAPACITY', 'CASHMERE', 'CASUALTY', 'CATCHING', 'CATEGORY', 'CATHOLIC', 'CAUTIOUS', 'CELLULAR', 'CEREMONY', 'CHAIRMAN', 'CHAMPION', 'CHEMICAL', 'CHILDREN', 'CIRCULAR', 'CIVILIAN', 'CLEARING', 'CLINICAL', 'CLOTHING', 'COLLAPSE', 'COLONIAL', 'COLORFUL', 'COMMENCE', 'COMMERCE', 'COMPLAIN', 'COMPLETE', 'COMPOSED', 'COMPOUND', 'COMPRISE', 'COMPUTER', 'CONCLUDE', 'CONCRETE', 'CONFLICT', 'CONFUSED', 'CONGRESS', 'CONSIDER', 'CONSTANT', 'CONSUMER', 'CONTINUE', 'CONTRACT', 'CONTRARY', 'CONTRAST', 'CONVINCE', 'CORRIDOR', 'COVERAGE', 'COVERING', 'CREATION', 'CREATIVE', 'CRIMINAL', 'CRITICAL', 'CROSSING', 'CULTURAL', 'CURRENCY', 'CUSTOMER', 'DATABASE', 'DAUGHTER', 'DAYLIGHT', 'DEADLINE', 'DECIDING', 'DECISION', 'DECREASE', 'DEFERRED', 'DEFINITE', 'DELICATE', 'DELIVERY', 'DESCRIBE', 'DESIGNER', 'DETAILED', 'DIABETES', 'DIALOGUE', 'DIAMETER', 'DIRECTLY', 'DIRECTOR', 'DISABLED', 'DISASTER', 'DISCLOSE', 'DISCOUNT', 'DISCOVER', 'DISORDER', 'DISPOSAL', 'DISTANCE', 'DISTINCT', 'DISTRICT', 'DIVIDEND', 'DIVISION', 'DOCTRINE', 'DOCUMENT', 'DOMESTIC', 'DOMINANT', 'DOMINATE', 'DOUBTFUL', 'DRAMATIC', 'DRESSING', 'DROPPING', 'DURATION', 'DYNAMICS', 'EARNINGS', 'ECONOMIC', 'EDUCATED', 'EFFICACY', 'EIGHTEEN', 'ELECTION', 'ELECTRIC', 'ELIGIBLE', 'EMERGING', 'EMPHASIS', 'EMPLOYEE', 'ENDEAVOR', 'ENGAGING', 'ENGINEER', 'ENORMOUS', 'ENTIRELY', 'ENTRANCE', 'ENVELOPE', 'EQUALITY', 'EQUATION', 'ESTIMATE', 'EVALUATE', 'EVENTUAL', 'EVERYDAY', 'EVERYONE', 'EVIDENCE', 'EXCHANGE', 'EXCITING', 'EXERCISE', 'EXPLICIT', 'EXPOSURE', 'EXTENDED', 'EXTERNAL', 'FACILITY', 'FAMILIAR', 'FEATURED', 'FEEDBACK', 'FESTIVAL', 'FINISHED', 'FIREWALL', 'FLAGSHIP', 'FLEXIBLE', 'FLOATING', 'FOOTBALL', 'FOOTHILL', 'FORECAST', 'FOREMOST', 'FORMERLY', 'FOURTEEN', 'FRACTION', 'FRACTURE', 'FREQUENT', 'FRIENDLY', 'FRONTIER', 'FUNCTION', 'GENERATE', 'GENEROUS', 'GENOMICS', 'GOODWILL', 'GOVERNOR', 'GRADUATE', 'GRAPHICS', 'GRATEFUL', 'GUARDIAN', 'GUIDANCE', 'HANDLING', 'HARDWARE', 'HERITAGE', 'HIGHLAND', 'HISTORIC', 'HOMELESS', 'HOMEPAGE', 'HOSPITAL', 'HUMANITY', 'IDENTIFY', 'IDENTITY', 'IDEOLOGY', 'IMPERIAL', 'INCIDENT', 'INCLUDED', 'INCREASE', 'INDICATE', 'INDIRECT', 'INDUSTRY', 'INFORMAL', 'INFORMED', 'INHERENT', 'INITIATE', 'INNOCENT', 'INSPIRED', 'INSTANCE', 'INTEGRAL', 'INTENDED', 'INTERACT', 'INTEREST', 'INTERIOR', 'INTERNAL', 'INTERVAL', 'INTIMATE', 'INTRANET', 'INVASION', 'INVOLVED', 'ISOLATED', 'JUDGMENT', 'JUDICIAL', 'JUNCTION', 'KEYBOARD', 'LANDLORD', 'LANGUAGE', 'LAUGHTER', 'LEARNING', 'LEVERAGE', 'LIFETIME', 'LIGHTING', 'LIKEWISE', 'LIMITING', 'LITERARY', 'LOCATION', 'MAGAZINE', 'MAGNETIC', 'MAINTAIN', 'MAJORITY', 'MARGINAL', 'MARRIAGE', 'MATERIAL', 'MATURITY', 'MAXIMIZE', 'MEANTIME', 'MEASURED', 'MEDICINE', 'MEDIEVAL', 'MEMORIAL', 'MERCHANT', 'MIDNIGHT', 'MILITARY', 'MINIMIZE', 'MINISTER', 'MINISTRY', 'MINORITY', 'MOBILITY', 'MODELING', 'MODERATE', 'MOMENTUM', 'MONETARY', 'MOREOVER', 'MORTGAGE', 'MOUNTAIN', 'MOUNTING', 'MOVEMENT', 'MULTIPLE', 'NATIONAL', 'NEGATIVE', 'NINETEEN', 'NORTHERN', 'NOTEBOOK', 'NUMEROUS', 'OBSERVER', 'OCCASION', 'OFFERING', 'OFFICIAL', 'OFFSHORE', 'OPERATOR', 'OPPONENT', 'OPPOSITE', 'OPTIMISM', 'OPTIONAL', 'ORDINARY', 'ORGANIZE', 'ORIGINAL', 'OVERCOME', 'OVERHEAD', 'OVERSEAS', 'OVERVIEW', 'PAINTING', 'PARALLEL', 'PARENTAL', 'PATENTED', 'PATIENCE', 'PEACEFUL', 'PERIODIC', 'PERSONAL', 'PERSUADE', 'PETITION', 'PHYSICAL', 'PIPELINE', 'PLATFORM', 'PLEASANT', 'PLEASURE', 'POLITICS', 'PORTABLE', 'PORTRAIT', 'POSITION', 'POSITIVE', 'POSSIBLE', 'POWERFUL', 'PRACTICE', 'PRECIOUS', 'PREGNANT', 'PRESENCE', 'PRESERVE', 'PRESSING', 'PRESSURE', 'PREVIOUS', 'PRINCESS', 'PRINTING', 'PRIORITY', 'PROBABLE', 'PROBABLY', 'PRODUCER', 'PROFOUND', 'PROGRESS', 'PROPERTY', 'PROPOSAL', 'PROSPECT', 'PROTOCOL', 'PROVIDED', 'PROVIDER', 'PROVINCE', 'PUBLICLY', 'PURCHASE', 'PURSUANT', 'QUANTITY', 'QUESTION', 'RATIONAL', 'REACTION', 'RECEIVED', 'RECEIVER', 'RECOVERY', 'REGIONAL', 'REGISTER', 'RELATION', 'RELATIVE', 'RELEVANT', 'RELIABLE', 'RELIANCE', 'RELIGION', 'REMEMBER', 'RENOWNED', 'REPEATED', 'REPORTER', 'REPUBLIC', 'REQUIRED', 'RESEARCH', 'RESERVED', 'RESIDENT', 'RESIGNED', 'RESOURCE', 'RESPONSE', 'RESTRICT', 'REVISION', 'RIGOROUS', 'ROMANTIC', 'SAMPLING', 'SCENARIO', 'SCHEDULE', 'SCRUTINY', 'SEASONAL', 'SECONDLY', 'SECURITY', 'SENSIBLE', 'SENTENCE', 'SEPARATE', 'SEQUENCE', 'SERGEANT', 'SHIPPING', 'SHORTAGE', 'SHOULDER', 'SIMPLIFY', 'SITUATED', 'SLIGHTLY', 'SOFTWARE', 'SOLUTION', 'SOMEBODY', 'SOMEWHAT', 'SOUTHERN', 'SPEAKING', 'SPECIFIC', 'SPECTRUM', 'SPORTING', 'STANDARD', 'STANDING', 'STANDOUT', 'STERLING', 'STRAIGHT', 'STRATEGY', 'STRENGTH', 'STRIKING', 'STRUGGLE', 'STUNNING', 'SUBURBAN', 'SUITABLE', 'SUPERIOR', 'SUPPOSED', 'SURGICAL', 'SURPRISE', 'SURVIVAL', 'SWEEPING', 'SWIMMING', 'SYMBOLIC', 'SYMPATHY', 'SYNDROME', 'TACTICAL', 'TAILORED', 'TAKEOVER', 'TANGIBLE', 'TAXATION', 'TAXPAYER', 'TEACHING', 'TENDENCY', 'TERMINAL', 'TERRIBLE', 'THINKING', 'THIRTEEN', 'THOROUGH', 'THOUSAND', 'TOGETHER', 'TOMORROW', 'TOUCHING', 'TRACKING', 'TRAGICAL', 'TRAINING', 'TRANSFER', 'TREASURY', 'TRIANGLE', 'TROPICAL', 'TURNOVER', 'ULTIMATE', 'UMBRELLA', 'UNIVERSE', 'UNLAWFUL', 'UNLIKELY', 'VALUABLE', 'VARIABLE', 'VERTICAL', 'VICTORIA', 'VIOLENCE', 'VOLATILE', 'WARRANTY', 'WEAKNESS', 'WEIGHTED', 'WHATEVER', 'WHENEVER', 'WHEREVER', 'WILDLIFE', 'WIRELESS', 'WITHDRAW', 'WOODLAND', 'WORKSHOP', 'YOURSELF',
    ];

    /**
     * Letters in alphabet
     */
    private alphabet: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',];

    /**
     * Load game status
     * 
     * @param account
     * @returns
     */
    async loadGameStatus(account: Account): Promise<any> {
        // Find game
        let game = await GameSpellSeeker.query().where('account_id', account.id).where('ended', false).first();

        // Create game
        if (!game) {
            game = new GameSpellSeeker();
            game.account_id = account.id;
            game.word = this.selectRandomWord(this.words);
            game.reveal = '--------';
            game.allowed = this.alphabet.join('');
            game.started = false;
            game.ended = false;
            game.tries = 0;
            await game.save();
        }

        return game.serialize({
            fields: {
                pick: ['id', 'account_id', 'reveal', 'allowed', 'started', 'ended', 'tries'],
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
        let game = await GameSpellSeeker.query().where('account_id', account.id).where('ended', false).first();

        // Verify game
        if (!game) {
            throw new UnprocessableException('Invalid game');
        }

        switch (action) {
            case 'check':
                await this.processGameActionCheck(game, data);
                break;
            case 'end':
                await this.processGameActionEnd(game, account);
                break;
            case 'boost':
                await this.processGameActionBoost(game, account, data);
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
    private async processGameActionCheck(game: GameSpellSeeker, data: any) {
        // Validate game status
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }

        // Validate game ending
        if (game.word == game.reveal) {
            throw new UnprocessableException('Game already completed');
        }

        // Validate letter input
        const letter = data.letter;
        if (!game.allowed.split('').includes(letter)) {
            throw new UnprocessableException('Invalid letter');
        }

        // Reveal letter
        let reveal = game.reveal;
        for (let i = 0; i < game.word.split('').length; i++) {
            if (game.word.charAt(i) == letter) {
                let word = reveal.split('');
                word[i] = letter;
                reveal = word.join('');
            }
        }

        // Update game status
        game.reveal = reveal;
        game.allowed = game.allowed.replace(letter, '');
        game.started = true;
        game.tries = game.tries + 1;
        await game.save();
    }

    /**
     * Process end action
     * 
     * @param game
     * @param data
     */
    private async processGameActionEnd(game: GameSpellSeeker, account: Account) {
        // Validate game status
        if (!game.started) {
            throw new UnprocessableException('Game not started');
        }

        // Validate game status
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }

        // Validate game ending
        if (game.word != game.reveal) {
            throw new UnprocessableException('Game not completed');
        }

        // calculate rewards
        let rewards = 25 - game.tries;

        // Update account
        account.stars = account.stars + rewards;
        account.total = account.total + rewards;
        account.hearts = account.hearts - 1;
        await account.save();

        // Update game status
        game.ended = true;
        await game.save();
    }

    /**
     * Process boost action
     * 
     * @param game
     * @param account
     * @param data
     */
    private async processGameActionBoost(game: GameSpellSeeker, account: Account, data: any) {
        // Validate game status
        if (game.ended) {
            throw new UnprocessableException('Game already ended');
        }

        // Validate game ending
        if (game.word == game.reveal) {
            throw new UnprocessableException('Game already completed');
        }

        // Define list of boosts
        let boosts = [
            { name: 'reveal-10', cost: 5 },
        ];

        // Validate boost
        let boost = boosts.find(b => b.name == data.boost);
        if (!boost) {
            throw new UnprocessableException('Invalid boost');
        }

        // Validate stars
        if (account.stars < boost.cost) {
            throw new UnprocessableException('Not enough stars');
        }

        // Apply boost
        switch (boost.name) {
            case 'reveal-10':
                // Update allowed list
                let must_have = game.word.split('');
                let removable = this.removeCharsFromString(game.allowed, must_have);
                removable = this.shuffleString(removable);
                let must_remove = removable.split('').slice(0, 10);
                game.allowed = this.removeCharsFromString(game.allowed, must_remove);
                break;
        }

        // Update account
        account.stars = account.stars - boost.cost;
        await account.save();

        // Update game status
        game.started = true;
        await game.save();
    }

    /**
     * Select random word
     * 
     * @param list
     * @returns
     */
    private selectRandomWord(list: Array<string>): string {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        return list[0];
    }

    /**
     * Shuffle a string 
     *
     * @param original 
     * @returns
     */
    private shuffleString(original: string): string {
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

    /**
     * Remove chars from a string
     * 
     * @param original 
     * @param remove 
     * @returns 
     */
    private removeCharsFromString(original: string, remove: Array<string>): string {
        for (let i = 0; i < remove.length; i++) {
            original = original.replace(remove[i], '');
        }

        return original;
    }
}
