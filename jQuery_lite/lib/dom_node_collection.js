class DOMNodeCollection {
  constructor(array){
    this.htmlElements = array;
  }

  html(str){
    // str = str || this.htmlElements[0];
    if(!str) return this.htmlElements[0];
    this.htmlElements.forEach( (el) => {
      el.innerHTML = str;
    });
  }

  empty() {
    this.htmlElements.forEach( (el) => {
      el.innerHTML = "";
    });
  }

  append(object) {
    if (object instanceof DOMNodeCollection){
        object.htmlElements.forEach((outer_el) => {
          this.htmlElements.forEach( (inner_el) => {
            inner_el.innerHTML += outer_el.outerHTML;
          });
        });
    } else if (object instanceof HTMLElement) {
        this.htmlElements.forEach( (el) => {
          el.innerHTML += object.outerHTML;
        });
    } else {
      this.htmlElements.forEach( (el) => {
        el.innerHTML += `${object}`;
      });
    }
  }

  attr(attribute, value){
    let attrs = [];
    this.htmlElements.forEach( (el) => {
      if (!value) {
        attrs.push(el.getAttribute(attribute));
        // attrs.push(attrs[attribute]); gets all attributes. not what we want
      } else {
        el.setAttribute(attribute, value);
        attrs.push(el.getAttribute(attribute));
        // attrs[attribute] = value;
      }
    });
    return attrs;
  }

  addClass(cl){
    this.htmlElements.forEach( (el) => {
      el.classList.add(cl);
    });
  }

  removeClass(cl){
    this.htmlElements.forEach( (el) => {
      el.classList.remove(cl);
    });
  }

  children(){
    return this.htmlElements.map(el => {
      return new DOMNodeCollection(Array.from(el.children));
    });
  }

  parent(){
    return this.htmlElements.map(el => {
      return new DOMNodeCollection(el.parentNode);
    });
  }

  find(selector){
    let res = [];
    this.htmlElements.forEach((el) => {
      res.push(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(res);
  }

  remove(){
    this.empty();
    this.htmlElements = [];
  }

  on(type, listener) {
    this.htmlElements.forEach( (el) => {
      el.addEventListener(type, listener);
    });
    this.attr("data-event", listener);
  }

  off(type) {
    const func = this.attr("data-event")[0];
    this.htmlElements.forEach( (el) => {
      el.removeEventListener(type, func);
    });
  }

}



module.exports = DOMNodeCollection;
