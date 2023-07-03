
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
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "get":
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


invokeAction(options);