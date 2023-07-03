
const contacts = require("./contacts");

// console.log(contacts.listContacts);
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "readContacts":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "getById":
      const contact = await contacts.getContactById(id);
      return console.log(contact);
    case "remove":
      const removedContact = await contacts.removeContact(id);
      return console.log(removedContact);
    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      return console.log(addContact);
    default:
      console.log("Unknown action type!");
  }
};
// invokeAction({action: 'readContacts'});
// invokeAction({action: 'getById', id: 2});
// invokeAction({action: 'remove', id: 'e6ywwRe4jcqxXfCZOj_1e'});
// invokeAction({
//   action: "add",
//   name: "Muran",
//   email: "drew@gmail.com",
//   phone: "54-45-55",
// });

// console.log(process.argv);
// const actionIndex = process.argv.indexOf('--action');
// if(actionIndex !==-1){
//   const action = process.argv[actionIndex +1];
//   // console.log( action);
//   invokeAction({action})
// }

// const arr = hideBin(process.argv);
// const {argv}= yargs(arr);
// invokeAction(argv);


invokeAction(options);