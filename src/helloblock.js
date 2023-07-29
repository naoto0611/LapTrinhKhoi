// import React from "react";
// import ReactDOM from "react-dom";

// function helloWorld1() {
//   return(
// const helloWorld = {
//   name: "HelloWorld",
//   category: "Demo",
//   block: {
//     init: function() {
//       this.jsonInit({
//         message0: "Hello one",
//         args0: [
//           {
//             type: "field_input",
//             name: "NAME",
//             check: "String"
//           }
//         ],
//         output: "String",
//         colour: 160,
//         tooltip: "Says Hello"
//       });
//     }
//   },
//   generator: block => {
//     const message = `'${block.getFieldValue("NAME")}'` || "''";
//     const code = `console.log('Hello ${message}')`;
//     return [code, Blockly.JavaScript.ORDER_MEMBER];
//   }
// };
//   );
// }

// export default helloWorld1;