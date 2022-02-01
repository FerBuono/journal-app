/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote, addNewNote, deleteNote, noteLogout, refreshNote, setNotes, startDeleting, startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import * as fs from 'fs';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'UFzJO31xrBmMqjK73O9V',
            title: 'hola',
            body: 'mundo',
            date: 123
        }
    }
};

let store = mockStore(initState);

describe('Pruebas en note-actions', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    afterAll(() => {
        db.terminate();
    });

    test('debe de crear una nueva nota en la db (startNewNote)', async() => {

        await store.dispatch(startNewNote());

        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            }
        });

        // Eliminar la nueva nota creada
        const docId = actions[0].payload.id;
        await db.doc(`TESTING/journal/notes/${docId}`).delete();
    });

    test('debe de mostrar la nota activa (activeNote)', () => {

        const note = {
            id: '123',
            title: 'titulo',
            body: 'body',
        };

        const action = activeNote(note.id, note);

        expect(action).toEqual({
            type: types.notesActive,
            payload: note
        });
    });

    test('debe de crear una nueva nota (addNewNote)', () => {
        
        const note = {
            id: '123',
            title: 'titulo',
            body: 'body',
        };

        const action = addNewNote(note.id, note);

        expect(action).toEqual({
            type: types.notesAddNew,
            payload: note
        });
    });

    test('debe de cargar las notas de la db (startLoadingNotes)', async() => {

        await store.dispatch(startLoadingNotes('TESTING'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('debe de mostrar las notas cargadas (setNotes)', () => {

        const note = {
            id: '123',
            title: 'titulo',
            body: 'body',
        };

        const notes = [note, {...note, id: '1234'}];

        const action = setNotes(notes);

        expect(action).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });
    });

    test('debe de actualizar la nota en la db (startSaveNote)', async() => {

        const note = {
            id: 'UFzJO31xrBmMqjK73O9V' ,
            title: 'titulo',
            body: 'body',
        };

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesUpdated,
            payload: {
                id: note.id,
                note
            }
        });

        const docRef = await db.doc(`TESTING/journal/notes/${note.id}`).get();

        expect(docRef.data().title).toBe(note.title);
    });
    
    test('debe de actualizar la nota (refreshNote)', () => {

        const note = {
            id: '123' ,
            title: 'titulo',
            body: 'body',
        };

        const action = refreshNote(note.id, note);

        expect(action).toEqual({
            type: types.notesUpdated,
            payload: {
                id: note.id,
                note
            }
        });
    });

    test('debe de actualizar el url del entry en la db (startUploading)', async() => {

        fileUpload.mockReturnValue('https://hola-mundo.com');
        fs.writeFileSync('foto.jpg', '');

        const file = fs.readFileSync('foto.jpg');
        
        await store.dispatch(startUploading(file));

        const docRef = await db.doc('TESTING/journal/notes/UFzJO31xrBmMqjK73O9V').get();

        expect(docRef.data().url).toBe('https://hola-mundo.com')
    });

    test('debe de eliminar la nota de la db (startDeleting)', async() => {

        const note = initState.notes.active;

        await store.dispatch(startDeleting(note.id));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesDelete,
            payload: note.id
        });

        // Crear la nota eliminada
        await db.collection('TESTING/journal/notes').doc(note.id).set(note);
    });

    test('debe de eliminar la note (deleteNote)', () => {

        const note = {
            id: '123' ,
            title: 'titulo',
            body: 'body',
        };

        const action = deleteNote(note.id);

        expect(action).toEqual({
            type: types.notesDelete,
            payload: note.id
        });
    });

    test('debe de borrar las notas al hacer logout', () => {

        const action = noteLogout();

        expect(action).toEqual({
            type: types.notesLogoutCleaning
        });
    });
});