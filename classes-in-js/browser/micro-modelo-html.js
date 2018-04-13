/*
   Modelo de una página HTML de más alto nivel que el DOM que viene con Javascript.
   A partir de este modelo se puede obtener el DOM correspondiente, pidiéndole el 
      createDomElement() 
   a un HtmlElement. 
 */


/*
  Objeto genérico que representa un elemento Html.
  Aunque HtmlElement no es abstracta (se puede crear una instancia indicando el tag)
  la idea es crear subclases para los distintos tags.
 */
class HtmlElement {
    constructor(tagName, parent = null) {
        this._tagName = tagName
        this._children = []
        this._classNames = []
        this._styles = new Map()
        if (parent) {
            parent.addChild(this)
            this._parent = parent
        }
    }

    // agrega una clase CSS a este elemento
    addClass(className) { this._classNames.push(className); return this }

    // setea un valor del atributo style de este elemento
    setStyle(styleName, styleValue) { this._styles.set(styleName, styleValue); return this }

    /* Crea el objeto DOM correspondiente a este elemento, incluyendo
       los hijos que tuviera agregados
     */
    createDomElement() {
        const elem = this.createBasicDomElement()
        this.addClassesToElement(elem)
        this.addChildrenToElement(elem)
        this.setStylesToElement(elem)
        return elem
    }

    // privado - las acciones que componen createDomElement()
    createBasicDomElement() { return document.createElement(this._tagName) }
    addClassesToElement(domElement) {
        this._classNames.forEach(className => domElement.classList.add(className))
    }
    addChildrenToElement(domElement) {
        this._children.forEach(childElementModel => domElement.appendChild(childElementModel.createDomElement()))
    }
    setStylesToElement(domElement) {
        this._styles.forEach((value, key) => domElement.style[key] = value)
    }

    // privado - alcanza con pasar el parent al crear el child
    addChild(element) { this._children.push(element); return this }
}

/*
  Un HtmlElement cuyo innerHTML es un dato simple, p.ej. un String
 */
class HtmlElementWithDatum extends HtmlElement {
    constructor(tag, parent, datum) {
        super(tag, parent)
        this._datum = datum
    }

    createBasicDomElement() {
        const domElem = super.createBasicDomElement()
        domElem.innerHTML = this._datum
        return domElem
    }
}

/* 
   Un <div> simple
 */
class DivElement extends HtmlElement {
    constructor(parent = null) { super("div", parent) }
}

/* 
   Un <div> que representa una fila de Bootstrap.
   O sea, un <div class="row">
 */
class DivRow extends DivElement {
    constructor(parent = null) {
        super(parent)
        this.addClass("row")
    }
}

/* 
   Un <div> que representa una cantidad de columnas dentro de una fila de Bootstrap.
   O sea, un <div class="col-md-X">
   El segundo parámetro del constructor es el valor de "X"
 */
class DivColumn extends DivElement {
    constructor(parent, columnCount) {
        super(parent)
        this.addClass("col-md-" + columnCount)
    }
}

/* 
   Un <p> simple
 */
class Paragraph extends HtmlElement {
    constructor(parent = null) { super("p", parent) }
}

/* 
   Un <span> cuyo innerHTML es un valor simple. 
   Este valor se pasa como segundo parámetro del constructor.
 */
class SpanWithDatum extends HtmlElementWithDatum {
    constructor(parent, datum) { super("span", parent, datum) }
}

/* 
   Una tabla HTML
 */
class TableHtmlElement extends HtmlElement {
    constructor(parent) { super("table", parent) }
}

/* 
   Una fila dentro de una tabla HTML (o sea, un <tr>).
 */
class TableRow extends HtmlElement {
    constructor(parent) { super("tr", parent) }
}

/* 
   Una celda de una tabla HTML. O sea, un <td> que está pensado para estar dentro de una fila.
 */
class TableCellWithDatum extends HtmlElementWithDatum {
    constructor(parent, datum) { super("td", parent, datum) }
}
        
/* 
   Un link interno (o sea href="#") cuyo innerHTML es un dato simple.
   En el constructor se pasan: parent, valor del innerHTML, función del onClick.
   La función del onClick lleva un parámetro que es el evento.
 */
class SimpleInnerLink extends HtmlElementWithDatum {
    constructor(parent, datum, onClickFunction) { 
        super("a", parent, datum) 
        this._onClickFunction = onClickFunction
    }

    createBasicDomElement() {
        const linkElem = super.createBasicDomElement()
        linkElem.href = "#"
        linkElem.onclick = this._onClickFunction
        return linkElem
    }
}


