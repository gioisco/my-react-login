# Funzioni, arrow function, closure e callback

## Domanda

> c'è differenza fra le 2 funzioni handleButtonClick e handleButtonClick2 ? La differenza di sintassi di dichiarazione ha degli effetti fattuali diversi ?

## Risposta

Le tue due forme sono:

```jsx
const handleButtonClick = () => {
    window.location.href = "https://www.google.com";
};
```

e:

```jsx
function handleButtonClick2() {
    window.location.href = "https://www.google.com";
}
```

Per queste funzioni concrete, il comportamento è identico. La scelta diventa importante solo in alcuni casi specifici.

## 1. Differenza principale: come vengono create

Questa è una function declaration:

```js
function saluta() {
    return "ciao";
}
```

Questa è una arrow function assegnata a una costante:

```js
const saluta = () => {
    return "ciao";
};
```

La seconda non è una “funzione speciale” dal punto di vista dell’utilizzo: `saluta()` funziona ugualmente. Cambiano alcune proprietà della funzione e il momento in cui il nome diventa disponibile.

## 2. Uso prima della dichiarazione

La function declaration viene resa disponibile prima dell’esecuzione del codice:

```js
saluta();

function saluta() {
    console.log("ciao");
}
```

Funziona.

Con `const` invece:

```js
saluta();

const saluta = () => {
    console.log("ciao");
};
```

ottieni un errore, perché `saluta` non è ancora inizializzata.

Questa è una delle ragioni per cui alcuni preferiscono le function declaration: permettono di organizzare il codice usando una funzione prima della sua definizione.

## 3. `this`: la differenza più importante

Le funzioni normali ricevono `this` in base a come vengono chiamate:

```js
const persona = {
    nome: "Mario",

    saluta: function () {
        return this.nome;
    }
};

persona.saluta(); // "Mario"
```

Le arrow function invece non creano un proprio `this`: usano quello del contesto esterno.

```js
const persona = {
    nome: "Mario",

    saluta: () => {
        return this.nome;
    }
};

persona.saluta(); // normalmente undefined
```

Per questo le arrow function non sono adatte quando vuoi usare il `this` dell’oggetto.

In React con un function component, normalmente `this` non ti serve, quindi questa differenza spesso non ha effetto.

## 4. `arguments`

Una funzione normale ha il proprio oggetto `arguments`:

```js
function somma() {
    console.log(arguments);
}

somma(1, 2, 3);
```

Una arrow function non ha un proprio `arguments`:

```js
const somma = () => {
    console.log(arguments);
};
```

Per ricevere un numero variabile di parametri con una arrow function si usano i rest parameters:

```js
const somma = (...numeri) => {
    console.log(numeri);
};
```

## 5. Uso con `new`

Una function declaration può essere usata come costruttore:

```js
function Persona(nome) {
    this.nome = nome;
}

const persona = new Persona("Mario");
```

Una arrow function no:

```js
const Persona = (nome) => {
    this.nome = nome;
};

const persona = new Persona("Mario"); // errore
```

Oggi per creare oggetti si usano spesso `class` o altri approcci, quindi questo caso è meno frequente.

## 6. Callback e valori catturati

Le arrow function sono molto comode per le callback:

```jsx
<Button
    handleClick={() => handleButtonClick("parametro")}
/>
```

La funzione freccia crea una closure: conserva il valore di `"parametro"` e lo usa al click.

Lo stesso risultato si può ottenere con una funzione normale:

```jsx
<Button
    handleClick={function () {
        handleButtonClick("parametro");
    }}
/>
```

La arrow è solo più compatta.

## 7. Nel tuo caso React

Queste due funzioni:

```jsx
const handleButtonClick = () => {
    window.location.href = "https://www.google.com";
};
```

```jsx
function handleButtonClick2() {
    window.location.href = "https://www.google.com";
}
```

usate così:

```jsx
onClick={handleButtonClick}
```

oppure:

```jsx
onClick={handleButtonClick2}
```

si comportano nello stesso modo. Entrambe ricevono eventualmente l’evento da React, ma non lo usano perché non hanno dichiarato il parametro.

Una regola pratica:

- usa `function nome() {}` per funzioni normali, autonome e nominate;
- usa `const nome = () => {}` per callback, funzioni brevi e funzioni che devono catturare valori dal contesto;
- se ti serve il `this` dinamico, `arguments` o `new`, usa una funzione normale;
- in React, per gli event handler, entrambe le forme sono valide.

Il punto fondamentale resta:

```jsx
onClick={miaFunzione}
```

passa la funzione da eseguire dopo;

```jsx
onClick={miaFunzione()}
```

esegue subito la funzione durante il render.

---

## Domanda

> che significa che La funzione freccia crea una closure? Che cos'è una closure? Scrivere   const persona = {
>       nome: "Mario", function saluta() {
>           return this.nome;
>       }
> }; è la stessa cosa di const persona = {
>       nome: "Mario", saluta: function () {
>           return this.nome;
>       }
> }; ?

## Risposta

Una closure è una funzione insieme alle variabili del contesto in cui è stata creata.

Esempio:

```js
function creaSaluto(nome) {
    return function () {
        return `Ciao ${nome}`;
    };
}

const salutaMario = creaSaluto("Mario");

salutaMario(); // "Ciao Mario"
```

La funzione `creaSaluto` ha già terminato l’esecuzione, ma la funzione restituita continua a ricordare il valore `"Mario"`. Questo “ricordare” è la closure.

Nel tuo caso:

```js
function handleSubmit(p) {
    return function (e) {
        console.log(p);
        console.log(e);
    };
}
```

La funzione interna:

- riceve `e` quando viene chiamata al click;
- ricorda `p` grazie alla closure.

Quindi:

```js
const callback = handleSubmit("parametrooooo");
```

`callback` ricorda `"parametrooooo"`. Al click React farà concettualmente:

```js
callback(evento);
```

### I due modi nell’oggetto

Questa forma, scritta correttamente:

```js
const persona = {
    nome: "Mario",

    saluta() {
        return this.nome;
    }
};
```

e questa:

```js
const persona = {
    nome: "Mario",

    saluta: function () {
        return this.nome;
    }
};
```

nel tuo caso fanno la stessa cosa:

```js
persona.saluta(); // "Mario"
```

La prima è la sintassi abbreviata per definire un metodo dell’oggetto.

Questa invece sarebbe sbagliata:

```js
const persona = {
    nome: "Mario",

    function saluta() {
        return this.nome;
    }
};
```

Dentro un oggetto non si scrive `function saluta()`. Si scrive o:

```js
saluta() {}
```

oppure:

```js
saluta: function () {}
```

Attenzione: questa non è equivalente:

```js
const persona = {
    nome: "Mario",

    saluta: () => this.nome
};
```

Una arrow function non riceve il `this` dell’oggetto. Per i metodi che usano `this`, usa una funzione normale o la sintassi abbreviata del metodo.

---

## Domanda

> ok, sto iniziando a capire, ma insistiamo sul concetto. Cosa è una callback? Riusciresti a spiegarmelo in maniera esaustiva? Forse da questo nasce lo smarrimento per capire come funziona onClick

## Risposta

Sì: gran parte dello smarrimento con `onClick` nasce proprio dal concetto di callback.

### Cos’è una callback

Una callback è semplicemente una funzione che passi a qualcun altro perché venga chiamata in seguito.

Non è un tipo speciale di funzione. La stessa funzione può essere:

- chiamata normalmente;
- passata come callback;
- restituita da un’altra funzione.

Esempio:

```js
function saluta() {
    console.log("Ciao");
}
```

Qui la funzione viene chiamata subito:

```js
saluta();
```

Qui invece viene passata come callback:

```js
eseguiQualcosa(saluta);
```

La differenza fondamentale è questa:

```js
saluta    // riferimento alla funzione
saluta()  // chiamata immediata della funzione
```

### Chi chiama la callback?

Quando passi una funzione come callback, non sei tu a chiamarla direttamente. La chiamerà il codice che l’ha ricevuta.

```js
function eseguiDueVolte(callback) {
    callback();
    callback();
}

function saluta() {
    console.log("Ciao");
}

eseguiDueVolte(saluta);
```

Il flusso è:

```text
tu passi saluta
        ↓
eseguiDueVolte riceve saluta
        ↓
eseguiDueVolte decide quando chiamarla
        ↓
saluta viene chiamata due volte
```

`eseguiDueVolte` è il chiamante. `saluta` è la callback.

La callback non sa necessariamente quando verrà chiamata. Dipende dal codice che la riceve.

### Una callback non è necessariamente asincrona

Questo è importante: una callback non significa automaticamente “funzione eseguita più tardi”.

Questa usa una callback in modo immediato:

```js
const numeri = [1, 2, 3];

const doppi = numeri.map(function (numero) {
    return numero * 2;
});
```

`map` chiama la funzione subito, durante l’esecuzione di `map`.

Questa invece usa una callback in modo asincrono:

```js
setTimeout(function () {
    console.log("Eseguita dopo un secondo");
}, 1000);
```

La funzione viene chiamata dopo un secondo.

Quindi callback significa soltanto:

> “Questa funzione viene passata a qualcun altro, che la chiamerà.”

Il momento può essere immediato, successivo, al click, dopo una risposta HTTP, eccetera.

### Cosa succede con `onClick`

Quando scrivi:

```jsx
<button onClick={miaFunzione}>
```

stai passando `miaFunzione` come callback al sistema degli eventi.

Non la stai chiamando tu.

React registra concettualmente:

```js
"Quando avviene un click, chiama miaFunzione"
```

Quando l’utente clicca, React fa concettualmente:

```js
miaFunzione(eventoDelClick);
```

Per questo una funzione come questa riceve l’evento:

```js
function miaFunzione(e) {
    console.log(e);
}
```

L’evento non lo passi tu nel JSX. Lo passa React quando chiama la callback.

### Perché `onClick={miaFunzione()}` è diverso

Questa forma:

```jsx
<button onClick={miaFunzione()}>
```

non passa la funzione. La chiama subito durante il render.

Il risultato della chiamata viene poi assegnato a `onClick`.

È simile a:

```js
const risultato = miaFunzione();

button.onClick = risultato;
```

Il confronto è:

```jsx
onClick={miaFunzione}
```

```text
passa la funzione; verrà chiamata al click
```

```jsx
onClick={miaFunzione()}
```

```text
chiama subito la funzione; passa il risultato
```

### Perché si usano le funzioni wrapper

Supponiamo che tu voglia passare un parametro fisso:

```js
function apriPagina(url) {
    window.location.href = url;
}
```

Non puoi scrivere:

```jsx
<button onClick={apriPagina("https://google.com")}>
```

perché chiameresti `apriPagina` durante il render.

Usi quindi una wrapper:

```jsx
<button
    onClick={() => apriPagina("https://google.com")}
>
```

Qui la callback è la funzione freccia:

```js
() => apriPagina("https://google.com")
```

Al click React la chiama:

```js
wrapper(evento);
```

La wrapper, quando viene eseguita, chiama:

```js
apriPagina("https://google.com");
```

L’evento viene ricevuto dalla wrapper, ma non utilizzato.

Se vuoi inoltrarlo:

```jsx
<button
    onClick={(e) => miaFunzione(e, "parametro")}
>
```

Il flusso diventa:

```text
React chiama la wrapper con l'evento
        ↓
la wrapper riceve e
        ↓
la wrapper chiama miaFunzione(e, "parametro")
```

### Perché `() => miaFunzione()` non passa l’evento

Considera:

```jsx
onClick={() => miaFunzione()}
```

React chiama la wrapper con l’evento:

```js
wrapper(evento);
```

Ma la wrapper è definita così:

```js
() => miaFunzione()
```

Non ha un parametro `e` e chiama `miaFunzione` senza argomenti.

Quindi internamente succede:

```js
miaFunzione();
```

Se la funzione è:

```js
function miaFunzione(e) {
    console.log(e);
}
```

`e` vale `undefined`.

Per passarlo devi scrivere:

```jsx
onClick={(e) => miaFunzione(e)}
```

Oppure, se non ti serve aggiungere o modificare parametri:

```jsx
onClick={miaFunzione}
```

### Il tuo componente `Button`

Il tuo componente fa da intermediario:

```jsx
function Button({ handleClick }) {
    return (
        <button
            type="button"
            onClick={handleClick}
        >
            Ciao
        </button>
    );
}
```

Quando scrivi:

```jsx
<Button handleClick={miaFunzione} />
```

succede questo:

```text
Login passa miaFunzione alla prop handleClick
        ↓
Button riceve miaFunzione
        ↓
Button la assegna alla prop onClick del button HTML
        ↓
React chiama miaFunzione al click
```

Ci sono quindi due nomi diversi per lo stesso riferimento:

```jsx
handleClick
```

è la prop del tuo componente `Button`.

```jsx
onClick
```

è la prop/event handler del vero elemento `<button>`.

### Il tuo caso curried

La tua funzione:

```js
function handleSubmit(p) {
    return function (e) {
        fetch(myLoginURL, {
            method: "POST",
            body: JSON.stringify(data)
        });
    };
}
```

Quando scrivi:

```jsx
<Button
    handleClick={handleSubmit("parametrooooo")}
/>
```

durante il render accade:

```js
const callback = handleSubmit("parametrooooo");
```

La funzione esterna restituisce:

```js
function (e) {
    // fetch
}
```

Questa funzione restituita viene passata a `handleClick`.

Al click:

```text
React chiama la funzione restituita con l'evento
        ↓
function (e) riceve l'evento
        ↓
parte il fetch
```

Il parametro `"parametrooooo"` viene ricordato dalla closure. L’evento invece viene fornito da React al momento del click.

### La distinzione definitiva

Quando guardi un event handler, chiediti sempre:

#### Sto passando una funzione?

```jsx
onClick={miaFunzione}
```

Sì. Verrà chiamata in seguito.

#### Sto chiamando una funzione?

```jsx
onClick={miaFunzione()}
```

Sì. Viene chiamata subito e il risultato viene passato a `onClick`.

#### Sto creando una funzione wrapper?

```jsx
onClick={() => miaFunzione()}
```

Sì. La wrapper verrà chiamata al click e dentro chiamerà `miaFunzione`.

#### Chi passa l’evento?

Il sistema che gestisce l’evento, in questo caso React:

```js
callback(evento);
```

Il nome `e` non ha alcun potere speciale. È solo un parametro:

```js
function miaFunzione(e) {}
```

Riceverà un valore soltanto se chi chiama la funzione glielo passa.

La regola mentale più utile è:

> Una callback è una funzione consegnata a qualcun altro. Chi la riceve decide quando chiamarla e quali argomenti passarle.
