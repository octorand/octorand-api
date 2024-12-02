import { inject } from '@adonisjs/core';
import { Words } from './words.js';
import Account from '#models/account';

@inject()
export default class GameSpellSeeker {

    /**
     * Load game status
     * 
     * @param account
     * @returns
     */
    async loadGameStatus(account: Account): Promise<any> {
        console.log(Words.list[0]);

        return {};
    }

    /**
     * Load game status
     * 
     * @param account
     * @param action
     * @param data
     * @returns
     */
    async processGameAction(account: Account, action: string, data: any): Promise<any> {
        console.log(Words.list[0]);

        return {};
    }
}
