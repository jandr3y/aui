((Aui) => {

  const template = Aui.createTemplate(`
    <style>
      :host button {
          background: #ececec;
          padding: 10px 20px;
          border: none;
      }

      :host .primary {
        background-color: #42a5f5;
        color: white;
      }

      :host .accent {
        background-color: #ffeb3b;
      }
    </style>
    <button id="button" class="aui">
      <slot></slot>
    </button>
  `);

  class AuiButton extends Aui {

    constructor() {
        super({
          template: template,
          debug: true
        });
    }

    static get observedAttributes() {
      return ['disabled', 'color'];
    }

    onChangeDisabled(value){
      this.elements.button.disabled = (value === 'true') ? true : false;
    }

    onChangeColor(value){
      const { button } = this.elements;
      button.classList.remove('primary', 'accent');
      button.classList.add(value);
    }

    onLoad(){
      const { button } = this.elements;

      button.classList.add(this.get('color'));
      
      button.disabled = this.getAttribute('disabled');

      button.on('click', () => alert("HAHA!"));
    }
  }

  const register = () => customElements.define('aui-button', AuiButton);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();
})(Aui);
