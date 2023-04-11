const fs = require("fs").promises;
const chalk = require("chalk");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    console.log(
      chalk.red(
        `Contact with this id ${contact} does not exist, please try again`
      )
    );
    return;
  }
  return contact;
}
async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === contactId);
  const deleteContact = contacts.splice(index, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(
      chalk.green(
        `This contact with ID ${contactId} has been successfully deleted`
      )
    );
  } catch (error) {
    console.log(error);
  }
  return deleteContact;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: uuidv4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    console.log(chalk.green(`Contact created: ${name}`));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
