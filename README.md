# README

## Descrizione Web App

Ho diviso la web app in due sezioni:

-   **dashbord**: sezione cui accede solo un utente loggato, in cui è possibile creare e gestire le risorse e i legami tra queste.
-   **ecommerce**: sezione "guest" in cui qualsiasi visitatore può sfogliare il catalogo dell'ecommerce.

Nota: ho ipotizzato che l'ecommerce sia una sorta di catalogo pubblico di prodotti, e quindi gli unici utenti loggati siano admin del sistema che lo mantengono aggiornato.

## Struttura DB

-   **products**: tabella contenente tutti i prodotti
-   **categories**: tabella contenente tutte le categorie
-   **attributes**: tabella contenente tutti gli attributi di una categoria. La relazione tra categories e attributes è del tipo uno a molti.
-   **attribute_values**: tabella contenente tutti i valori di un attributo. La relazione tra attributes e attribute_values è del tipo uno a molti.
-   **category_product**: tabella pivot che gestisce il legame tra le categorie e i prodotti. (molti a molti)
-   **attribute_value_product**: tabella pivot che gestisce il legame tra le i valori di un attributo e i prodotti. (molti a molti)

La relazione tra prodotti e categorie è del tipo molti a molti in quanto ho pensato di mantenere il più generale possibile la relazione tra le due risorse.

Ho deciso di implementare il legame tra categorie e prodotti anche se si sarebbe potuto calcolarlo passando per attribute_values in quanto ho pensato che un prodotto potrebbe appartenere ad una categoria ma non "implementare" nessuno dei valori degli attributi della/e categorie cui appartiene.

## Funzione filtro stile "Amazon"

Ho usato Meilisearch, che permette di indicizzare le informazioni di una o più tabelle di un database e poi effettuare in modo efficiente operazioni di ricerca, filtro e ordinamento.

Nello specifico ho creato in Meilisearch un solo indice, "products" che contiene per ogni prodotto le colonne:

-   id, name, price appartenenti alla tabella products
-   categories e attributeValues come array di id delle categorie e dei valori di attributi associati ad un prodotto

Creando questo indice, nella pagina pubblica di una specifica categoria ho implementato la sidebar contenente i filtri, una full text search e anche l'ordinamento per price.

Per integrare Meilisearch ho usato il pacchetto Scout di Laravel. Per mantenere aggiornato l'indice, ogni volta che un prodotto viene aggiornato, o ogni volta che viene aggiornato un legame tra questo e attribute_values, un observer viene triggerato e il relativo indice del prodotto viene sincronizzato in Meilisearch.

## Come testare la webapp

Per sviluppare la webapp ho usato il pacchetto Sail di Laravel, una cli che permette di interagire in modo molto semplice con l'ambiente di sviluppo in docker.

Rimando alla [documentazione di Laravel](https://laravel.com/docs/11.x/sail) per approfondimenti. Assumendo che docker sia installato nel sistema.

Per installare tutte le dipendenze della webapp e fare migration, seed e primo setup indice meilisearch, lanciare lo script:

`bash start_up.sh`

a questo punto sarà possibile visitare la pagina `http://localhost` per accedere alla webapp.
Per accedere alla dashbord le credenziali sono:

-   username: `admin@example.com`
-   password: `password`

Per stoppare:

`bash stop.sh`

## TODO:

-   **pagina filtro stile "Amazon"**: rendere più usabile il componente filtro (es: ordinare per hit desc, tenere solo i primi 10, ...)
-   **datatable && meilisearch datatable**: debounce del campo di ricerca "rapidsearch" per evitare di spammare di richieste il server
-   **dashboard forms**: aggiungere "disable / loading"
-   **meilisearch datatable**: estrarre backend e frontend in modo da renderlo usabile e parametrizzabile in altre sezioni della webapp (ad esempio nel caso servano altri tipi di indice)
