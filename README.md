# Aplikacja

## Przygotowanie aplikacji po stronie serwera

W celu pobrania pakietu należy skorzystać z menadżera pakietów npm

W katalogu głównym:

```bash
npm install
```

## Uruchomienie bazy danych:

W tym celu należy pobrać neo4j z oficjalnej strony. Następnie, znajdując się w folderze bin, można ją uruchomić przy pomocy komendy:

```bash
.\neo4j.bat console
```

## Tworzenie bazy danych:

```bash
node createDatabase.js testDatabase.xlsx <Nazwa budynku>
```

## Stwórz plik .env zawierający:

```bash
SERVER_PORT=
DB_USER=neo4j
DB_PASS=mynewpass
DB_URL='neo4j://localhost'
ARUBA_LOGIN={ "userName":"user","password": "password" }

```

## Uruchomienie serwera:

```bash
npm start
```
