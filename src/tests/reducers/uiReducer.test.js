import { uiReducer } from "../../reducers/uiReducer"
import { types } from "../../types/types"

describe('Pruebas en uiReducer', () => {

    const initialState = {
        loading: false,
        msgError: null
    };
    
    test('debe de mostrar un cartel de error', () => {

        const msgError = 'Error';

        const action = {
            type: types.uiSetError,
            payload: msgError
        };

        const state = uiReducer(initialState, action);

        expect(state).toEqual({
            loading: false,
            msgError
        });
    });
    
    test('debe de remover el cartel de error', () => {

        const newState = {
            ...initialState,
             msgError: 'Error'
        };

        const action = {
            type: types.uiRemoveError,
        };

        const state = uiReducer(newState, action);

        expect(state).toEqual({
            loading: false,
            msgError: null
        });
    });
    
    test('debe de estar cargando (deshabilita el boton login)', () => {

        const action = {
            type: types.uiStartLoading,
        };

        const state = uiReducer(initialState, action);

        expect(state).toEqual({
            loading: true,
            msgError: null
        });
    });
    
    test('debe de finalizar el cargado', () => {

        const action = {
            type: types.uiFinishLoading,
        };

        const state = uiReducer(initialState, action);

        expect(state).toEqual({
            loading: false,
            msgError: null
        });
    });

    test('no debe de hacer cambios en el state', () => {

        const action = {
            type: 'notValidAction'
        };

        const state = uiReducer(initialState, action);

        expect(state).toEqual(initialState);
    });
});