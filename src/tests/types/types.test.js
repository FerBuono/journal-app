import { types } from "../../types/types";

describe('Prueba con nuestros tipios', () => {

    test('debe de tener estos tipos', () => {

        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',

            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
            
            notesAddNew: '[Notes] New Note',
            notesActive: '[Notes] Set Active Note',
            notesLoad: '[Notes] Load Notes',
            notesUpdated: '[Notes] Note Updated',
            notesFileUrl: '[Notes] Update Image URL',
            notesDelete: '[Notes] Delete Note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        });
    });
});