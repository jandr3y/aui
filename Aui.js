class Aui extends HTMLElement {

  constructor(config){
    super();
    this.template = config.template;
    this.props    = config.props;
    this.debug    = config.debug || false;
    this.theme    = config.theme;
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

  set(name, value) {
    if ( this.debug ) console.warn('starting safeSetAttribute');
    if (this.getAttribute(name) !== value) this.setAttribute(name, value);
  }

  get(name){
    return this.getAttribute(name);
  }

  static createTemplate(template){
      const templateElement = document.createElement('template');
      templateElement.innerHTML = template;
      return templateElement;
  }

  getElements(){
    let elements = {};
    let htmlElements = [];

    if ( typeof this.shadowRoot !== 'undefined' ) {
      htmlElements = this.shadowRoot.querySelectorAll('.aui');
    }

    Array.from(htmlElements).map( element => {
      element.on = (type, cb) => {
        element.addEventListener(type, cb);
      }

      elements[element.id] = element;
    });

    return elements;
  }

  connectedCallback() {
    if ( this.debug ) console.warn('Starting connectedCallback...');
    this.render(this, this.template);
    this.elements = this.getElements();

    if( typeof this.onLoad === 'function' ) {
      this.onLoad();
    }

    console.log(this.props)
  }

  static $(query){
    let elements = document.querySelectorAll(query);
    return elements.length > 1 ? elements : elements[0];
  }

  render(){
    if ( this.debug ) console.warn('Starting render...');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

  }

}
