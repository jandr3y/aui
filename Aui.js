
class Aui extends HTMLElement {

  constructor(config){
    super();
    this.template = this.createTemplate(config.template);
    this.props    = config.props;
    this.debug    = config.debug || false;
    this.theme    = config.theme;
    this.import   = config.import;
  }

  attributeChangedCallback(name, oldVal, newVal){
      if ( this.debug ) console.warn('######>> Attribute Changed - ' + name);
      const functionName = 'onChange' + name.charAt(0).toUpperCase() + name.slice(1);
      const context = this;

      if( typeof context[functionName] === 'function' && this.elements ) {
          context[functionName](newVal);
      }else if(this.debug){
        console.warn('You must implement the attribute change function (' + functionName +') ');
      }

      this[name] = newVal;
  }

  on(type, callback){
    this.addEventListener(type, (e) => callback(e))
  }

  set(name, value) {
    if ( this.debug ) console.warn('starting safeSetAttribute');
    if (this.getAttribute(name) !== value) this.setAttribute(name, value);
  }

  get(name){
    return this.getAttribute(name);
  }

  createTemplate(template){
      const templateElement = document.createElement('template');

      templateElement.innerHTML = template;
      return templateElement;
  }

  getElements(){
    let elements = {};
    let htmlElements = [];

    if ( typeof this.shadowRoot !== 'undefined' ) {
      htmlElements = this.shadowRoot.querySelectorAll('[id]');
    }

    Array.from(htmlElements).map( element => {
      element.on = (type, cb) => {
        element.addEventListener(type, cb);
      }

      elements[element.id] = element;
    });

    return elements;
  }


  initAttributes(){
    // TODO: Call all atributes events after load
  }

  connectedCallback() {
    if ( this.debug ) console.warn('Starting connectedCallback...');
    this.render(this, this.template);
    this.elements = this.getElements();

    if( typeof this.onLoad === 'function' ) {
      this.onLoad();
    }

    this.initAttributes();
  }

  static $(query){
    let elements = document.querySelectorAll(query);
    return elements.length > 1 ? elements : elements[0];
  }

  static register(tag, className){
    if( typeof window.customElements.get(tag) === 'undefined' ){
      window.customElements.define(tag, className);
    }
  }

  static html(template){
    return template;
  }

  render(){
    if ( this.debug ) console.warn('Starting render...');
    this.attachShadow({ mode: 'open' });

    if ( typeof this.import !== 'undefined' ){
      this.import.map( alias => {
          this.template.content.insertBefore(document.head.querySelector('[as="' + alias + '"]').cloneNode(true), this.template.childNodes[0])
      })
    }

    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

  }

}
