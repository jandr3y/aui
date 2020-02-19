((Aui) => {

    const template = Aui.html`
        <style>
            :host {
              font-family: 'Roboto', sans-serif;
            }
            :host > div {
              border: 1px solid black;
              border-left: none;
              box-sizing: border-box;
              border-top: none;
              border-right: none;
              width: 100%;
              padding: 0px;
              padding-right:10px;
              overflow: hidden;
              display: flex;
              align-items: center;
            }
            :host > div > input {
                box-sizing: border-box;
                padding: 10px;
                border: none;
                width: 100%;
                outline: none;
            }
            :host #icon {
              margin-left: 10px;
            }

            :host #error {
              color: red;
            }
        </style>
        <div id="box">
            <i id="icon" class="fa"></i>
            <input id="input" />
        </div>
        <small id="error"></small>
    `;

    class AuiInput extends Aui {
        constructor(){
            super({
                template: template,
                import: ['fontAwesome', 'robotoFont']
            })
        }

        static get observedAttributes() {
            return [
              'placeholder',
              'visible',
              'icon',
              'icon-position',
              'error'
            ];
        }

        onChangeVisible(valor){
          const { input } = this.elements;

            if ( this.get('visible') === 'false' ) {
                input.type = 'password';
            }else{
                input.type = 'text';
            }
        }


        onLoad(){
            const { input, box, icon, error } = this.elements;

            input.on('focus', () => box.style.borderColor = Aui.theme.primaryColor);
            input.on('blur', () => box.style.borderColor = this.get('error') ? 'red' : 'black');
            input.placeholder = this.get('placeholder');

            input.type = this.get('visible') == 'false' ? 'password' : 'text';
            box.style.flexDirection = this.get('icon-position') === 'right' ? 'row-reverse' : 'row';

            if ( !this.get('icon') ) {
              icon.remove();
            }else{
              icon.classList.add('fa-' + this.get('icon'))
            }

            if ( this.get('error') ) {
              error.innerText = this.get('error');
              box.style.borderColor = 'red'
            }

        }
    }

    Aui.register('aui-input', AuiInput);

})(Aui);
