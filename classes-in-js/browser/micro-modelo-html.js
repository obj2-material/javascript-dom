class DomElementModel {
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
    createDomElement() { 
        const elem = this.createBasicDomElement()
        this.addClassesToElement(elem)
        this.addChildrenToElement(elem)
        this.setStylesToElement(elem)
        return elem
    }
    createBasicDomElement() { return document.createElement(this._tagName) }
    addChild(element) { this._children.push(element); return this }
    addClass(className) { this._classNames.push(className); return this }
    setStyle(styleName, styleValue) { this._styles.set(styleName, styleValue); return this }

    addClassesToElement(domElement) {
        this._classNames.forEach(className => domElement.classList.add(className))
    }

    addChildrenToElement(domElement) {
        this._children.forEach(childElementModel => domElement.appendChild(childElementModel.createDomElement()))
    }
    
    setStylesToElement(domElement) {
        this._styles.forEach((value, key) => domElement.style[key] = value)
    }
}

class DomElementModelWithDatum extends DomElementModel {
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

class DivElement extends DomElementModel {
    constructor(parent = null) { super("div", parent) }
}

class DivRow extends DivElement {
    constructor(parent = null) {
        super(parent)
        this.addClass("row")
    }
}

class DivColumn extends DivElement {
    constructor(parent, columnCount) {
        super(parent)
        this.addClass("col-md-" + columnCount)
    }
}

class SpanWithDatum extends DomElementModelWithDatum {
    constructor(parent, datum) { super("span", parent, datum) }
}

class TableDomElement extends DomElementModel {
    constructor(parent) { super("table", parent) }
}

class TableRow extends DomElementModel {
    constructor(parent) { super("tr", parent) }
}

class TableCellWithDatum extends DomElementModelWithDatum {
    constructor(parent, datum) { super("td", parent, datum) }
}
        

