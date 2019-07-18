import {XtalTextInputMD} from 'xtal-text-input-md/xtal-text-input-md.js';
import { define } from "trans-render/define.js";
import { createTemplate } from "xtal-element/utils.js";
const mainTemplate = createTemplate(/* html */`
<div class="form-element form-textarea">
  <textarea id="text_area" class="form-element-field"></textarea>
  <div class="form-element-bar"></div>
  <label class="form-element-label" for="text_area"><slot name="label"></slot></label>
</div>
<style>
.form-element {
  position: relative;
  margin-top: 2.25rem;
  margin-bottom: 2.25rem; }

.form-element-hint {
  font-weight: 400;
  font-size: 0.6875rem;
  color: #a6a6a6;
  display: block; }

.form-element-bar {
  position: relative;
  height: 1px;
  background: #999;
  display: block; }

.form-element-bar::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #337ab7;
  height: 2px;
  display: block;
  transform: rotateY(90deg);
  transition: transform 0.28s ease;
  will-change: transform; }

.form-element-label {
  position: absolute;
  top: 0.75rem;
  line-height: 1.5rem;
  pointer-events: none;
  padding-left: 0.125rem;
  z-index: 1;
  font-size: 1rem;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  color: #a6a6a6;
  transform: translateY(-50%);
  transform-origin: left center;
  transition: transform 0.28s ease, color 0.28s linear, opacity 0.28s linear;
  will-change: transform, color, opacity; }

.form-element-field {
  outline: none;
  height: 1.5rem;
  display: block;
  background: none;
  padding: 0.125rem 0.125rem 0.0625rem;
  font-size: 1rem;
  border: 0 solid transparent;
  line-height: 1.5;
  width: 100%;
  color: #333;
  box-shadow: none;
  opacity: 0.001;
  transition: opacity 0.28s ease;
  will-change: opacity; }

.form-element-field:-ms-input-placeholder {
  color: #a6a6a6;
  transform: scale(0.9);
  transform-origin: left top; }

.form-element-field::placeholder {
  color: #a6a6a6;
  transform: scale(0.9);
  transform-origin: left top; }

.form-element-field:focus ~ .form-element-bar::after {
  transform: rotateY(0deg); }

.form-element-field:focus ~ .form-element-label {
  color: #337ab7; }

.form-element-field.-hasvalue,
.form-element-field:focus {
  opacity: 1; }

.form-element-field.-hasvalue ~ .form-element-label,
.form-element-field:focus ~ .form-element-label {
  transform: translateY(-100%) translateY(-0.5em) translateY(-2px) scale(0.9);
  cursor: pointer;
  pointer-events: auto; }

.form-has-error .form-element-label.form-element-label,
.form-has-error .form-element-hint {
  color: #d9534f; }

.form-has-error .form-element-bar,
.form-has-error .form-element-bar::after {
  background: #d9534f; }

.form-is-success .form-element-label.form-element-label,
.form-is-success .form-element-hint {
  color: #259337; }

.form-is-success .form-element-bar::after {
  background: #259337; }

input.form-element-field:not(:placeholder-shown),
textarea.form-element-field:not(:placeholder-shown) {
  opacity: 1; }

input.form-element-field:not(:placeholder-shown) ~ .form-element-label,
textarea.form-element-field:not(:placeholder-shown) ~ .form-element-label {
  transform: translateY(-100%) translateY(-0.5em) translateY(-2px) scale(0.9);
  cursor: pointer;
  pointer-events: auto; }

textarea.form-element-field {
  height: auto;
  min-height: 3rem; }

select.form-element-field {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer; }

.form-select-placeholder {
  color: #a6a6a6;
  display: none; }

.form-select .form-element-bar::before {
  content: "";
  position: absolute;
  height: 0.5em;
  width: 0.5em;
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
  display: block;
  right: 0.5em;
  bottom: 0;
  transition: transform 0.28s ease;
  transform: translateY(-100%) rotateX(0deg) rotate(45deg);
  will-change: transform; }

.form-select select:focus ~ .form-element-bar::before {
  transform: translateY(-50%) rotateX(180deg) rotate(45deg); }

.form-element-field[type="number"] {
  -moz-appearance: textfield; }

.form-element-field[type="number"]::-webkit-outer-spin-button,
.form-element-field[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0; }

    </style>
`);
const coerce_to_json = 'coerce-to-json';
export class XtalTextAreaMD extends XtalTextInputMD{
    static get is(){return 'xtal-text-area-md';}
    static get observedAttributes(){
      return super.observedAttributes.concat([coerce_to_json]);
    }
    attributeChangedCallback(n: string, ov: string, nv: string){
      switch(n){
        case coerce_to_json:
          this._coerceToJSON = nv !== null;
          break;
      }
      super.attributeChangedCallback(n, ov, nv);
    }
    afterInitRenderCallback(){
      if(this.coerceToJSON){
        const val = this.inputElement ? this.inputElement.value : this._value;
        try{
          this.objectValue = JSON.parse(val);
        }catch(e){}
      }
    }
    connectedCallback(){
      this.propUp(['coerceToJSON']);
      super.connectedCallback();
      
    }
    _coerceToJSON = false;
    get coerceToJSON(){
      return this._coerceToJSON;
    }
    set coerceToJSON(nv){
      this.attr(coerce_to_json, nv, '');
    }
    get mainTemplate(){
        return mainTemplate;
    }
    _objectValue: object | undefined = undefined;
    get objectValue(){
      return this._objectValue;
    }
    set objectValue(nv){
      this._objectValue = nv;
      this.de("object-value", {
        objectValue: nv
      })
    }

    set value(val: string) {
      if(val === this._value) return;
      super.value = val;
      this.afterInitRenderCallback();
    }
    emitEvent() {
      const val = this.inputElement ? this.inputElement.value : this._value;
      this.value = val;
      if(this._coerceToJSON){
        try{
          this.objectValue = JSON.parse(val);
        }catch(e){}
      }
      this.de("value", {
        value: val
      });
      if (this._options) {
        const textFld = this._options.textFld;
        const item = this._options.data.find(item => item[textFld] === val);
        if (item !== undefined) {
          this.selection = item;
          this.de("selection", {
            value: item
          });
        }
      }
    }
}

define(XtalTextAreaMD);
