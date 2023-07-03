const fs =  require ("fs/promises");
const path = require('path')
// const contacts =path.join(__dirname, "./db/contacts.json");
const {nanoid} = require('nanoid');




// Розкоментуй і запиши значення
  const contactsPath = path.join(__dirname, './db/contacts.json');
 

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

async function getContactById(id) {
  const contactId = String(id)
  const allContacts = await listContacts();
  const result =  allContacts.find(item=> item.id===contactId)
  return result || null
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(id) {
  const contactId = String(id)
  const allContacts = await listContacts();
  const deletContact = allContacts.findIndex(item=> item.id===contactId);
  if(deletContact === -1) {
  return null}
  const result = allContacts.splice(deletContact,1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(data) {
  const allContacts = await listContacts();
  const nweContact = {id: nanoid(), ...data,}
  allContacts.push(nweContact),
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return nweContact;

  // ...твій код. Повертає об'єкт доданого контакту. 
}

module.exports= {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}