import { notesReducer } from "../../reducers/notesReducer"
import { types } from "../../types/types"

describe('Pruebas en notesReducer', () => {

    const initialState = {
        notes: [],
        active: null
    };

    const note = {
        id: '1',
        title: 'Title',
        body: 'Body',
        date: '12345'
    };

    test('debe de mostrar la nota activa', () => {

        const action = {
            type: types.notesActive,
            payload: note
        };

        const state = notesReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            active: note
        });
    });

    test('debe de agregar una nota nueva', () => {

        const action = {
            type: types.notesAddNew,
            payload: note
        };

        const state = notesReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            notes: [note, ...initialState.notes]
        });
    });

    test('debe de cargar las notas', () => {

        const notes = [note, {...note, id: '2'}];

        const action = {
            type: types.notesLoad,
            payload: notes
        };

        const state = notesReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            notes: [...notes]
        });
    });

    test('debe de actualizar las notas', () => {

        const newState = {
            ...initialState,
            notes : [note, {...note, id: '2'}]
        }

        const action = {
            type: types.notesUpdated,
            payload: {
                id: '2',
                note
            }
        };

        const state = notesReducer(newState, action);

        expect(state).toEqual({
            ...newState,
            notes: newState.notes.map(actualNote => {
                return actualNote.id === '2' 
                    ? note
                    : actualNote
            })
        });
    });

    test('debe de eliminar una nota', () => {

        const newState = {
            ...initialState,
            notes : [note, {...note, id: '2'}]
        }

        const action = {
            type: types.notesDelete,
            payload: '2'
        };

        const state = notesReducer(newState, action);

        expect(state).toEqual({
            ...newState,
            active: null,
            notes: newState.notes.filter(note => note.id !== '2')
        });
    });

    test('debe de borrar las notas al hacer logout', () => {

        const newState = {
            ...initialState,
            notes : [note, {...note, id: '2'}]
        }

        const action = {
            type: types.notesLogoutCleaning,
        };

        const state = notesReducer(newState, action);

        expect(state).toEqual({
            ...newState,
            active: null,
            notes: []
        });
    });

    test('no debe de hacer cambios en el state', () => {

        const action = {
            type: 'notValidAction',
        };

        const state = notesReducer(initialState, action);

        expect(state).toEqual(initialState);
    });
});