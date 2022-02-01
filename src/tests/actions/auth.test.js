import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas en auth-actions', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    afterAll(() => {
        db.terminate();
    });

    test('login y logout deben de crear la acción respectiva', () => {

        const uid = 'ABC123';
        const displayName = 'Fernando';

        const loginAction = login(uid, displayName);
        
        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });
        
        const logoutAction = logout();

        expect(logoutAction).toEqual({
            type: types.logout,
        });
    });

    test('debe de realizar el logout (startLogout)', async() => {

        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout,
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test('debe de hacer login con email y password (startLoginWithEmailPassword)', async() => {

        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        });

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'ioNc4YDgdGaD9hwb84LipRUXWIt1',
                displayName: null
            }
        });
        
        expect(actions[2]).toEqual({
            type: types.uiFinishLoading
        });

    });
});