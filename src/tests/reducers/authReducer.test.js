import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    test('debe de realizar el login', () => {

        const initialState = {};

        const action = {
            type: types.login,
            payload: {
                uid: '123',
                displayName: 'Fernando'
            }
        };

        const state = authReducer(initialState, action);
        
        expect(state).toEqual({
            uid: '123',
            name: 'Fernando',
        });
    });

    test('debe de realizar el logout', () => {

        const initialState = {
            uid: '123',
            name: 'Fernando'
        };

        const action = {
            type: types.logout
        };

        const state = authReducer(initialState, action);

        expect(state).toEqual({});
    });

    test('no debe de hacer cambios en el state', () => {

        const initialState = {
            uid: '123',
            name: 'Fernando'
        };

        const action = {
            type: 'notValidAction'
        };

        const state = authReducer(initialState, action);

        expect(state).toEqual(initialState);
    });
});