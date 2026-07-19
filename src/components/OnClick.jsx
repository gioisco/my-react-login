import React, { useState, Suspense, lazy } from "react";

function OnClick() {

    function functionCurriedWiwhParam(param1, param2) {
        console.log("Param1[functionCurriedWiwhParam]:", param1)
        console.log("Param2[functionCurriedWiwhParam]:", param2)
        // restituisco una funzione da chiamare con l'evento
        // handleSubmit ricorda la closure del parametro ricevuto
        return function (e) {
            console.log("Evant[curried]:", e)
            console.log(`Dentro: ${param1}`)
            console.log("Faccio cose")
        }
    }

    const arrowFunction = (e) => {
        console.log("Event[arrowFunction]:", e)
    };

    function functionClassic(e, param1) {
        console.log("Event[functionClassic]:", e)
        console.log("Param1[functionClassic]:", param1)
    };

    return (
        <div>
            <h2>OnClick varianti</h2>
            <h4>functionCurriedWiwhParam</h4>
            <button type="button" onClick={functionCurriedWiwhParam("asd")}>Giusto</button>
            {/* Sbagliato passare la reference: esegue solo la funzione esterna passandogli l'evento*/}
            <button type="button" onClick={functionCurriedWiwhParam}>Sbagliato, referenza a funzione esterna</button>
            {/* Sbagliato passare la arrow function: esegue solo la funzione esterna passando solo il parametro*/}
            <button type="button" onClick={() => functionCurriedWiwhParam("b3")}>sbagliato, passa funzione anonima wrapper</button>
            <hr />
            <h4>arrowFunction</h4>
            <button type="button" onClick={arrowFunction("sbagliato")}>Già chiamata</button>
            <button type="button" onClick={arrowFunction}>Giusto, passo referenza, chiamata con evento da React</button>
            <button type="button" onClick={() => arrowFunction()}>Giusto, ignoro evento</button>
            <button type="button" onClick={(e) => arrowFunction(e, "ignorato")}>Giusto, con evento e primo parametro ignorato</button>
            <hr />
            <h4>functionClassic</h4>
            <button type="button" onClick={functionClassic}>Button7</button>
            <button type="button" onClick={() => functionClassic()}>Button8</button>
            <button type="button" onClick={(e) => functionClassic(e, "non ignorato")}>Giusto, con evento e primo parametro non ignorato</button>

        </div>
    )
}

export default OnClick
