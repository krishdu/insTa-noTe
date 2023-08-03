import { v4 as uuid} from 'uuid';
import { hasIndexedDBAccess } from '../utils/browser-permissions.js';

/**
 * responsible for save note to storage
 * @returns `note` object
 */
export const saveNoteAsync = async (noteContent) => {
    const noteData = {};
    noteData.content = noteContent;
    noteData.noteId = uuid();
    noteData.timestamp = Date.now();
    if(hasIndexedDBAccess) {
       return await IndexedDBRepository.saveNoteAsync(noteData);
    }else{
        //handle for local storage saving
    }

}

export const getNotesAsync = async () => {
    if(hasIndexedDBAccess) {
        return await IndexedDBRepository.getNotesAsync();
    }else{
         //handle for local storage get
    }
}

class IndexedDBRepository {
    static dbName = 'notes-store';
    static dbVersion = 2;
    static objectStoreName = 'notes';
    
    static saveNoteAsync(noteData) {
        return new Promise((resolve, reject) => {
            try {
                this.createSchemaIndexOrGetConnection().then((db) => {
                    const transaction = db.transaction([this.objectStoreName], "readwrite");
                    const objectStore = transaction.objectStore(this.objectStoreName)
                    const request = objectStore.add(noteData); 
    
                    transaction.oncomplete = (event) => {
                        console.log("[ADD NOTE]: transaction success");
                    };

                    transaction.onerror = (event) => {
                        console.log('[ADD NOTE]: transaction error');
                        reject('Transaction error')
                    };

                    request.onsuccess = (event) => {
                        console.log("[ADD NOTE]: request success");
                        resolve(noteData);
                    }
                    
                    request.onerror = (event) => {
                        console.log('[ADD NOTE]: request error');
                        reject('Request error')
                    };
                })
                .catch(err => {
                    reject('Something went wrong');
                });

            } catch (error) {
                console.log(error);
                reject('Something went wrong');
            }
        });
    }

    static getNotesAsync() {
        return new Promise((resolve, reject) => {
            try {
                this.createSchemaIndexOrGetConnection().then((db) => {
                    const transaction = db.transaction([this.objectStoreName], "readonly");
                    const objectStore = transaction.objectStore(this.objectStoreName);
                    const request = objectStore.getAll();
                    
                    transaction.oncomplete = (event) => {
                        console.log("[ADD NOTE]: transaction success");
                    };

                    transaction.onerror = (event) => {
                        console.log('[ADD NOTE]: transaction error');
                        reject('Transaction error')
                    };
                    
                    request.onsuccess = (event) => {
                        console.log("[GET NOTES]: request success");
                        resolve(event?.target?.result || []);
                    };
                    
                    request.onerror = (event) => {
                        console.log('[GET NOTES]: request error');
                        reject('Request error')
                    };
                    
                })
                .catch(err => {
                    reject('Something went wrong');
                });
            } catch (err) {
                reject('something went wrong');
            }
        });
    }

    static createSchemaIndexOrGetConnection() {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.dbName, this.dbVersion);
            request.onerror = (event) => {
                reject(event);
            };

            /** Event for Index Db successfully opened  */
            request.onsuccess = (event) => {
                const db = event.target.result;
                resolve(db);
            }

            /** If there is any need to change schema, means after change db version this handler will be called */
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const objectStore = db.createObjectStore(this.objectStoreName, { keyPath: "noteId" });
                objectStore.createIndex("content", "content", { unique: false });
                objectStore.createIndex("timestamp", "timestamp", { unique: false });
                objectStore.transaction.oncomplete = (event) => {
                    resolve(db);
                };
            };
           
        }); 
    }

}
