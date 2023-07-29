import React from "react";
import ReactDOM from "react-dom";
import Blockly from "node-blockly/browser";

import BlocklyDrawer, { Block, Category } from "react-blockly-drawer";

const helloWorld = {
  name: "HelloWorld",
  category: "Operation",
  block: {
    init: function() {
      this.setHelpUrl('');
      this.setColour(230);
      this.appendValueInput("Name")
          .appendField("Olala");
      this.setTooltip('');
    }
  },
  generator: block => {
    const message = `'${block.getFieldValue("NAME")}'` || "''";
    const code = `console.log('Hello ${message}')`;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  }
};

ReactDOM.render(
  <BlocklyDrawer
    tools={[helloWorld]}
    onChange={(code, workspace) => {
      console.log(code);
    }}
    appearance={{
      categories: {
        Demo: {
          colour: "270"
        }
      }
    }}
  >
    <Category name="Variables" custom="VARIABLE" />
    {/* <Category name="Operation">
      <Block type="logic_compare" />
      <Block type="logic_operation" />
      <Block type="logic_negate" />
      <Block type="logic_boolean" />
      <Block type="logic_null" disabled="true" />
      <Block type="logic_ternary" />
    </Category> */}
    <Category name="Values">
      <Block type="math_number" />
      <Block type="text" />
      
    </Category>
    <Category name="Loops">
      <Block type="text_print" />
      <Block type="text" />
    </Category>
  </BlocklyDrawer>,
  document.getElementById("root")
);
